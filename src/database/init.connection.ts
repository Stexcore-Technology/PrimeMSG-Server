import connection from "./connection";
import "~/models/user.model";
import "~/models/user-unauthorized.model";
import "~/models/session.model";
import "~/models/instance.model";

/**
 * Initialize connection models
 */
export default async function initConnection() {
    await connection.sync();
}