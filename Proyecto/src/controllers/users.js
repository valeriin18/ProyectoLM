import Users from '../models/userModel.js';
import bcrypt from "bcrypt";
export const Register = async(req, res) => {
    const { name, surname, username, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coinciden"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Users.create({
            name : name,
            surname : surname,
            username: username,
            password: hashPassword
        });
        res.render('pages/actividades.ejs');
    } catch (error) {
        console.log(error);
    }
}
export const GetUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','surname','username','password']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}