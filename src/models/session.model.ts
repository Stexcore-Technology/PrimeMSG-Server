import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

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
 * Session model
 */
class Session extends Model<ISession, Omit<ISession, "id" | "token"> | { token?: string }> implements ISession {
    /**
     * Session identifier
     */
    declare id: number;
    /**
     * User identifier
     */
    declare user_id: number;
    /**
     * Session token
     */
    declare token: string;
    /**
     * Session expiration
     */
    declare expiration: Date;
}

// Initialize structure
Session.init({
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
}, {
    sequelize: connection,
    tableName: "sessions"
});

// Export session
export default Session;