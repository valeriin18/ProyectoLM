import participants from "../models/participantsModel.js";
import Customer from "../models/customerModel.js";
import Activity from "../models/activityModel.js";
import { Op } from "sequelize";
import Model from "../models/modelModel.js";
import sequelize from "sequelize";

export const addParticipants = async (req, res) => {
  const { idCustomer, idActivity } = req.body;
  console.log('valor de customerId: ' + idCustomer);
  console.log('valor de activityId:' + idActivity);
  try {
    const customer = await Customer.findByPk(idCustomer);
    console.log('valor de customer:' + customer.idCustomer);
    const activity = await Activity.findByPk(idActivity);
    console.log('valor de activity:' + activity.idActivity);
    if (!customer || !activity) {
      // Manejo del error si no se encuentra un registro
      throw new Error("No se encontró un registro de Customer o RepetitiveActivity");
    }

    await participants.create({
      idCustomer: customer.idCustomer,
      idActivity: activity.idActivity
    });

    res.json("Add");
  } catch (error) {
    console.log(error);
  }
}
export const GetParticipants = async(req, res) => {
  const { idCustomer } = req.body;
  try {
    const participant = await participants.findAll({
      where: { idCustomer },
      attributes: ['idCustomer', 'idActivity', 'createdAt', 'updatedAt']
    });
      res.json(participant);
  } catch (error) {
      console.log(error);
  }
}
export const deleteParticipants = async (req, res) => {
  const { idCustomer, idActivity } = req.body;
  try {
    const participant = await participants.findByPk(idCustomer);
    const activity = await Activity.findByPk(idActivity);
    if (participant && activity && participant.idActivity === activity.idActivity) { // Verifica que el participante está registrado en la actividad
      await participant.destroy();
      res.json({ msg: `El participante con ID ${idCustomer} ha sido eliminado correctamente` });
    } else {
      res.json({ msg: `No se encontró ningún participante con ID ${idCustomer} registrado en la actividad con ID ${idActivity}` });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: `Error al eliminar el participante con ID ${idCustomer}` });
  }
}
export const UpdateParticipant = async(req, res) => {
  const { idCustomer, idActivity } = req.body;
  try {
      await participants.update({
          idCustomer: idCustomer,
          idActivity: idActivity
      }, {
          where: {
              idCustomer: idCustomer,
              idActivity: idActivity
          }
      });
      res.json({msg: "The participant has been updated correctly"});
  } catch (error) {
      console.log(error);
      res.json({msg: "Error updating Participant"});
  }
}
export const GetParticipantsDates = async (req, res) => {
  const { idCustomer, fromDate, toDate } = req.body.parameters;
  console.log(idCustomer + fromDate + toDate);
  try {
    let endDate = toDate;
    if (!endDate) {
      endDate = new Date(fromDate);
      endDate.setDate(endDate.getDate() + 7);
    }
    const participantsList = await participants.findAll({
      where: {
        idCustomer,
      },
      include: [
        {
          model: Customer,
        },
        {
          model: Activity,
          include: [
            {
              model: Model,
            },
            {
              model: participants,
              where: {
                idCustomer
              },
              required: true,
              where: {
                datetime: {
                  [Op.between]: [fromDate, endDate]
                }
              }
            }
          ],
          where: {
            datetime: {
              [Op.between]: [fromDate, endDate]
            },
          },
        },
      ],
    });
    console.log(participantsList); // Añadido para depurar
    res.json(participantsList);
  } catch (error) {
    console.log(error);
  }
};