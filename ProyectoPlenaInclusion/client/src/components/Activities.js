import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Form, Button, Row, Col, Card } from 'react-bootstrap';

const Activities = () => {
  const [activitiesInTime, setActivitiesInTime] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    defaultDate();
    getActivities(new Event('firstTime'));
  }, []);

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

  return (
    <div className="container mt-5 top">
      <div className='p-5 text-center'>
        <h1 className='mb-3' style={{ fontSize: 30, fontWeight: 'bold' }}>Actividades Disponibles</h1>
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
            <Form className="d-flex" onSubmit={getActivities}>
              <Form.Control className="me-2" type="date" placeholder="Date"
                value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              <Form.Control className="me-2" type="date" placeholder="Date"
                value={toDate} onChange={(e) => setToDate(e.target.value)} />
              <Button variant="outline-success" type="submit">Buscar</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {activitiesInTime.length <= 0 &&
        <h2 className="noActivity">
          No hay actividad en las fechas seleccionadas.
        </h2>
      }
      <Row xs={1} md={4} className="g-4 mt-1 mb-6">
        {activitiesInTime.map((activity) => (
          <Col key={activity.idActivity}>
            <Card>
              <img src={'http://localhost:5000' + activity.model.imageUrl} alt="Imagen" />
              <Card.Body className="text-center"> {/* Agrega la clase "text-center" */}
              
                <Card.Title><span style={{ fontWeight: 'bold', textTransform:'uppercase'}}></span> {activity.model.name}</Card.Title>
                <Card.Text><span style={{ fontWeight: 'bold'}}>Fecha:</span> {activity.datetime}</Card.Text>
                <Card.Text><span style={{ fontWeight: 'bold' }}>Descripcion:</span> {activity.model.description}</Card.Text>
                <Button variant="success">Apúntate</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Activities;
