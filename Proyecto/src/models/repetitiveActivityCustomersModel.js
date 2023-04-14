import db from "../config/database.js";
import Activity from "./activityModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import Users from "./userModel.js";
const repeatingActivityCustomers = db.define('repeatingActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(RepetitiveActivity, { through: repeatingActivityCustomers });
Activity.belongsToMany(Users, { through: repeatingActivityCustomers });
export default repeatingActivityCustomers;