import express from "express";
import { AddModelActivity } from "../controllers/activity.js";
import { GetActivity } from "../controllers/activity.js"
import { deleteModelActivity } from "../controllers/activity.js";
import { UpdateModelActivity } from "../controllers/activity.js";
import { CreateRepetitiveActivity } from "../controllers/repetitiveActivity.js";
import { RegisterCustom, DeleteUsers } from "../controllers/customer.js"
import { RegisterProfessional } from "../controllers/professional.js";
import { LoginProfessional } from "../controllers/professional.js";
import { addParticipants } from "../controllers/repetitiveActivityCustomers.js";

const router = express.Router();
router.get('/', (req, res) => {    
    res.render('pages/index');
});
router.post('/addModelActivity', AddModelActivity);
router.post('/getActivity', GetActivity);
router.post('/deleteModelActivity', deleteModelActivity);
router.post('/updateModelActivity',UpdateModelActivity);
router.post('/addActivity',CreateRepetitiveActivity);
router.post('/registerProfessional', RegisterProfessional)
router.post('/registerCustomer' , RegisterCustom)
router.post('/loginProfessional', LoginProfessional)
router.post('/addParticipants', addParticipants)
router.post('/deleteUsers', DeleteUsers)
export default router;