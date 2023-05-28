import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

function Profile() {
  const [user, setUser] = useState({
        idCustomer: -1,
        name: ''
    });
  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [newMail, setNewMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [expire, setExpire] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
}, []);

const refreshToken = async () => {
  try {
      const response = await axios.get('/token');
      setToken(response.data.accessToken);
      localStorage.setItem("myToken", token);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
          ...user, // Copy other fields
          idCustomer: decoded.idCustomer,
          name: decoded.name
      });
      console.log(user.data)
      console.log(decoded);
      setExpire(decoded.exp);
  } catch (error) {
      if (error.response) {
          navigation("/");
      }
  }
}

const axiosJWT = axios.create(); 

// Siempre que se realice una peticion segura se ejcuta esta
// funcion que actualiza el accessToken si es necesario
// y en config añade los headers y los datos para las queries
axiosJWT.interceptors.request.use(async (config) => {
  const currentDate = new Date();
  if (expire * 1000 < currentDate.getTime() || expire == undefined) {
      const response = await axios.get('/token');
      console.log(response.data)
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      console.log(token.data)
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
          ...user, // Copy other fields
          idCustomer : decoded.idCustomer,
          name: decoded.name
      });
      config.params = {
          idCustomer: decoded.idCustomer
      }
      console.log(decoded)
      console.log(user.idCustomer)
      setExpire(decoded.exp);
  } else {
      config.headers.Authorization = `Bearer ${token}`;
      config.params = {
        idCustomer: user.idCustomer
      }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

  const getUsers = async () => {
    const response = await axiosJWT.post('/getUsers',
        {
            params: { 
              idCustomer : user.idCustomer
            } 
        }
    );
    console.log(response.data);
    setCustomers(response.data);
}

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

export default Profile;