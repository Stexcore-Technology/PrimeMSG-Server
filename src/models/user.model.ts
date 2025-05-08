import { DataTypes, Model } from "sequelize";
import connection from "~/database/connection";

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
 * User Model
 */
class User extends Model<IUser, Omit<IUser, "id">> implements IUser {
    /**
     * User identifier
     */
    declare id: number;
    /**
     * Email address
     */
    declare email: string;
    /**
     * Username
     */
    declare username: string;
    /**
     * Password
     */
    declare password: string;
}

// initialize structure
User.init({
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
}, {
    sequelize: connection,
    tableName: "users"
});

// export model
export default User;