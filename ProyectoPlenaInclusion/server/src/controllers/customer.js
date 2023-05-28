import Customers from "../models/customerModel.js";
import bcrypt, { genSalt, genSaltSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterCustom = async(req, res) => {
    const { DNI, name, surname1, surname2, birthyear, mail, gender, specialCares, dataTutor} = req.body;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = ""
        for (let i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Customers.create({
            DNI : DNI,
            name : name,
            surname1: surname1,
            surname2: surname2,
            birthyear: birthyear,
            mail: mail,
            password: hashPassword,
            gender: gender,
            specialCares: specialCares,
            dataTutor: dataTutor
        })
        res.json("Register");
    } catch (error) {
        console.log(error);
    }
}
export const DeleteCustomer = async(req, res) => {
    const { idCustomer } = req.body; // Obtener el ID de la actividad a eliminar desde los parámetros de la solicitud
    try {
        const customers = await customers.findByPk(idCustomer);
        if (customers) {
            await customers.destroy(); // Eliminamos la actividad
            res.json({msg: "el usuario con ID ${idCustomer} ha sido eliminada correctamente"});
        } else {
            res.json({msg: "No se encontró ningun Usuario con ID ${idCustomer}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar el usuario con ID ${idCustomer}"});
    }
}
export const UpdateCustommer = async(req, res) => {
    const { idCustomer, newMail, newPassword } = req.body;
    try {
        let updateFields = {}
        if (newMail) {
            updateFields.mail = newMail
        }
        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            updateFields.password = hashPassword
        }
        await Customers.update(updateFields, {
            where: {
                idCustomer: idCustomer
            }
        });
        res.json({msg: "The customer has been updated correctly"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error updating customer"});
    }
}
export const LoginCustomer = async(req, res) => {
    const { mail, password } = req.body;
    console.log(mail, password);
    if (!mail || !password) {
    return res.status(400).json({msg: "Username and Password are required"});
    }
    try {
    const customer = await Customers.findOne({ where: { mail } });
    if (!customer) {
        return res.status(400).json({msg: "Invalid Username or Password"});
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
        return res.status(400).json({msg: "Invalid Username or Password"});
    }
    const idCustomer = customer.idCustomer;
    const name = customer.name;
    const mailCustomer = customer.mail;
    const accessToken = jwt.sign({idCustomer, name, mailCustomer}, process.env.ACCESS_TOKEN_SECRET,{expiresIn : '15s'});
    const refreshToken = jwt.sign({idCustomer, name, mailCustomer}, process.env.REFRESH_TOKEN_SECRET,{expiresIn : '1d'});
    await Customers.update({refreshToken : refreshToken}, {where : {idCustomer : idCustomer}});
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge : 24 * 60 *60 * 1000
    });
    res.json(accessToken);
    } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Internal Server Error"});
    }
}
export const getUsers = async(req, res) => {
    const { idCustomer } = req.body.params;
    try {
    const user = await Customers.findAll({
        where: { idCustomer },
        attributes: [ 'idCustomer' , 'DNI' , 'name' , 'surname1' , 'surname2' , 'birthyear' , 'mail' , 'gender', 'specialCares', 'dataTutor' , 'createdAt' , 'updatedAt' ]
    });
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}