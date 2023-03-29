import Activity from '../models/activityModel.js';
import bcrypt from "bcrypt";

export const CreateActivity = async(req, res) =>{
    const{name, description} = req.body;
    try{
        await Activity.create({
            name : name,
            description : description
        });
        res.json("Actividad creada");
    }catch(error){
        console.log(error);
    }
}
export const GetActivity = async(req, res) => {
    try {
        const activity = await Activity.findAll({
            attributes:['id','name']
        });
        res.json(activity);
    } catch (error) {
        console.log(error);
    }
}