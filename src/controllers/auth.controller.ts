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

    
}