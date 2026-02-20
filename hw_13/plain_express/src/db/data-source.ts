import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../domains/users/usersModel";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "users_db",
    synchronize: true,
    logging: false,
    entities: [User],
});
