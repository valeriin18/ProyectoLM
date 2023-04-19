import Customers from "../models/customerModel.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
export const RegisterCustom = async(req, res) => {
    const { DNI, name, surname1, surname2, birthyear, mail, gender, specialCare, dataTutor} = req.body;
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
            specialCare: specialCare,
            dataTutor: dataTutor
        })
        res.json("Register");
    } catch (error) {
        console.log(error);
    }
}

export const DeleteUsers = async(req, res) => {
    const {idUser} = req.body;
    try {
        await Users.destroy({
            where: {
                idUser: idUser
            }
          });
        res.json({msg: "The user has been deleted"});
    } catch (error) {
        console.log(error);
        res.json({msg: "Error user not found"});
    }
}
