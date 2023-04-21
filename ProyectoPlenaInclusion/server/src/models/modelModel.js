import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;
const Model = db.define('model',{
    idModel:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idProfessional:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();
export default Model;