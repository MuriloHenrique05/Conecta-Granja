import {Sequelize} from "sequelize";
import ("dontenv").config();

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_DIALECT,
        hostname: process.env.DB_HOST,
        port: process.env.DB_HOST
    }
);

export default database;