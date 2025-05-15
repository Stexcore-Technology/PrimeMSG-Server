import { DataTypes, Model } from "sequelize";
import { ModelConstructor } from "../types/model-constructor.type";

/**
 * Session Interface
 */
export interface ISession {
    /**
     * Session identifier
     */
    id: number,
    /**
     * User Identifier
     */
    user_id: number,
    /**
     * Token
     */
    token: string,
    /**
     * Expiration
     */
    expiration: Date
}

/**
 * Create a model to sessions
 * @param sequelize Sequelize connection
 * @returns Model
 */
const SessionModel: ModelConstructor<ISession, Omit<ISession, "id" | "token">> = (sequelize) => {

    // Define Structure model
    return sequelize.define<Model<ISession> & ISession>("sessions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
}

// Export model
export default SessionModel;