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
export const DeleteActivity = async(req, res) => {
    const { idActivity } = req.body;
    try {
        const activity = await Activity.findByPk(idActivity);
        if (activity) {
            await activity.destroy();
            res.json({msg: "La actividad con ID ${id} ha sido eliminado correctamente"});
        } else {
            res.json({msg: "No se encontró ninguna actividad con ID ${id}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar la actividad con ID ${id}"});
    }
}
export const UpdateActivity = async(req, res) => {
    const { idActivity, idProfessional, datetime, idModel, createdAt,updatedAt } = req.body;
    try {
        await Activity.update({
            idActivity: idActivity,
            idProfessional:idProfessional,
            datetime: datetime,
            idModel: idModel,
            createdAt: createdAt,
            updatedAt: updatedAt
        }, {
            where: {
                idActivity: idActivity
            }
        });
        res.json({msg: "The activity has been updated correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error updating activity"});
    }
  }