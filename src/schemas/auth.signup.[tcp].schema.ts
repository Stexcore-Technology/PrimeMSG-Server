import { createSchema, joi } from "@stexcore/api-engine";

/**
 * Schema to validate segment /auth/signup
 */
export default createSchema({

    /**
     * Schema to validate
     */
    POST: {
        params: joi.object({
            tcp: joi.string().required()
        })
    }
})