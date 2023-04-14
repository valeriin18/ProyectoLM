import db from "../config/database.js";
import Activity from "./activityModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import Users from "./userModel.js";
const RepeatingActivityCustomers = db.define('repeatingActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(RepetitiveActivity, { through: RepeatingActivityCustomers });
Activity.belongsToMany(Users, { through: RepeatingActivityCustomers });
export default RepeatingActivityCustomers;