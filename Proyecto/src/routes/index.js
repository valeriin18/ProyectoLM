import express from "express";
import { Register } from "../controllers/users.js";
import { GetUsers } from "../controllers/users.js";
import { CreateActivity } from "../controllers/activity.js";
import { GetActivity } from "../controllers/activity.js"
import { GetrepetitiveActivity } from "../controllers/repetitiveActivity.js";
import { addParticipants } from "../controllers/participants.js";
import {  } from "../controllers/customer.js"
import {  } from "../controllers/professional.js";
const router = express.Router();
router.get('/', (req, res) => {    
    res.render('pages/index');
});
router.post('/register',Register);
router.post('/getUsers', GetUsers);
router.post('/activity', CreateActivity);
router.post('/getActivity', GetActivity);
router.post('/getrepetitiveActivity',GetrepetitiveActivity);
router.post('/participants', addParticipants);
export default router;