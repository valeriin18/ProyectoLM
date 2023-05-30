import { Sequelize } from "sequelize";

/**
 * Pre: ---
 * Post: PASAMOS LOS PARAMENTROS DE LA BASE DE DATOS.
 */
const db = new Sequelize('BdAplicationPlenaInclusion', 'root', '', {
    host : "localhost",
    dialect : "mysql"
});
export default db;