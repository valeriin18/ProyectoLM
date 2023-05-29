import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Profile() {
  const [user, setUser] = useState({
        idCustomer: -1,
        name: ''
    });
  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
  const [newMail, setNewMail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [expire, setExpire] = useState('');

  const navigation = useNavigate();

useEffect(() => {
  refreshToken();
  getUsers();
}, [user.idCustomer]);


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
        userId: user.userId
      }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

  const getUsers = async (e) => {
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
  confirmAlert({
    title: 'Confirmación',
    message: '¿Está seguro de actualizar el usuario?',
    buttons: [
      {
        label: 'Sí',
        onClick: async () => {
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
              window.alert('El usuario se ha actualizado correctamente.');
            }
            console.log(res.data);
          } catch (error) {
            console.log(error);
            window.alert('Hubo un error al actualizar el usuario.');
          }
        },
      },
      {
        label: 'No',
        onClick: () => {
          // No hacer nada
        },
      },
    ],
  });
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
            <button type="submit" className="btn btn-primary" onClick={(e) => handleUpdate(e, user)}>Actualizar</button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default Profile;