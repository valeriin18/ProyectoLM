import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Users = db.define('users',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name:{
        type: DataTypes.STRING
    },
    surname:{
        type: DataTypes.STRING
    },
    username:{
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