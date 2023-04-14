import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Activity = db.define('activity',{
    idAct:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idUser:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.DATE
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();
export default Activity;