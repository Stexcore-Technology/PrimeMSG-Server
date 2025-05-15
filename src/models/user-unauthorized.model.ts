import { DataTypes, Model } from "sequelize";
import { ModelConstructor } from "../types/model-constructor.type";

/**
 * Unauthorized user Interface
 */
export interface IUnauthorizedUser {
    /**
     * Identifier
     */
    id: number,
    /**
     * Email string
     */
    email: string,
    /**
     * Username
     */
    username: string,
    /**
     * Password
     */
    password: string,
    /**
     * Token
     */
    token: string,
    /**
     * Pin code
     */
    pin_code: string,
    /**
     * Try counts
     */
    try_counts: number,
    /**
     * expiration
     */
    expiration: Date
}

/**
 * Create a model to unauthorized users
 * @param sequelize Sequelize connection
 * @returns Model
 */
const UnauthorizedUserModel: ModelConstructor<IUnauthorizedUser, Omit<IUnauthorizedUser, "id" | "try_counts" | "token"> & { 
    try_counts?: IUnauthorizedUser["try_counts"], 
    token?: IUnauthorizedUser["token"]
}> = (sequelize) => {

    // Define Structure model
    return sequelize.define<Model<IUnauthorizedUser> & IUnauthorizedUser>("unauthorized_users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.CHAR(40),
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR(40),
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(80),
            allowNull: false
        },
        token: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        pin_code: {
            type: DataTypes.CHAR(6),
            allowNull: false
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false
        },
        try_counts: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
    });
}

// Export model
export default UnauthorizedUserModel;