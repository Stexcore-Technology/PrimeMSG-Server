import { DataTypes, Model } from "sequelize";
import { ModelConstructor } from "../types/model-constructor.type";

/**
 * Instance Interface
 */
export interface IInstance {
    /**
     * Identifier
     */
    id: number,
    /**
     * User Identifier
     */
    user_id: number,
    /**
     * Instance name
     */
    name: string,
    /**
     * Instance platform
     */
    platform: string
}

/**
 * Create a model to instances
 * @param sequelize Sequelize connection
 * @returns Model
 */
const InstanceModel: ModelConstructor<IInstance, Omit<IInstance, "id">> = (sequelize) => {

    // Define Structure model
    return sequelize.define<Model<IInstance> & IInstance>("instances", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.CHAR(40),
            allowNull: false
        },
        platform: {
            type: DataTypes.CHAR(10),
            allowNull: false
        }
    });
}

// Export model
export default InstanceModel;