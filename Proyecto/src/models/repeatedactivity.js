import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const repeatedactivity = db.define('repeatedactivity',{
    idAct:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idUser:{
        type: DataTypes.BOOLEAN
    },
    date:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();

export default repeatedactivity;