import { Sequelize } from "sequelize";
const db = new Sequelize('BdAplicationPlenaInclusion', 'root', '', {
    host : "localhost",
    dialect : "mysql"
});
export default db;