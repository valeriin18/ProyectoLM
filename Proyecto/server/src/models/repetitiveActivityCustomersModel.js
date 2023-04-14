import db from "../config/database.js";
import Activity from "./activityModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import Users from "./userModel.js";
const RepetitiveActivityCustomers = db.define('repetitiveActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(RepetitiveActivity, { through: RepetitiveActivityCustomers });
Activity.belongsToMany(Users, { through: RepetitiveActivityCustomers });
export default RepetitiveActivityCustomers;