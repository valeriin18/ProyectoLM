import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } = Sequelize;

const Professional = db.define('professional',{
    idProfessional:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    DNI:{
        type: DataTypes.STRING
    },
    name:{
        type: DataTypes.STRING
    },
    surname1:{
        type: DataTypes.STRING
    },
    surname2:{
        type: DataTypes.STRING
    },
    birthyear:{
        type: DataTypes.DATE
    },
    mail:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    availability: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    },
    accesToken:{
        type: DataTypes.STRING
    },
    refreshToken:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
(async () => {
    await db.sync();
})();
export default Professional;