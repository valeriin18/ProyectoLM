import Activity from '../models/activityModel.js';
export const AddModelActivity = async(req, res) => {
    const { idUser, name, description } = req.body;
    try {
        await Activity.create({
            idUser: idUser,
            name: name,
            description: description
        });
        res.json({msg: "The activity has been added correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error one of the folders is incomplete"});
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