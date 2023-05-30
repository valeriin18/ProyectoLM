import Activity from '../models/activityModel.js';
import { Op } from "sequelize";
import Model from "../models/modelModel.js";

/**
 * Pre: ---
 * Post: METODO PARA CREAR ACTIVIDADES.
 */
export const CreateActivity = async (req, res) => {
    const { idActivity, idProfessional, datetime, idModel } = req.body;
    try {
        await Activity.create({
            idActivity: idActivity,
            idProfessional: idProfessional,
            datetime: datetime,
            idModel: idModel
        });
        res.json({ msg: "The activity has been added correctly" });
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error one of the folders is incomplete" });
    }
}

/**
 * Pre: ---
 * Post: METODO PARA BORRAR ACTIVIDADES.
 */
export const DeleteActivity = async (req, res) => {
    const { idActivity } = req.body;
    try {
        const activity = await Activity.findByPk(idActivity);
        if (activity) {
            await activity.destroy();
            res.json({ msg: "La actividad con ID ${id} ha sido eliminado correctamente" });
        } else {
            res.json({ msg: "No se encontró ninguna actividad con ID ${id}" });
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error al eliminar la actividad con ID ${id}" });
    }
}

/**
 * Pre: ---
 * Post: METODO PARA ACTUALIZAR ACTIVIDADES.
 */
export const UpdateActivity = async (req, res) => {
    const { idActivity, idProfessional, datetime, idModel, createdAt, updatedAt } = req.body;
    try {
        await Activity.update({
            idActivity: idActivity,
            idProfessional: idProfessional,
            datetime: datetime,
            idModel: idModel,
            createdAt: createdAt,
            updatedAt: updatedAt
        }, {
            where: {
                idActivity: idActivity
            }
        });
        res.json({ msg: "The activity has been updated correctly" });
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error updating activity" });
    }
}

/**
 * Pre: ---
 * Post: METODO MOSTRAR ACTIVIDADES EN UN TIEMPO.
 */
export const GetActivities = async (req, res) => {
    const { fromDate, toDate } = req.body.params;
    console.log('fromDate:', fromDate); // Agrega este console.log para verificar el valor y tipo de fromDate
    try {
        let endDate = toDate;
        if (!endDate) {
            endDate = new Date(fromDate);
            endDate.setDate(endDate.getDate() + 7);
        }
        const activityy = await Activity.findAll({
            attributes: ['idActivity'],
        });
        const idActivities = activityy.map((Activity) => Activity.idActivity);
        const activities = await Activity.findAll({
            include: {
                model: Model,
                attributes: ['name', 'description', 'imageUrl']
            },
            where: {
                idActivity: {
                    [Op.in]: idActivities,
                },
                datetime: {
                    [Op.between]: [fromDate, endDate],
                },
            },
            attributes: ['idActivity', 'datetime'],
        });
        res.json(activities);
        console.log(activities);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
}