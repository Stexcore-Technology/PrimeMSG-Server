import { Router } from "express";
import Server from "../server";
import AuthController from "../controllers/auth.controller";
import authSchema from "../schemas/auth.schema";

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
    router.post("/signup", authSchema.signup.POST, authController.Signup);
    router.post("/signup/:tcp", authSchema.signup.tcp.POST, authController.VerifySignup);
    
    return router;
}