import { RequestHandler } from "express";
import Controller from "../class/controller";
import AuthService from "../services/auth.service";

/**
 * Handle server authentication
 */
export default class AuthController extends Controller {

    /**
     * authentication service
     */
    private auth: AuthService = this.server.getService(AuthService);

    /**
     * Signup request 
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    Signup: RequestHandler = async (req, res, next) => {
        try {
            // Send request
            await this.auth.createRequestToRegister(req.body.url, {
                username: req.body.username,
                langType: req.body.langType,
                email: req.body.email,
                password: req.body.password
            });

            // Response request
            res.json({
                success: true,
                message: `Verification code sent to the email address '${req.body.email}'`
            });
        }
        catch(err) {
            // Forward Error
            next(err);
        }
    }

    /**
     * Validate an account using a token
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    VerifySignup: RequestHandler = async (req, res, next) => {
        try {
            // Try to authorize a new account
            const session = await this.auth.AuthorizeRegisterByToken(req.params.tcp);

            // Response request
            res.json({
                success: true,
                message: "User account created and logged in!",
                data: session
            });
        }
        catch(err) {
            // Forward error
            next(err);
        }
    }

    /**
     * Login to account using email and password
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    Login: RequestHandler = async (req, res, next) => {
        try {
            // Extract vars
            const { email, password } = req.body;
            
            // Try to login to account
            const session = await this.auth.Login(email, password);

            // Send response
            res.json({
                success: true,
                message: "Account logged in!",
                data: session
            });
        }
        catch(err) {
            next(err);
        }
    }

    /**
     * Get current session using authorization
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    GetCurrentSession: RequestHandler = async (req, res, next) => {
        try {
            // Get token session
            const authorization = req.headers.authorization!;

            // Try to get current session
            const session = await this.auth.getSessionInfoByToken(authorization);

            // Send response
            res.json({
                success: true,
                message: "Account logged!",
                data: session
            });
        }
        catch(err) {
            next(err);
        }
    }
    
}