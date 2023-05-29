//! TRIGGER -> UPDATE activities SET nParticipants = nParticipants - 1 WHERE id = OLD.activityId
//TODO: hay funciones duplicadas o cosas que se pueden meter en un fichero e importarlas. Hay que darle un repaso.
//TODO: crear variables globales de proyecto donde meter la url del host
//TODO: ¿necesario enviar recordatorio a los chavales cuando se acerca la actividad?
//TODO: ¿necesario permitir añadir un eventor al calendario de Google Calendar?
//TODO: ¿enviar mensaje cuando se cree una nueva actividad?
//TODO: añadir mensaje de verificacion siempre que se cree/edite/elimine algo
//TODO: si se quiere añadir pantalla de carga con circulito dando vueltas: https://stackabuse.com/how-to-create-a-loading-animation-in-react-from-scratch/
//TODO: between es inclusive pero no muestra las actividades de la endDate

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
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

// Alert before delete
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Dashboard = () => {
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
        idCustomer: -1,
        name: ''
    });
    console.log(user)
    // const [activities, setActivities] = useState([]);
    // const [activitiesByUser, setActivitiesByUser] = useState([]);
    const [activitiesByUserDate, setActivitiesByUserDate] = useState([]);
    const [variable, setVariable] = useState([]);

    // Default startDate (today) and endDate (today + 7)
    var curr = new Date();
    var date = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 7);
    const [fromDate, setFromDate] = useState(date);
    date = curr.toISOString().substring(0, 10);
    const [toDate, setToDate] = useState(date);



    const navigation = useNavigate();

    useEffect(() => {
        refreshToken();
        // getUsers();
        // getActivities();
        // getActivitiesByUser();
        defaultDate();
        getActivitiesByUserDate(new Event('firstTime'));
    }, []);

    const defaultDate = async () => {
        var curr = new Date();
        var fromDate = curr.toISOString().substring(0, 10);
        curr.setDate(curr.getDate() + 7);
        var toDate = curr.toISOString().substring(0, 10);
        setFromDate(fromDate); setToDate(toDate);
    }

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
                idCustomer: decoded.idCustomer,
                name: decoded.name
            });
            config.params = {
                idCustomer: decoded.idCustomer
            }
            console.log(user.data)
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

    // const getActivities = async () => {
    //     const response = await axiosJWT.get('http://localhost:5050/activities');
    //     setActivities(response.data);
    // }

    // const getActivitiesByUser = async () => {
    //     const response = await axiosJWT.post('http://localhost:5050/activitiesByUser');
    //     setActivitiesByUser(response.data);
    // }

    const getActivitiesByUserDate = async (e) => {
        e.preventDefault();
        const response = await axiosJWT.post('/getParticipantsDates',
            {
                params: {
                    idCustomer: user.idCustomer, fromDate: fromDate, toDate: toDate
                }
            }
        );
        console.log(response.data);
        setActivitiesByUserDate(response.data);
    }

    // Calculate how many days remain/have passed from today's date
    // and parse date and other parameters for a better compression
    // const ParseActivities = async (participants) => {
    //     var currDate = new Date();
    //     participants.forEach(participant => {
    //         participant.activity.countdown = days(new Date(participant.activity.date), currDate);
    //         participant.activity.date = participant.activity.date.substring(0,10);
    //     });
    //     return participants;
    // }

    // Difference between 2 dates in days
    const days = (date_1, date_2) => {
        let difference = date_1.getTime() - date_2.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    }

    const DeleteParticipant = async (e, idActivity) => {
        e.preventDefault();
        try {
            await axiosJWT.post('deleteParticipants', {
                idActivity: idActivity, idCustomer: user.idCustomer
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

    const OpenActivityProfile = async (e, activityId, countdown) => {
        if (e.target == null || e.target.name != 'deleteButton' && countdown > 0) {
            navigation('/activityProfile/' + activityId);
        }
    }

    const BeforeDeleteAlert = (e, activityId) => {
        confirmAlert({
            title: 'Abandonar actividad',
            message: '¿Estás seguro que deseas abandonar esta actividad?.',
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => DeleteParticipant(e, activityId)
                },
                {
                    label: 'No'
                }
            ]
        });
    }
    return (
        <div className="container mt-5 top">
            <div className='text-center bg-light py-5'>
                <h1 className='mb-3 display-4'>Mis actividades</h1>
            </div>
            <Navbar className="border-bottom border-gray py-3 bg-white">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        
                        <Form className="d-flex" onSubmit={getActivitiesByUserDate}>
                            <Form.Control className="me-2" type="date" placeholder="Date"
                                value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                            <Form.Control className="me-2" type="date" placeholder="Date"
                                value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            <Button variant="success" type="submit">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    
            {activitiesByUserDate.length <= 0 &&
                <h2 className="noActivity text-center my-5">
                    No tienes ninguna actividad en las fechas seleccionadas.
                </h2>
            }
        <Row xs={1} md={4} className="g-4 mt-1 mb-5">
  {activitiesByUserDate.map((activitiesbyUserdate) => (
        <Col key={activitiesbyUserdate.idActivity}>
                    <Card>
                        <img src={'http://localhost:5000' + activitiesbyUserdate.model.imageUrl} alt="Imagen" />
                        <Card.Body>
                                <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activitiesbyUserdate.model.name}</Card.Title>
                                <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activitiesbyUserdate.datetime}</Card.Text>
                                <Card.Text><span style={{ fontWeight: 'bold' }}>Descripcion:</span> {activitiesbyUserdate.model.description}</Card.Text>
                                <Button variant="danger" onClick={(e) => handleUnsubscribe(e, activitiesbyUserdate.idActivity)}>Desapúntate</Button>
                                <div className='success'>
                                </div>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    )
}
export default Dashboard