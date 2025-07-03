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
     * Signup request 
     * @param req Request incomming
     * @param res Response utils
     * @param next Next middleware
     */
    POST: IRequestHandler = async (req, res, next) => {
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
    
}