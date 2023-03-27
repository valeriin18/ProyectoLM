import { Sequelize } from "sequelize";
// npm install sequelize
// npm install mysql2

const db = new Sequelize('baseDeDatosPractica1', 'root', '', {
    host : "localhost",
    dialect : "mysql"
});

export default db;