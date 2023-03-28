import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Activity = db.define('activity',{
    name:{
        type: DataTypes.STRING
    },
    descipcion:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();

export default Activity;