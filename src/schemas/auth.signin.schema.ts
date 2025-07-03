import { createSchema, joi } from "@stexcore/api-engine";

/**
 * Schema to validate segment /auth/signup
 */
export default createSchema({

    /**
     * Get current session
     */
    GET: {
        headers: joi.object({
            authorization: joi.required()
        })
    },

    /**
     * Signin to account using email and password
     */
    POST: {
        body: joi.object({
            email: joi.string().email().required(),
            password: joi.string().min(8).max(40).required()
        })
    }
});