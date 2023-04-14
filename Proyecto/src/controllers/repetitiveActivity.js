import repetitiveActivity from '../models/repetitiveActivityModel.js';

export const GetrepetitiveActivity = async(req, res) => {
    try {
        const repetitiveActivity = await repetitiveActivity.findAll({
            attributes:['idRepetitiveActivity','idUser','datetime','idActivity']
        });
        res.json(repetitiveActivity);
    } catch (error) {
        console.log(error);
    }
}