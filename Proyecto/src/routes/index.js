import express from "express";
const router = express.Router();

router.get('/register', (req, res) => {    
    res.render('pages/index');
});

export default router;