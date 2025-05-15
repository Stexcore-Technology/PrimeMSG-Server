import Joi from "joi";
import { createSchema } from "@stexcore/api-engine";

/**
 * Schema to validate segment /auth/signup
 */
export default createSchema({

    /**
     * Get current session
     */
    GET: {
        headers: Joi.object({
            authorization: Joi.required()
        })
    },

    /**
     * Signin to account using email and password
     */
    POST: {
        headers: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(40).required()
        })
    }
});