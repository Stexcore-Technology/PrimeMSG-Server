import { createSchema, joi } from "@stexcore/api-engine";

/**
 * Schema to validate segment /auth/signup
 */
export default createSchema({

    /**
     * Schema to validate
     */
    POST: {
        body: joi.object({
            url: joi.string().required(),
            username: joi.string().min(4).max(40).required(),
            langType: joi.string().length(2).lowercase().required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).max(40).required(),
        })
    }
})