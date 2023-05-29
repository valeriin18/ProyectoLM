import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/dashboard">PlenaInclusión</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-between">
                <Nav>
                    <Nav.Link as={Link} to="/Activities">activity</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/profile">Perfil</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    <Nav.Link as={Link} to="/login">Logut</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
    
export default NavigationBar;
