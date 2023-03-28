import activity from '../models/activityModel.js';
import bcrypt from "bcrypt";

export const Activity = async(req, res) =>{
    const{name, description} = req.body;
    try{
        await Activity.create({
            name : name,
            description : description
        });
        res.render('pages/prueba.ejs');
    }catch(error){
        console.log(error);
    }
}