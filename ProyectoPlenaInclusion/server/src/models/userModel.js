import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Users = db.define('users',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    DNI:{
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
    mail:{
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