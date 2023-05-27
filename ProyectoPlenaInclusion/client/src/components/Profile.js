import React, { useState } from "react";
import axios from "axios";
import userImage from '../fotos/fondoWeb.jpeg';
import bgImage from '../fotos/trebol.jpg';

function UserInformation() {
  const [mail, setMail] = useState("");
  const [customers, setCustomers] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [newMail, setNewMail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [customersRes, professionalsRes] = await Promise.all([
        axios.post("/GetUsers", { mail }),
        axios.post("/GetProfessionals", { mail })
      ]);
      setCustomers(customersRes.data);
      setProfessionals(professionalsRes.data);
      console.log(customersRes.data)
      console.log(professionalsRes.data)
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e, user) => {
    e.preventDefault();
    try {
      const { idCustomer, mail, password } = user;
      let res;
      if (idCustomer) {
        res = await axios.post("/updateCustomer", {
          idCustomer,
          newMail: newMail || mail,
          newPassword: newPassword || password,
        });
        setCustomers(customers.map((u) => {
          if (u.idCustomer === user.idCustomer) {
            return { ...u, mail: newMail || u.mail };
          } else {
            return u;
          }
        }));
      } else {
        const { idProfessional, mail, password } = user;
        let res1;
        res1 = await axios.post("/updateProfessional", {
          idProfessional,
          newMail: newMail || mail,
          newPassword: newPassword || password,
        });
        setProfessionals(professionals.map((u) => {
          if (u.idProfessional === user.idProfessional) {
            return { ...u, mail: newMail || u.mail };
          } else {
            return u;
          }
        }));
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section 
            className="hero has-background-grey-light is-fullheight is-fullwidth"
            style={{ 
                backgroundImage: `url(${bgImage})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center'
            }}>
    <div className="container my-4 d-flex flex-column align-items-center justify-content-center">
      <form onSubmit={handleSubmit} className="mb-4 w-50">
        <div className="form-group">
          <label htmlFor="mail">Mail:</label>
          <input type="text" className="form-control" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
          <br></br>
        </div>
        <button type="submit" className="btn btn-success btn-block mt-3">Buscar</button>
      </form>
    
      <div className="row w-100 justify-content-center">
        {customers.map((user) => (
          <div key={user.idCustomer} className="col-md-6">
            <div className="card mb-4 shadow-sm" style={{backgroundColor: 'rgba(255, 255, 255, 0.85)'}}>
              <div className="card-body" >
              <img src={userImage} alt="User" className="rounded-circle mx-auto d-block" style={{ width: "100px", height: "100px" }} />
                <h5 className="card-title mt-2 text-center">{user.name} {user.surname1} {user.surname2}</h5>
                <p className="card-text">ID: {user.idCustomer}</p>
                <p className="card-text">DNI: {user.DNI}</p>
                <p className="card-text">Año de nacimiento: {user.birthyear}</p>
                <p className="card-text">Mail: {user.mail}</p>
                <form onSubmit={(e) => handleUpdate(e, user)}>
                  <div className="form-group">
                    <label htmlFor="newMail">Nuevo Mail:</label>
                    <input type="text" className="form-control" id="newMail" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-success btn-block mt-3">Actualizar</button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}

export default UserInformation;
