import Activity from "../models/activityModel.js";
import Participants from "../models/participantsModel.js";
import Users from "../models/userModel.js";

export const addParticipants = async(req, res) =>{
    const{idUser, idAct} = req.body;
    console.log(idAct)
    console.log(idUser)
    try{
        let user = await Users.findByPk(idUser);
        let activity = await Activity.findByPk(idAct);
        console.log(Activity);
        user.addActivities(activity);
        res.json("Registration Successfully")
    }catch(error){
        console.log(error);
    }
}