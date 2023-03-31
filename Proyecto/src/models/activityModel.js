import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Activity = db.define('activity',{
    idAct:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name:{
        type: DataTypes.STRING
    },
    descipcion:{
        type: DataTypes.STRING
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
export default Activity;