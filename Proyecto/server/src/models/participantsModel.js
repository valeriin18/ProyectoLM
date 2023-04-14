import db from "../config/database.js";
import Activity from "./activityModel.js";
import Users from "./userModel.js";
const Participants = db.define('participants', {}, { timestamps: false });
Users.belongsToMany(Activity, { through: Participants });
Activity.belongsToMany(Users, { through: Participants });
export default Participants;