import path from "path";
import { existsSync, mkdirSync } from "fs";
import { Sequelize } from "sequelize";

// Validate path data
if(!existsSync(path.resolve(".data"))) {
    mkdirSync(path.resolve(".data"));
}

export default new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(".data/database.sqlite"),
    logging: false
});