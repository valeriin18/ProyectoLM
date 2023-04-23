import Customers from "../models/customerModel.js";
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
    const { idCustomer, DNI, name, surname1, surname2, birthyear, mail, gender, specialCares, dataTutor, createdAt,updatedAt } = req.body;
    try {
        await Customers.update({
            idCustomer: idCustomer,
            DNI:DNI,
            name: name,
            surname1: surname1,
            surname2: surname2,
            birthyear: birthyear,
            mail: mail,
            gender: gender,
            specialCares: specialCares,
            dataTutor: dataTutor,
            createdAt:createdAt,
            updatedAt:updatedAt
        }, {
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