import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { Fa } from 'react-icons/fa';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Dashboard = () => {
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [user, setUser] = useState({
    idCustomer: -1,
    name: ''
  });
  const [activitiesByUserDate, setActivitiesByUserDate] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const navigation = useNavigate();

  useEffect(() => {
    refreshToken();
    defaultDate();
    getActivitiesByUserDate(new Event('firstTime'));
  }, []);

  const defaultDate = () => {
    const curr = new Date();
    const fromDate = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 7);
    const toDate = curr.toISOString().substring(0, 10);
    setFromDate(fromDate);
    setToDate(toDate);
  }

  const refreshToken = async () => {
    try {
      const response = await axios.get('/token');
      setToken(response.data.accessToken);
      localStorage.setItem("myToken", token);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
        ...user,
        idCustomer: decoded.idCustomer,
        name: decoded.name
      });
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigation("/");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime() || expire == undefined) {
      const response = await axios.get('/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setUser({
        ...user,
        idCustomer: decoded.idCustomer,
        name: decoded.name
      });
      config.params = {
        idCustomer: decoded.idCustomer
      }
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

  const getActivitiesByUserDate = async (e) => {
    e.preventDefault();
    const response = await axiosJWT.post('/getParticipantsDates', {
      params: {
        idCustomer: user.idCustomer,
        fromDate: fromDate,
        toDate: toDate
      }
    });
    setActivitiesByUserDate(response.data);
  }

  const days = (date_1, date_2) => {
    const difference = date_1.getTime() - date_2.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
  }

  const DeleteParticipant = async (e, idActivity) => {
    e.preventDefault();
    try {
      await axiosJWT.post('deleteParticipants', {
        idActivity: idActivity,
        idCustomer: user.idCustomer
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  const handleUnsubscribe = (e, idActivity) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirmación',
      message: '¿Está seguro de desapuntarse de esta actividad?',
      buttons: [
        {
          label: 'Sí',
          onClick: () => {
            DeleteParticipant(e, idActivity);
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
    <div className="container mt-5 top">
    <div className='text-center bg-dark py-5 shadow' style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <h1 className='mb-3 display-4 text-light'>Mis actividades</h1>
    </div>
      <Navbar className="border-bottom border-gray py-3 bg-white">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
            <Form className="d-flex" onSubmit={getActivitiesByUserDate}>
              <Form.Control className="me-2" type="date" placeholder="Fecha" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <Form.Control className="me-2" type="date" placeholder="Fecha" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              <Button variant="success" type="submit">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {activitiesByUserDate.length <= 0 &&
      <h2 className="noActivity" style={{ marginBottom: '14.75%' }}>
      No tienes ninguna actividad en las fechas seleccionadas.
        </h2>
      }
      <Row xs={1} md={4} className="g-4 mt-1 mb-5">
        {activitiesByUserDate.map((activitiesbyUserdate) => (
          <Col key={activitiesbyUserdate.idActivity} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow hover-zoom">
              <Card.Img variant="top" src={'http://localhost:5000' + activitiesbyUserdate.model.imageUrl} />
              <Card.Body>
                <Card.Title className="text-center font-weight-bold">{activitiesbyUserdate.model.name}</Card.Title>
                <Card.Text><span className="font-weight-bold">Fecha:</span> {activitiesbyUserdate.datetime}</Card.Text>
                <Card.Text><span className="font-weight-bold">Descripción:</span> {activitiesbyUserdate.model.description}</Card.Text>
                <Button variant="danger" onClick={(e) => handleUnsubscribe(e, activitiesbyUserdate.idActivity)}>Desapúntate</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard

