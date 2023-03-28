import express from "express";
import { Register } from "../controllers/users.js";
import { GetUsers } from "../controllers/users.js";
import { CreateActivity } from "../controllers/activity.js";
import { GetActivity } from "../controllers/activity.js"


const router = express.Router();

router.get('/', (req, res) => {    
    res.render('pages/index');
});

router.post('/register',Register);
router.post('/getUsers', GetUsers);
router.post('/activity', CreateActivity);
router.post('/getActivity', GetActivity);


export default router;