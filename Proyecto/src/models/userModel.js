import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Users = db.define('users',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    dni:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    surname1:{
        type: DataTypes.STRING
    },
    surname2:{
        type: DataTypes.STRING
    },
    birthyear:{
        type: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING
    },
    telephonenumber:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
(async () => {
    await db.sync();
})();
export default Users;