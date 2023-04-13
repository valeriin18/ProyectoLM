import Professional from "../models/professionalModel.js";
export const CreateProfessional = async(req, res) =>{
    const{availability} = req.body;
    console.log(date)
    try{
        await Professional.create({
            availability : availability
        });
        res.json("Activity create");
    }catch(error){
        console.log(error);
    }
}