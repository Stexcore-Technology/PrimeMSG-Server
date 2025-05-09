import Joi from "joi";
import schemaUtils from "../utils/schema.utils";

/**
 * Schema to validate segment info
 */
export default {

    /**
     * Signup segment
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
    },

    /**
     * Signin segment
     */
    signin: {
        /**
         * Get current session
         */
        GET: schemaUtils.createSchema({
            headers: Joi.object({
                authorization: Joi.required()
            })
        }),
        /**
         * Signin to account using email and password
         */
        POST: schemaUtils.createSchema({
            headers: Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(40).required()
            })
        })
    }
    
}