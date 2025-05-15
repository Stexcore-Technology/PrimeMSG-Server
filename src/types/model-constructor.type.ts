import type { Model, ModelStatic, Sequelize } from "sequelize";

/**
 * Model constructor interface
 */
export type ModelConstructor<
    /**
     * Model attributes
     */
    TModelAttributes extends {} = any, 
    /**
     * Model attributes to create instance
     */
    TCreationAttributes extends {} = TModelAttributes
> = {
    /**
     * Function constructor
     */
    (sequelize: Sequelize): ModelStatic<Model<TModelAttributes, TCreationAttributes> & TModelAttributes>
}

/**
 * Get instance model
 */
export type ModelInstance<T extends ModelConstructor> =  
    T extends ModelConstructor<infer TModelAttributes, infer TCreationAttributes> ? 
        Model<TModelAttributes, TCreationAttributes> & TModelAttributes : 
        never;