import Professional from "../models/professionalModel.js";
import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
export const RegisterProfessional = async(req, res) => {
    const { DNI, name, surname1, surname2, birthyear, mail, availability, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Las contraseñas no coincides"});
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
        console.log(mail)
        await Professional.create({
            availability: availability
        })
        res.json("Register");
    } catch (error) {
        console.log(error);
    }
}

export const LoginProfessional = async(req, res) => {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.status(400).json({msg: "Username and Password are required"});
    }
    try {
      const professional = await Users.findOne({ where: { mail } });
      if (!professional) {
        return res.status(400).json({msg: "Invalid Username or Password"});
      }
      const isMatch = await bcrypt.compare(password, professional.password);
      if (!isMatch) {
        return res.status(400).json({msg: "Invalid Username or Password"});
      }
      res.json({msg: "Login Successful"});
    } catch (error) {
      console.log(error);
      res.status(500).json({msg: "Internal Server Error"});
    }
  }