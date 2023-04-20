import db from "../config/database.js";
import Activity from "./activityModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import Customers from "./customerModel.js";
const RepetitiveActivityCustomers = db.define('repetitiveActivityCustomers', {}, { timestamps: false });
Customers.belongsToMany(RepetitiveActivity, { through: RepetitiveActivityCustomers });
Activity.belongsToMany(Customers, { through: RepetitiveActivityCustomers });
export default RepetitiveActivityCustomers;