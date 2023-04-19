import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
const { DataTypes } = Sequelize;

const Professional = db.define('professional',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        references: {
            model: Users,
            key: 'idUser'
        }
    },
    availability: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      }
},{
    freezeTableName: true
});
(async () => {
    await db.sync();
})();

Professional.belongsTo(Users, { foreignKey: 'idUser', onDelete: 'CASCADE' });

export default Professional;