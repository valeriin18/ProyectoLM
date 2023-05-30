import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

/**
 * Pre: ---
 * Post: CREACION DE TABLA CUSTOMER EN LA BASE DE DATOS.
 */
const Customers = db.define('customers', {
    idCustomer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DNI: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    surname1: {
        type: DataTypes.STRING
    },
    surname2: {
        type: DataTypes.STRING
    },
    birthyear: {
        type: DataTypes.DATE
    },
    mail: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.BOOLEAN
    },
    specialcares: {
        type: DataTypes.BOOLEAN
    },
    dataTutor: {
        type: DataTypes.STRING
    },
    accesToken: {
        type: DataTypes.STRING
    },
    refreshToken: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});
(async () => {
    await db.sync();
})();
export default Customers;