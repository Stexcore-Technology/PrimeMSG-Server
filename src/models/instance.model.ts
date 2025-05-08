import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

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
 * Instance Model
 */
class Instance extends Model<IInstance, Omit<IInstance, "id">> implements IInstance {
    /**
     * Identifier Model
     */
    declare id: number;
    /**
     * Identifier User
     */
    declare user_id: number;
    /**
     * Name User
     */
    declare name: string;
    /**
     * Platform
     */
    declare platform: string;
}

// Initialize structure model
Instance.init({
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
}, {
    sequelize: connection,
    tableName: "instances"
});

// Export instance model
export default Instance;