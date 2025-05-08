import Joi from "joi";
import schemaUtils from "../utils/schema.utils";

/**
 * Schema to validate segment info
 */
export default {

    /**
     * Auth segment
     */
    signup: {

        /**
         * Tcp segment
         */
        tcp: {
            /**
             * Schema to validate
             */
            POST: schemaUtils.createSchema({
                params: Joi.object({
                    tcp: Joi.string().required()
                })
            })
        },
        
        /**
         * Schema to validate
         */
        POST: schemaUtils.createSchema({
            body: Joi.object({
                url: Joi.string().required(),
                username: Joi.string().min(4).max(40).required(),
                langType: Joi.string().length(2).lowercase().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(40).required(),
            })
        })
    }
    
}