import express from "express";
import { AddModel } from "../controllers/model.js";
import { GetModel } from "../controllers/model.js"
import { deleteModel } from "../controllers/model.js";
import { UpdateModel } from "../controllers/model.js";
import { CreateActivity } from "../controllers/activity.js";
import { DeleteActivity } from "../controllers/activity.js";
import { UpdateActivity } from "../controllers/activity.js";
import { RegisterCustom} from "../controllers/customer.js";
import { DeleteCustomer} from "../controllers/customer.js";
import { UpdateCustommer } from "../controllers/customer.js";
import { RegisterProfessional } from "../controllers/professional.js";
import { LoginProfessional } from "../controllers/professional.js";
import { deleteProfessional } from "../controllers/professional.js";
import { UpdateProfessional } from "../controllers/professional.js";
import { addParticipants } from "../controllers/participants.js";
import { UpdateParticipant } from "../controllers/participants.js";
import { GetParticipants } from "../controllers/participants.js";
import { deleteParticipants } from "../controllers/participants.js";
import { GetActivities } from "../controllers/activity.js";


const router = express.Router();
router.get('/', (req, res) => {    
    res.render('pages/index');
});
router.post('/addModel', AddModel);
router.post('/getActivity', GetModel);
router.post('/deleteModel', deleteModel);
router.post('/updateModel',UpdateModel);
router.post('/addActivity',CreateActivity);
router.post('/deleteActivity',DeleteActivity);
router.post('/updateActivity',UpdateActivity)
router.post('/registerProfessional', RegisterProfessional);
router.post('/registerCustomer' , RegisterCustom);
router.post('/loginProfessional', LoginProfessional);
router.post('/deleteProfessional', deleteProfessional);
router.post('/updateProfessional',UpdateProfessional);
router.post('/addParticipants', addParticipants);
router.post('/deleteCustomer', DeleteCustomer);
router.post('/getParticipants', GetParticipants);
router.post('/updateCustomer', UpdateCustommer);
router.post('/UpdateParticipant', UpdateParticipant);
router.post('/deleteParticipants', deleteParticipants);
router.post('/getActivitiesInTime', GetActivities);
export default router;

