import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
import Activity from "./activityModel.js";
const { DataTypes } = Sequelize;

const Professional = db.define('professional',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    availability:{
        type: DataTypes.BOOLEAN
    }
},{
    freezeTableName: true
});
(async () => {
    await db.sync();
})();

Professional.belongsTo(Users, { through: Users });
Professional.belongsTo(Activity, { through: Activity });

export default Professional;