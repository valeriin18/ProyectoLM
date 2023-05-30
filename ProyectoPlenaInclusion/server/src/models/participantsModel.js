import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Customer from "./customerModel.js";
import Activity from "./activityModel.js";
const { DataTypes } = Sequelize;

/**
 * Pre: ---
 * Post: CREACION DE TABLA PARTICIPANTS EN LA BASE DE DATOS.
 */
const participants = db.define("participants", {
  idCustomer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'customer',
      key: 'id',
      name: 'customer_fk'
    }
  },
  idActivity: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Activity',
      key: 'id',
      name: 'activity_fk'
    }
  }
});
// En el modelo Customer
Customer.belongsToMany(Activity, {
  through: participants,
  foreignKey: "idCustomer",
});

Activity.belongsToMany(Customer, {
  through: participants,
  foreignKey: "idActivity",
});

participants.hasMany(Customer, {
  foreignKey: "idCustomer"
});

Customer.belongsTo(participants, {
  foreignKey: "idCustomer",
  targetKey: "idCustomer"
});

participants.hasMany(Activity, {
  foreignKey: "idActivity"
});

Activity.belongsTo(participants, {
  foreignKey: "idActivity",
  targetKey: "idActivity"
});
export default participants;  