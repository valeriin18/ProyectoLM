import RepetitiveActivity from '../models/repetitiveActivityModel.js';

export const CreateRepetitiveActivity = async(req, res) => {
    const { idRepetitiveActivity, idUser, datetime , idActivity} = req.body;
    try {
        await RepetitiveActivity.create({
            idRepetitiveActivity: idRepetitiveActivity,
            idUser: idUser,
            datetime: datetime,
            idActivity : idActivity
        });
        res.json({msg: "The activity has been added correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error one of the folders is incomplete"});
    }
}