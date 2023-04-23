import participants from "../models/participantsModel.js";
import Customer from "../models/customerModel.js";
import Activity from "../models/activityModel.js";

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
export const GetParticipans = async(req, res) => {
  const { idParticipant } = req.body;
  try {
      const participant = await participants.findByPk(idParticipant,{
          attributes:['idCustomer','idActivity','createdAt', 'updatedAt']
      });
      res.json(participant);
  } catch (error) {
      console.log(error);
  }
}