import repeteadActivity from "../models/repeteadActivityModel.js";
import repeatingActivityCustomers from "../models/repeatingActivityCustomers.js";
import Users from "../models/userModel.js";
export const addParticipants = async(req, res) =>{
    const{idUser, idRepetitveActivity} = req.body;
    console.log(idRepetitveActivity)
    console.log(idUser)
    try{
        let user = await Users.findByPk(idUser);
        let repetitiveActivity = await Activity.findByPk(idRepetitveActivity);
        console.log(Activity);
        user.addActivities(idRepetitveActivity);
        res.json("Registration Successfully")
    }catch(error){
        console.log(error);
    }
}