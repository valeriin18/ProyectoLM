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
import { GetParticipantsDates } from "../controllers/participants.js"
import { LoginCustomer } from "../controllers/customer.js";
import { getUsers } from "../controllers/customer.js";
import { GetProfessionals } from "../controllers/professional.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../models/RefreshToken.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { logout } from "../controllers/customer.js";

/**
 * Pre: ---
 * Post: VARIABLES PARA RUTA ACTUAL
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Pre: ---
 * Post: EXPRESS ROUTER
 */
const router = express.Router();
router.get('/', (req, res) => {    
    res.render('pages/index');
});

/**
 * Pre: ---
 * Post: METODO OBTENER RUTA REAL HASTA DIRECTORIO ACTUAL
 */
const uploadsDirectory = path.join(__dirname, '../uploads'); // ajusta este camino según tu estructura de directorios
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDirectory);
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

/**
 * Pre: ---
 * Post: METODO UPLOAD IMAGEN
 */
router.post('/addModel', upload.single('image'), (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
    } else {
        console.log(req.file);
        next();
    }
}, AddModel);

/**
 * Pre: ---
 * Post: PROFESSIONAL ROUTER
 */
router.post('/registerProfessional', RegisterProfessional);
router.post('/loginProfessional', LoginProfessional);
router.post('/deleteProfessional', deleteProfessional);
router.post('/updateProfessional',UpdateProfessional);
router.post('/getProfessionals', GetProfessionals);

/**
 * Pre: ---
 * Post: USER ROUTER
 */
router.post('/getUsers', verifyToken, getUsers);
router.post('/registerCustomer' , RegisterCustom);
router.post('/addParticipants', addParticipants);
router.post('/deleteCustomer', DeleteCustomer);
router.post('/getParticipants', GetParticipants);
router.post('/updateCustomer', UpdateCustommer);
router.post('/UpdateParticipant', UpdateParticipant);
router.post('/deleteParticipants', deleteParticipants);
router.post('/getActivitiesInTime', GetActivities);
router.post('/getParticipantsDates', verifyToken, GetParticipantsDates);
router.post('/loginCustomer', LoginCustomer);
router.post('/logout', logout);

//ACTIVITY ROUTER
router.post('/getActivity', GetModel);
router.post('/deleteModel', deleteModel);
router.post('/updateModel',UpdateModel);
router.post('/addActivity',CreateActivity);
router.post('/deleteActivity',DeleteActivity);
router.post('/updateActivity',UpdateActivity)


/**
 * Pre: ---
 * Post: TOKENS ROUTER
 */
router.get('/token', refreshToken);


export default router;