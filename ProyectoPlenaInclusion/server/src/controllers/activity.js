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
            attributes:['idActivity','name','description','createdAt', 'updatedAt']
        });
        res.json(activity);
    } catch (error) {
        console.log(error);
    }
}
export const deleteModelActivity = async(req, res) => {
    const { idActivity } = req.body; // Obtener el ID de la actividad a eliminar desde los parámetros de la solicitud

    try {
        const actividad = await Activity.findByPk(idActivity); // Buscamos la actividad por su id
        if (actividad) {
            await actividad.destroy(); // Eliminamos la actividad
            res.json({msg: "La actividad con ID ${id} ha sido eliminada correctamente"});
        } else {
            res.json({msg: "No se encontró ninguna actividad con ID ${id}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar la actividad con ID ${id}"});
    }
}
export const UpdateModelActivity = async(req, res) => {
    const { idActivity, idUser, name, description } = req.body;
    try {
        await Activity.update({
            idUser: idUser,
            name: name,
            description: description
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
