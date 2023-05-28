import Model from '../models/modelModel.js';

export const AddModel = async(req, res) => {
    const { idProfessional, name, description } = req.body;
    if (!req.file) {
        res.json({msg: "No file uploaded"});
        return;
    }
    const image = '/uploads/' + req.file.filename; 
    try {
        await Model.create({
            idProfessional: idProfessional,
            name: name,
            description: description,
            imageUrl: image
        });
        res.json({msg: "The activity has been added correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error one of the folders is incomplete"});
    }
}
export const GetModel = async(req, res) => {
    try {
        const Model = await Model.findAll({
            attributes:['idModel','name','description','createdAt', 'updatedAt']
        });
        res.json(Model);
    } catch (error) {
        console.log(error);
    }
}
export const deleteModel = async(req, res) => {
    const { idModel } = req.body; // Obtener el ID de la actividad a eliminar desde los parámetros de la solicitud

    try {
        const model = await Model.findByPk(idModel); // Buscamos la actividad por su id
        if (actividad) {
            await Model.destroy(); // Eliminamos la actividad
            res.json({msg: "La actividad con ID ${id} ha sido eliminada correctamente"});
        } else {
            res.json({msg: "No se encontró ninguna actividad con ID ${id}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar la actividad con ID ${id}"});
    }
}
export const UpdateModel = async(req, res) => {
    const { idModel, idProfessional, name, description } = req.body;
    try {
        await Model.update({
            idProfessional: idProfessional,
            name: name,
            description: description
        }, {
            where: {
                idModel: idModel
            }
        });
        res.json({msg: "The activity has been updated correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error updating activity"});
    }
}

