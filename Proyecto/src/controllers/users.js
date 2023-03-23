import Users from '../models/userModel.js';
import bcrypt from "bcrypt";

// npm install bcrypt

export const Register = async(req, res) => {
    const { name, surname, username, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coincides"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Users.create({
            name : name,
            surname : surname,
            username: username,
            password: hashPassword
        });
        res.json({msg: "Se ha registrado correctamente"});
    } catch (error) {
        console.log(error)
    }
}