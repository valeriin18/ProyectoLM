import Professional from "../models/professionalModel.js";
import bcrypt from "bcrypt";
export const RegisterProfessional = async(req, res) => {
    const { DNI, name, surname1, surname2, birthyear, mail, availability, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Passwords do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try{
        console.log(mail)
        await Professional.create({
          DNI : DNI,
          name : name,
          surname1: surname1,
          surname2: surname2,
          birthyear: birthyear,
          mail: mail,
          availability: availability,
          password: hashPassword
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
      const professional = await Professional.findOne({ where: { mail } });
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
  export const deleteProfessional = async(req, res) => {
    const { idProfessional } = req.body;
    try {
        const professional = await Professional.findByPk(idProfessional);
        if (professional) {
            await professional.destroy();
            res.json({msg: "el profesional con ID ${id} ha sido eliminado correctamente"});
        } else {
            res.json({msg: "No se encontró ningun profesional con ID ${id}"});
        }
    } catch (error) {
        console.log(error);
        res.json({msg: "Error al eliminar el profesional con ID ${id}"});
    }
}
export const UpdateProfessional = async(req, res) => {
  const { idProfessional, newMail, newPassword } = req.body;
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
        await Professional.update(updateFields, {
            where: {
                idProfessional: idProfessional
            }
        });
      res.json({msg: "The professional has been updated correctly"});
  } catch (error) {
      console.log(error);
      res.json({msg: "Error updating professional"});
  }
}
export const GetProfessionals = async(req, res) => {
  const { mail } = req.body;
  try {
  const user = await Professional.findAll({
      where: { mail },
      attributes: [ 'DNI' , 'name' , 'surname1' , 'surname2' , 'birthyear' , 'mail', 'availability' , 'password' ]
  });
      res.json(user);
  } catch (error) {
      console.log(error);
  }
}