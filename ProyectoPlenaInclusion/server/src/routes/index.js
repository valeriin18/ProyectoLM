import express from "express";
import { CreateActivity } from "../controllers/activity.js";
import { GetActivity } from "../controllers/activity.js"
import { GetrepetitiveActivity } from "../controllers/repetitiveActivity.js";
import { addParticipants } from "../controllers/participants.js";
import { RegisterCustom } from "../controllers/customer.js"
import { RegisterProfessional } from "../controllers/professional.js";
import {} from "../controllers/repetitiveActivityCustomers.js";

const router = express.Router();
router.get('/', (req, res) => {    
    res.render('pages/index');
});
router.post('/activity', CreateActivity);
router.post('/getActivity', GetActivity);
router.post('/getrepetitiveActivity',GetrepetitiveActivity);
router.post('/participants', addParticipants);
router.post('/registerProfessional', RegisterProfessional)
router.post('/registerCustomer' , RegisterCustom)
export default router;