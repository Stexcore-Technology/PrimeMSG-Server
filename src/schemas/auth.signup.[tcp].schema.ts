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
        params: Joi.object({
            tcp: Joi.string().required()
        })
    }
})