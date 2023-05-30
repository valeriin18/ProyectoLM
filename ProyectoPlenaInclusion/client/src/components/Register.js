import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Card, Button, Container, Form } from 'react-bootstrap';

const Register = () => {
  const [DNI, setDni] = useState('');
  const [name, setName] = useState('');
  const [surname1, setSurname1] = useState('');
  const [surname2, setSurname2] = useState('');
  const [birthyear, setBirthdyear] = useState('');
  const [mail, setMail] = useState('');
  const [gender, setGender] = useState('');
  const [specialCare, setSpecialCare] = useState(false);
  const [dataTutor, setDataTutor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirmación',
      message: '¿Está seguro de crear el usuario?',
      buttons: [
        {
          label: 'Sí',
          onClick: async () => {
            try {
              await axios.post('/RegisterCustomer', {
                DNI: DNI,
                name: name,
                surname1: surname1,
                surname2: surname2,
                birthyear: birthyear,
                mail: mail,
                gender: gender,
                specialCares: specialCare,
                dataTutor: dataTutor,
              });
              navigate('/dashboard');
            } catch (error) {
              if (error.response) {
                setErrorMsg(error.response.data.msg);
                console.log(errorMsg);
              }
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
          }
        },
      ]
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="w-50">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="dni">
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" placeholder="12345678A" value={DNI} onChange={(e) => setDni(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="John" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="surname1">
              <Form.Label>Surname 1</Form.Label>
              <Form.Control type="text" placeholder="Doe" value={surname1} onChange={(e) => setSurname1(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="surname2">
              <Form.Label>Surname 2</Form.Label>
              <Form.Control type="text" placeholder="Smith" value={surname2} onChange={(e) => setSurname2(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="birthyear">
              <Form.Label>Birthday</Form.Label>
              <Form.Control type="date" placeholder="YYYY-MM-DD" value={birthyear} onChange={(e) => setBirthdyear(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="mail">
              <Form.Label>Mail</Form.Label>
              <Form.Control type="text" placeholder="john.doe@example.com" value={mail} onChange={(e) => setMail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control type="text" placeholder="Hombre" value={gender} onChange={(e) => setGender(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="specialCare">
              <Form.Check type="checkbox" label="Special Cares" checked={specialCare} onChange={(e) => setSpecialCare(e.target.checked)} />
            </Form.Group>

            <Form.Group controlId="dataTutor">
              <Form.Label>Tutor DNI</Form.Label>
              <Form.Control type="text" placeholder="12345678A" value={dataTutor} onChange={(e) => setDataTutor(e.target.value)} />
            </Form.Group>

            <p className="text-danger">{errorMsg}</p>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
