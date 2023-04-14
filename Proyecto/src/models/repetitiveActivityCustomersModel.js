import db from "../config/database.js";
import repeatActivity from "./repeteadActivityModel.js";
import Users from "./userModel.js";
const repeatingActivityCustomers = db.define('repeatingActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(repeatActivity, { through: repeatingActivityCustomers });
Activity.belongsToMany(Users, { through: repeatingActivityCustomers });
export default repeatingActivityCustomers;