import { Sequelize } from "sequelize";

export default function connection(database:string, username: string, password: string, host = "localhost", port = 3306){
    return new Sequelize({
        dialect: "mysql",
        host: "localhost",
        username,
        password,
        database,
        port
    });
}