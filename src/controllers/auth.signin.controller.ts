import AuthService from "../services/auth.service";
import { Controller, IRequestHandler } from "@stexcore/api-engine";

/**
 * Handle server authentication signin
 */
export default class AuthSigninController extends Controller {

    /**
     * authentication service
     */
    private auth: AuthService = this.$(AuthService);

    /**
     * Login to account using email and password
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    POST: IRequestHandler = async (req, res, next) => {
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
    GET: IRequestHandler = async (req, res, next) => {
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