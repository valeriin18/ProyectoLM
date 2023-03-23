import express from "express";
import { Register } from "../controllers/users.js";
const router = express.Router();

router.get('/', (req, res) => {    
    res.render('pages/index');
});

router.post('/register', Register);

export default router;