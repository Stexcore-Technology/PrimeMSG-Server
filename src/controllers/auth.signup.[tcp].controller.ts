import { IRequestHandler } from "@stexcore/api-engine";
import AuthService from "../services/auth.service";
import { Controller } from "@stexcore/api-engine";

/**
 * Handle server authentication
 */
export default class AuthController extends Controller {

    /**
     * authentication service
     */
    private auth: AuthService = this.$(AuthService);

    /**
     * Validate an account using a token
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    POST: IRequestHandler = async (req, res, next) => {
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
    
}