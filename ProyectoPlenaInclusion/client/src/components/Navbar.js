import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {

    const navigation = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            localStorage.removeItem('myToken');
            navigation('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">PlenaInclusión</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Inicio</Nav.Link>
                    <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                    <Nav.Link as={Link} to="/Activities">Actividades</Nav.Link>
                    <Nav.Link as={Link} to="/register">Registror</Nav.Link>
                </Nav>
                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;