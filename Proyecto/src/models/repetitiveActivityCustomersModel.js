import db from "../config/database.js";
import RepetitiveActivity from "./repetitivectivityModel.js";
import Users from "./userModel.js";
const RepetitiveActivityCustomers = db.define('RepetitiveActivityCustomers', {}, { timestamps: false });
Users.belongsToMany(RepetitiveActivity, { through: RepetitiveActivityCustomers });
Activity.belongsToMany(Users, { through: RepetitiveActivityCustomers });
export default RepetitiveActivityCustomers;