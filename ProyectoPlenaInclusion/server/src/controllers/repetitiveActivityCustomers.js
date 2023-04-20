import RepetitiveActivityCustomers from "../models/repetitiveActivityCustomersModel.js";
import Customer from "../models/customerModel.js";
import RepetitiveActivity from "../models/repetitiveActivityModel.js";
export const addParticipants = async(req, res) =>{
    const{idUser, idRepetitiveActivity} = req.body;
    try{
        let Customer = await Customer.findByPk(idCustomer);
        let activity = await RepetitiveActivity.findByPk(idRepetitiveActivity);
        Customer.addParticipants(idRepetitiveActivity);
        activity.addParticipants(idCustomer)
        res.json("Registration Successfully")
    }catch(error){
        console.log(error);
    }
}