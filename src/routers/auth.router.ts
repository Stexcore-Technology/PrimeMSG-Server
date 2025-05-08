import { Router } from "express";
import Server from "../server";
import AuthController from "../controllers/auth.controller";

/**
 * Make a router to auth segment
 * @param server Server instance
 */
export default function authRouter(server: Server) {
    // Create router instance
    const router = Router();
    // Create controller instance
    const authController = new AuthController(server);

    // Append endpoint
    
    return router;
}