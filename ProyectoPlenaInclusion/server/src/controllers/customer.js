import Customers from "../models/customerModel.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
export const RegisterCustom = async(req, res) => {
    const { DNI, name, surname1, surname2, birthyear, mail, gender, specialCares, dataTutor} = req.body;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = " "
        for (let i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        await Users.create({
            DNI : DNI,
            name : name,
            surname1: surname1,
            surname2: surname2,
            birthyear: birthyear,
            mail: mail,
            password: hashPassword
        });
        await Customers.create({
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
    const { idUser } = req.body; // Obtener el ID de la actividad a eliminar desde los parámetros de la solicitud

    try {
        const Customers = await Customers.findByPk(idUser); // Buscamos la actividad por su id
        if (Customers) {
            await Customers.destroy(); // Eliminamos la actividad
            res.json({msg: "el usuario con ID ${idUser} ha sido eliminada correctamente"});
        } else {
            res.json({msg: "No se encontró ningun Usuario con ID ${idUser}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar el usuario con ID ${idUser}"});
    }
}