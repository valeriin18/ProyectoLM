import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Professional from "./professionalModel.js";
import Model from "./modelModel.js";
const { DataTypes } = Sequelize;
const Activity = db.define('activity',{
    idActivity:{
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
        type: DataTypes.DATEONLY
    },
    idModel:{
        type: DataTypes.INTEGER,
        references: {
            model: Model,
            key: 'idModel'
        }
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();
Professional.hasMany(Activity,{
    foreignKey: "idProfessional"
});
Activity.belongsTo(Professional, {  
    foreignKey: 'idProfessional', 
    targetKey: 'idProfessional'  
});
Model.hasMany(Activity,{
    foreignKey: "idModel"
});
Activity.belongsTo(Model, {  
    foreignKey: 'idModel', 
    targetKey: 'idModel'
});
export default Activity;