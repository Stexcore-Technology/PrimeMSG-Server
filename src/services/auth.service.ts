import UserUnauthorized from "../models/user-unauthorized.model"
import smtpService from "./smtp.service";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Session from "../models/session.model";
import Instance, { type IInstance } from "../models/instance.model";
import type { ILangType } from "../types/lang";
import Service from "../class/service";
import SMTPService from "./smtp.service";

/**
 * Session info
 */
export interface ISessionInfo {
    /**
     * User identifier
     */
    user_id: number,
    /**
     * Session identifier
     */
    session_id: number,
    /**
     * Username
     */
    username: string,
    /**
     * Email address
     */
    email: string,
    /**
     * Token session
     */
    token: string,
    /**
     * Instances user
     */
    instances: IInstance[]
}

/**
 * Authentication service
 */
export default class AuthService extends Service {

    /**
     * Exists another account error
     */
    readonly ExistsAccountError = class extends Error { };

    /**
     * Session expired error
     */
    readonly SessionExpiredError = class extends Error { };

    /**
     * User not found error
     */
    readonly UserNotFoundError = class extends Error { };

    /**
     * Get SMTP Service
     */
    private readonly smtp = this.server.getService(SMTPService);

    /**
     * Create a request to create and send a verification link to email
     * @param url Url server
     * @param data User to register
     * @throws {this["ExistsAccountError"]}
     */
    public async createRequestToRegister(
        url: string,
        data: {
            username: string,
            email: string,
            password: string,
            langType: ILangType
        }
    ) {
        // Find user account
        const userAccount = await User.findOne({
            where: {
                email: data.email,
            }
        });

        if (userAccount) {
            // Throw error
            throw new this.ExistsAccountError("Already exists another account!");
        }

        // Remove another user authentication
        await UserUnauthorized.destroy({
            where: {
                email: data.email
            }
        });

        // Generate Pin Code
        const pin_code = Math.random().toString().slice(-6);
        const expiration = new Date(Date.now() + 1.44e+7);

        // Create user unauhorized
        const user = await UserUnauthorized.create({
            email: data.email,
            username: data.username,
            password: data.password,
            expiration: expiration,
            pin_code: pin_code,
        });

        // sign credentials token
        const token = jwt.sign({
            version: "1.0.0",
            id: user.id,
            email: user.email,
            token_uuid: user.token
        },
            String(process.env.JWT_KEY), {
            expiresIn: 60 * 60 * 4
        }
        );

        // Send email
        await this.smtp.sendMail(data.email, {
            template: "tcp-signin",
            username: data.username,
            link_verification: new URL(`/${data.langType}/auth/signup/` + encodeURIComponent(token), url).href,
        });
    }

    /**
     * Authorize a account by token
     * @param token Token authorize
     * @throws {this["SessionExpiredError"]}
     * @returns Session register
     */
    public async AuthorizeRegisterByToken(token: string) {

        try {
            // Decode credentials
            const decoded = jwt.verify(token, String(process.env.JWT_KEY)) as {
                version: string,
                id: number,
                email: string,
                token_uuid: string
            };

            if (decoded.version === "1.0.0") {

                // Validate if exists account
                const userAccount = await User.findOne({
                    where: {
                        email: decoded.email,
                    }
                });

                if (!userAccount) {

                    // Find user unauthorized
                    const userUnauthorized = await UserUnauthorized.findOne({
                        where: {
                            id: decoded.id,
                            email: decoded.email,
                            token: decoded.token_uuid
                        }
                    });

                    if (userUnauthorized) {

                        // create user account
                        const user = await User.create({
                            email: userUnauthorized.email,
                            password: userUnauthorized.password,
                            username: userUnauthorized.username
                        });

                        // destroy user unauthorized
                        await userUnauthorized.destroy();

                        // Signin session
                        return this.Login(user);
                    }
                }

            }
        }
        catch (err) {
            if(!(err instanceof jwt.TokenExpiredError || err instanceof jwt.JsonWebTokenError)) {
                throw err;
            }
        }

        // Session expired
        throw new this.SessionExpiredError("Session expired!");
    }

    /**
     * Login using user instance
     * @param user User info
     * @throws {this["UserNotFoundError"]}
     */
    public async Login(user: User): Promise<ISessionInfo>;
    public async Login(email: string, password: string): Promise<ISessionInfo>;
    public async Login(email: string | User, password?: string): Promise<ISessionInfo> {

        // Declare user var
        let user: User;

        // Validate email instance
        if (email instanceof User) {
            user = email;
        }
        else {
            // Find user instance
            const userFind = await User.findOne({
                where: {
                    email: email,
                    password: password
                }
            });

            // User not found?
            if (!userFind) throw new this.UserNotFoundError("User not found!");

            // Set user founded
            user = userFind;
        }

        // Get expiration session
        const expiration = new Date(Date.now() + 2.592e+9); // 2,592e+9 = 30 days

        // Create session instance
        const session = await Session.create({
            user_id: user.id,
            expiration: expiration
        });

        // Sign credentials
        const token = jwt.sign({
            version: "1.0.0",
            session_id: session.id,
            token_uuid: session.token
        }, String(process.env.JWT_KEY), {
            expiresIn: 2.592e+9 / 1000
        });

        // Get user session
        return this.getSessionInfo(user, session, token);
    }

    /**
     * Get session info
     * @param token Token session
     * @throws {this["SessionExpiredError"]}
     * @returns Session info
     */
    public async getSessionInfoByToken(token: string) {

        
        
        // Session info
        const decoded = jwt.verify(token, String(process.env.JWT_KEY)) as {
            version: string,
            session_id: number,
            token_uuid: string
        };

        if (decoded.version === "1.0.0") {

            // Session instance
            const session = await Session.findOne({
                where: {
                    id: decoded.session_id,
                    token: decoded.token_uuid
                }
            });

            if (session) {

                // User instance
                const user = await User.findOne({
                    where: {
                        id: session.user_id
                    }
                });

                if (user) {
                    return this.getSessionInfo(user, session, token);
                }
            }
        }

        // Token expired
        throw new this.SessionExpiredError("Session expired!");
    }

    /**
     * Get session info
     * @param user User instance
     * @param session Session instance
     * @param token Token Session
     * @returns Session info
     */
    public async getSessionInfo(user: User, session: Session, token: string): Promise<ISessionInfo> {

        // get instances
        const instances = await Instance.findAll({
            where: {
                user_id: user.id
            }
        });

        return {
            user_id: user.id,
            session_id: session.id,
            username: user.username,
            email: user.email,
            token: token,
            instances: instances.map((instanceItem) => (
                instanceItem.toJSON()
            ))
        };
    }

}