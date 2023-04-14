import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Professional from "./professionalModel.js";
import Activity from "./activityModel.js";
const { DataTypes } = Sequelize;
const repetitiveActivity = db.define('repetitiveActivity',{
    idRepetitiveActivity:{
        type: DataTypes.STRING
    },
    idUser:{
        type: DataTypes.STRING
    },
    datetime:{
        type: DataTypes.DATE
    },
    idActivity:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();
repetitiveActivity.belongsTo(Professional, { through: Professional });
repetitiveActivity.belongsTo(Activity, { through: Activity });
export default repetitiveActivity;