import Activity from '../models/activityModel.js';

export const CreateActivity = async(req, res) => {
    const { idActivity, idProfessional, datetime , idModel} = req.body;
    try {
        await Activity.create({
            idActivity: idActivity,
            idProfessional: idProfessional,
            datetime: datetime,
            idModel : idModel
        });
        res.json({msg: "The activity has been added correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error one of the folders is incomplete"});
    }
}