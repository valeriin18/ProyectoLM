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
import { Link } from 'react-router-dom';

// Alert before delete
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Dashboard = () => {
    // const [token, setToken] = useState('');
    // const [expire, setExpire] = useState('');
    // const [users, setUsers] = useState([]);
    // const [activities, setActivities] = useState([]);
    // const [activitiesByUser, setActivitiesByUser] = useState([]);
    const [activitiesByUserDate, setActivitiesByUserDate] = useState([]);
    const [variable, setVariable] = useState([]);
    const [idCustomer, setIdCustomer] = useState('');

    // Default startDate (today) and endDate (today + 7)
    var curr = new Date();
    var date = curr.toISOString().substring(0, 10);
    curr.setDate(curr.getDate() + 7);
    const [fromDate, setFromDate] = useState(date);
    date = curr.toISOString().substring(0, 10);
    const [toDate, setToDate] = useState(date);



    const navigation = useNavigate();

    useEffect(() => {
        // refreshToken();
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

    // const refreshToken = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5050/token');
    //         setToken(response.data.accessToken);
    //         const decoded = jwt_decode(response.data.accessToken);
    //         setUser({
    //             ...user, // Copy other fields
    //             userId: decoded.userId,
    //             name: decoded.name
    //         });
    //         setExpire(decoded.exp);
    //     } catch (error) {
    //         if (error.response) {
    //             navigation("/");
    //         }
    //     }
    // }

    const axiosJWT = axios.create();

    // Siempre que se realice una peticion segura se ejcuta esta
    // funcion que actualiza el accessToken si es necesario
    // y en config añade los headers y los datos para las queries
    // axiosJWT.interceptors.request.use(async (config) => {
    //     const currentDate = new Date();
    //     if (expire * 1000 < currentDate.getTime() || expire == undefined) {
    //         const response = await axios.get('http://localhost:5050/token');
    //         config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    //         setToken(response.data.accessToken);
    //         const decoded = jwt_decode(response.data.accessToken);
    //         setUser({
    //             ...user, // Copy other fields
    //             userId: decoded.userId,
    //             name: decoded.name
    //         });
    //         config.params = {
    //             userId: decoded.userId
    //         }
    //         setExpire(decoded.exp);
    //     } else {
    //         config.headers.Authorization = `Bearer ${token}`;
    //         config.params = {
    //             userId: user.userId
    //         }
    //     }
    //     return config;
    // }, (error) => {
    //     return Promise.reject(error);
    // });

    // const getUsers = async () => {
    //     try {
    //         const response = await axiosJWT.get('http://localhost:5050/users');
    //         setUsers(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
                    idCustomer: idCustomer, fromDate: fromDate, toDate: toDate 
                } 
            }
        );
        console.log(1);
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

    const DeleteParticipant = async (e, activityId) => {
        try {
            await axiosJWT.post('http://localhost:5050/deleteParticipant', {
                activityId: activityId
            });
            getActivitiesByUserDate(new Event('firstTime'));
        } catch (error) {
            if (error.response) {
                console.log(error.response);
            }
        }
    }

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
            <div className='p-5 text-center'>
                <h1 className='mb-3' style={{ fontSize: 30, fontWeight: 'bold' }}>Mis actividades</h1>
            </div>
            <Navbar className="border-bottom border-gray pb-5">
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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                aria-label="User ID" value={idCustomer} onChange={e => setIdCustomer(e.target.value)} />
                            {/* <Form.Control
                            type="search"
                            placeholder="Search by name"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Form.Control
                            type="search"
                            placeholder="Search by duration"
                            className="me-2"
                            aria-label="Search"
                        /> */}
                            <Button variant="outline-success" type="submit">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <h1>Welcome Back: {user.name}</h1>
            <h1>Next activities:</h1>*/}
            {activitiesByUserDate.length <= 0 &&
                <h2 className="noActivity">
                    No tienes ninguna actividad en las fechas seleccionadas.
                </h2>
            }
            <Row xs={1} md={4} className="g-4 mt-1 mb-5">
                {activitiesByUserDate.map((activitiesbyUserdate) => (
                    <Col key={activitiesbyUserdate.idActivity}>
                        <Card>
                            {/* <Card.Img variant="top" src={"http://localhost:5050/static/" + activitiesByUserDate.activity.image} /> */}
                            <Card.Body>
                                <Card.Title><span style={{ fontWeight: 'bold' }}>Nombre:</span> {activitiesbyUserdate.model.name}</Card.Title>
                                <Card.Text><span style={{ fontWeight: 'bold' }}>Fecha:</span> {activitiesbyUserdate.datetime}</Card.Text>
                                <Card.Text><span style={{ fontWeight: 'bold' }}>Descripcion:</span> {activitiesbyUserdate.model.description}</Card.Text>
                                <div className='mt-4 text-center'>
                                    {/* <Button disabled={activitiesByUserDate.activity.countdown < 0} className='mr-2' variant="outline-success" onClick={() => navigation('/activityProfile/' + activitiesByUserDate.activity.id)}>
                                        Mensaje
                                    </Button>
                                    <Button disabled={activitiesByUserDate.activity.countdown < 0} name="deleteButton" variant="danger" onClick={(e) => BeforeDeleteAlert(e, activitiesByUserDate.activity.id)}>
                                        Abandonar
                                    </Button> */}
                                </div>
                            </Card.Body>
                            {/* Paint countdown timer to begin the activity */}
                            {(() => {
                                // switch (true) {
                                //     case (activitiesByUserDate.activity.countdown > 0):   return <Card.Footer className="text-muted">¡Quedan {activitiesByUserDate.activity.countdown} días!</Card.Footer>;
                                //     case (activitiesByUserDate.activity.countdown == 0):  return <Card.Footer className="text-muted">¡Es hoy!</Card.Footer>;
                                //     default:     return <Card.Footer className="text-muted">¡Fue hace {activitiesByUserDate.activity.countdown * -1} días!</Card.Footer>
                                // }
                            })()}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Dashboard