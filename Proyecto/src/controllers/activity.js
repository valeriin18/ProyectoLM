import Activity from '../models/activityModel.js';
export const CreateActivity = async(req, res) =>{
    const{name, description, date} = req.body;
    console.log(date)
    try{
        await Activity.create({
            name : name,
            description : description,
            date : date
        });
        res.json("Activity create");
    }catch(error){
        console.log(error);
    }
}
export const GetActivity = async(req, res) => {
    try {
        const activity = await Activity.findAll({
            attributes:['idAct','name','date','createdAt', 'updatedAt']
        });
        res.json(activity);
    } catch (error) {
        console.log(error);
    }
}