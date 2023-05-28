
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import userImage from '../fotos/fondoWeb.jpeg';
import bgImage from '../fotos/trebol.jpg';

function UserInformation() {
  const [mail, setMail] = useState("");
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
export default Profile
