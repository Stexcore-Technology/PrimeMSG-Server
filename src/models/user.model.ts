import { DataTypes, Model } from "sequelize";
import { ModelConstructor } from "../types/model-constructor.type";

/**
 * User Interface
 */
export interface IUser {
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
}

/**
 * Create a model to users
 * @param sequelize Sequelize connection
 * @returns Model
 */
const UserModel: ModelConstructor<IUser, Omit<IUser, "id">> = (sequelize) => {

    // Define Structure model
    return sequelize.define<Model<IUser> & IUser>("users", {
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
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(80),
            allowNull: false
        }
    });
}

// Export model
export default UserModel;