  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { Navbar, Container, Nav, Form, Button, Row, Col, Card } from 'react-bootstrap';
  import { confirmAlert } from 'react-confirm-alert';
  import 'react-confirm-alert/src/react-confirm-alert.css';
  import jwt_decode from "jwt-decode";
  import { useNavigate } from 'react-router-dom'

  const Activities = () => {
    const [user, setUser] = useState({
      idCustomer: -1,
      name: ''
  });
    const [token, setToken] = useState('');
    const [activitiesInTime, setActivitiesInTime] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [expire, setExpire] = useState('');

    const navigation = useNavigate();

    useEffect(() => {
      defaultDate();
      refreshToken();
      getActivities(new Event('firstTime'));
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

    const defaultDate = async () => {
      const curr = new Date();
      const fromDate = curr.toISOString().substring(0, 10);
      curr.setDate(curr.getDate() + 7);
      const toDate = curr.toISOString().substring(0, 10);
      setFromDate(fromDate);
      setToDate(toDate);
    };

    const getActivities = async (e) => {
      e.preventDefault();
      const response = await axios.post('/getActivitiesInTime', {
        params: {
          fromDate: fromDate,
          toDate: toDate
        }
      });
      console.log(response.data);
      setActivitiesInTime(response.data);
    };

    const handleSignUp = (idActivity) => {
      confirmAlert({
        title: 'Confirmación',
        message: '¿Está seguro de apuntarse a esta actividad?',
        buttons: [
          {
            label: 'Sí',
            onClick: () => {
              const idCustomer = user.idCustomer; // Obtener el ID del usuario desde el Refresh Token
              checkParticipant(idCustomer, idActivity);
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

    const checkParticipant = async (idCustomer, idActivity) => {
      try {
        const response = await axios.post('/getParticipants', {
          idCustomer: idCustomer,
        });
        const participants = response.data;
        const isParticipant = participants.some((participant) => participant.idActivity === idActivity);
        if (isParticipant) {
          alert('Ya estás apuntado a esta actividad.');
        } else {
          addParticipant(idCustomer, idActivity);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const addParticipant = async (idCustomer, idActivity) => {
      try {
        await axiosJWT.post('/addParticipants', {
          idCustomer: idCustomer,
          idActivity: idActivity,
        });
        alert('Te has apuntado correctamente a la actividad.');
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="container mt-5 top">
        <div className='p-5 text-center bg-dark'>
        <h1 className='mb-3 display-4 text-light'>Actividades Disponibles</h1>
        </div>
        <Navbar className="border-bottom border-gray pb-5 bg-white">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              </Nav>
              <Form className="d-flex" onSubmit={getActivities}>
                <Form.Control className="me-2" type="date" placeholder="Fecha" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <Form.Control className="me-2" type="date" placeholder="Fecha" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <Button variant="outline-success" type="submit">Buscar</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {activitiesInTime.length <= 0 &&
          <h2 className="noActivity" style={{ marginBottom: '14.75%' }}>
            No hay actividad en las fechas seleccionadas.
          </h2>
        }
        <Row xs={1} md={4} className="g-4 mt-1 mb-5">
          {activitiesInTime.map((activity) => (
            <Col key={activity.idActivity}xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow hover-zoom">
                <Card.Img variant="top" src={'http://localhost:5000' + activity.model.imageUrl} />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{activity.model.name}</Card.Title>
                  <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activity.datetime}</Card.Text>
                  <Card.Text><span style={{ fontWeight: 'bold' }}>Descripcion:</span> {activity.model.description}</Card.Text>
                  <Button variant="success" onClick={() => handleSignUp(activity.idActivity)}>Apúntate</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  export default Activities;