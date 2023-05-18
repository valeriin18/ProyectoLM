import React, { useState } from "react";
import axios from "axios";

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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">Mail:</label>
          <input type="text" className="form-control" id="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {customers.map((user) => (
        <div key={user.idCustomer} className="my-4">
          <h2>{user.name} {user.surname1} {user.surname2}</h2>
          <p>ID: {user.idCustomer}</p>
          <p>DNI: {user.DNI}</p>
          <p>Birth Year: {user.birthyear}</p>
          <p>Mail: {user.mail}</p>
          <form onSubmit={(e) => handleUpdate(e, user)}>
            <div className="mb-3">
              <label htmlFor="newMail" className="form-label">Nuevo Mail:</label>
              <input type="text" className="form-control" id="newMail" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
              <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </form>
        </div>
      ))}
      {professionals.map((user) => (
        <div key={user.idProfessional} className="my-4">
          <h2>{user.name} {user.surname1} {user.surname2}</h2>
          <p>DNI: {user.DNI}</p>
          <p>Birth Year: {user.birthyear}</p>
          <p>Mail: {user.mail}</p>
          <p>Availability: {user.availability}</p>
          <form onSubmit={(e) => handleUpdate(e, user)}>
            <div className="mb-3">
              <label htmlFor="newMail" className="form-label">Nuevo Mail:</label>
              <input type="text" className="form-control" id="newMail" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
              <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Actualizar</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default UserInformation;
