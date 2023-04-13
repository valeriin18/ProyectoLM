import Customers from "../models/customerModels.js";
export const CreateCustomers = async(req, res) =>{
    const{name, description, date} = req.body;
    console.log(date)
    try{
        await Customers.create({
            name : name,
            description : description,
            date : date
        });
        res.json("Activity create");
    }catch(error){
        console.log(error);
    }
}