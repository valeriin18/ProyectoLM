import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Users = db.define('usuario',{
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