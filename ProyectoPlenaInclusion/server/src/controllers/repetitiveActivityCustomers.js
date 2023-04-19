import RepetitiveActivityCustomers from "../models/repetitiveActivityCustomersModel.js";
import Customer from "../models/customerModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
export const addParticipants = async(req, res) =>{
    const{idUser, idRepetitiveActivity} = req.body;
    try{
        let user = await Customer.findByPk(idUser);
        let activity = await RepetitiveActivity.findByPk(idRepetitiveActivity);
        user.addParticipants(idRepetitiveActivity);
        activity.addParticipants(idUser)
        res.json("Registration Successfully")
    }catch(error){
        console.log(error);
    }
}