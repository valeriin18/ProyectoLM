import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from '../fotos/plenainclusion.jpg';

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
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <img src={logo} alt="logo" height="50" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Activities" className="btn btn-success text-white">
              Actividades
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              <FaUser style={{ fontSize: "24px" }} />
            </Nav.Link>
            <Button variant="outline-danger" onClick={handleLogout}>
              <FaSignOutAlt style={{ fontSize: "24px" }} />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
