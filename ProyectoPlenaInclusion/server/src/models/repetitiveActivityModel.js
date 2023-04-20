import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Professional from "../models/professionalModel.js";
import Activity from "../models/activityModel.js";
const { DataTypes } = Sequelize;
const RepetitiveActivity = db.define('repetitiveActivity',{
    idRepetitiveActivity:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    idProfessional:{
        type: DataTypes.INTEGER,
        references: {
            model: Professional,
            key: 'idProfessional'
        }
    },
    datetime:{
        type: DataTypes.DATE
    },
    idActivity:{
        type: DataTypes.INTEGER,
        references: {
            model: Activity,
            key: 'idActivity'
        }
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();
RepetitiveActivity.belongsTo(Professional, {  foreignKey: 'idProfessional'  });
RepetitiveActivity.belongsTo(Activity, {  foreignKey: 'idActivity'  });
export default RepetitiveActivity;