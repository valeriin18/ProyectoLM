import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Professional from "../models/professionalModel.js";
import Activity from "../models/activityModel.js";
const { DataTypes } = Sequelize;
const RepetitiveActivity = db.define('repetitiveActivity',{
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
RepetitiveActivity.belongsTo(Professional, { through: Professional });
RepetitiveActivity.belongsTo(Activity, { through: Activity });
export default RepetitiveActivity;