import Joi from "joi";
import { createSchema } from "@stexcore/api-engine";

/**
 * Schema to validate segment /auth/signup
 */
export default createSchema({

    /**
     * Schema to validate
     */
    POST: {
        body: Joi.object({
            url: Joi.string().required(),
            username: Joi.string().min(4).max(40).required(),
            langType: Joi.string().length(2).lowercase().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).max(40).required(),
        })
    }
})