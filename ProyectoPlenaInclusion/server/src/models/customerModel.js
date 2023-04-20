import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./userModel.js";
const { DataTypes } = Sequelize;

const Customers = db.define('customers',{
    idUser:{
        type: DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        references: {
            model: Users,
            key: 'idUser'
        }
        
    },
    gender:{
        type: DataTypes.BOOLEAN
    },
    specialcares:{
        type: DataTypes.BOOLEAN
    },
    dataTutor:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});
(async () =>{
    await db.sync();
})();

Customers.belongsTo(Users, { foreignKey: 'idUser', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Customers;