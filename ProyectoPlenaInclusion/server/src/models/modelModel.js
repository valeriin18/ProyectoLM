import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

/**
 * Pre: ---
 * Post: CREACION DE TABLA MODEL EN LA BASE DE DATOS.
 */
const Model = db.define('model', {
    idModel: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProfessional: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});
(async () => {
    await db.sync();
})();
export default Model;