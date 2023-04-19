import db from "../config/database.js";
import Activity from "./activityModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import Users from "./userModel.js";
import Customers from "./customerModel.js";
const RepetitiveActivityCustomers = db.define('repetitiveActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(RepetitiveActivity, { through: RepetitiveActivityCustomers });
Activity.belongsToMany(Customers, { through: RepetitiveActivityCustomers });
export default RepetitiveActivityCustomers;