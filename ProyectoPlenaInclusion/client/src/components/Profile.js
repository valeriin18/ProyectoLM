import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Card, Button, Container } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import bgImage from '../images/verde.jpg';
import imagenusuario from '../images/usuario.png';

function Profile() {
  const [user, setUser] = useState({
    idCustomer: -1,
    name: ''
  });
  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
  const [newMail, setNewMail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [expire, setExpire] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, [user.idCustomer]);

  /**
  Pre: ---
  Post:Metodo que se utiliza para obtener un nuevo token de acceso (accessToken) llamando a la ruta /token en el servidor. 
  Después de recibir la respuesta exitosa, se actualiza el estado token con el valor del nuevo token. 
  */
  const refreshToken = async () => {
    try {
      const response = await axios.get('/token');
      setToken(response.data.accessToken);
      localStorage.setItem('myToken', token);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
        ...user, // Copy other fields
        idCustomer: decoded.idCustomer,
        name: decoded.name
      });
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigation('/');
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime() || expire === undefined) {
      const response = await axios.get('/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
        ...user, // Copy other fields
        idCustomer: decoded.idCustomer,
        name: decoded.name
      });
      config.params = {
        idCustomer: decoded.idCustomer
      };
      setExpire(decoded.exp);
    } else {
      config.headers.Authorization = `Bearer ${token}`;
      config.params = {
        userId: user.userId
      };
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const getUsers = async () => {
    const response = await axiosJWT.post('/getUsers', {
      params: {
        idCustomer: user.idCustomer
      }
    });
    setCustomers(response.data);
  };

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
                res = await axios.post('/updateCustomer', {
                  idCustomer,
                  newMail: newMail || mail,
                  newPassword: newPassword || password
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
          }
        },
        {
          label: 'No',
          onClick: () => {
            // No hacer nada
          }
        }
      ]
    });
  };

  return (
    <section 
      className="hero has-background-grey-light is-fullheight is-fullwidth"
      style={{ 
        backgroundImage: `url(${bgImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="w-50 border-0 shadow-lg p-4 d-flex">
          <div className="w-40 pe-4">
            {customers.map((user) => (
              <div key={user.idCustomer} className="my-4">
                <div className="text-center">
                  <img src={imagenusuario} alt="Foto de perfil" className="rounded-circle img-thumbnail mx-auto d-block" style={{ width: '100px', height: '100px' }} />
                  <h2 className="text-center mb-4">{user.name} {user.surname1} {user.surname2}</h2>
                </div>
                <hr className="my-4" />
                <div>
                  <p><strong>ID:</strong> {user.idCustomer}</p>
                  <p><strong>DNI:</strong> {user.DNI}</p>
                  <p><strong>Birth Year:</strong> {user.birthyear}</p>
                  <p><strong>Mail:</strong> {user.mail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-60">
            {customers.map((user) => (
              <div key={user.idCustomer} className="my-4">
                <form onSubmit={(e) => handleUpdate(e, user)}>
                  <div className="mb-3">
                    <label htmlFor="newMail" className="form-label">Nuevo Mail:</label>
                    <input type="text" className="form-control" id="newMail" value={newMail} onChange={(e) => setNewMail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
                    <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-success">Actualizar</button>
                </form>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </section>
  );
}

export default Profile;
