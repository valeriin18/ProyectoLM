import RepetitiveActivity from "../models/repetitiveActivityModel.js";
import RepetitiveActivityCustomers from "../models/repetitiveActivityCustomersModel.js";
import Users from "../models/userModel.js";
export const addParticipants = async(req, res) =>{
    const{idUser, idRepetitiveActivity} = req.body;
    console.log(idRepetitiveActivity)
    console.log(idUser)
    try{
        let user = await Users.findByPk(idUser);
        let repetitiveActivity = await Activity.findByPk(idRepetitiveActivity);
        console.log(Activity);
        user.addActivities(idRepetitiveActivity);
        res.json("Registration Successfully")
    }catch(error){
        console.log(error);
    }
}