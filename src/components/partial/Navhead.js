import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios.js';
import { flash } from 'react-universal-flash';
import { AuthContext } from '../auth/AuthProvider';

const Navhead = () => {
  const { value } = useContext(AuthContext);
  const navigate = useNavigate();

  const sidebarToggle = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem(
      'sb|sidebar-toggle',
      document.body.classList.contains('sb-sidenav-toggled')
    );
  };

  const logout = async () => {
    await axios
      .delete('/logout')
      .then(() => navigate('/'))
      .catch((error) => flash('Something Wrong', 5000, 'danger'));
  };

  return (
    <Navbar
      style={{ backgroundColor: '#0052D4' }}
      variant="light"
      expand="lg"
      className="sb-topnav navbar-expand shadow-sm"
    >
      <Container fluid>
        <Navbar.Brand className="fw-bold " href="#">
          <span className="text-light">CHOICE PLUS</span>
        </Navbar.Brand>
        <Button
          onClick={sidebarToggle}
          className="btn-link btn-sm order-1 order-lg-0"
          variant="light"
          id="sidebarToggle"
        >
          <i className="fas fa-bars"></i>
        </Button>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              className=""
              title={
                <span>
                  <i className="fas fa-user fa-fw"></i>
                </span>
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">
                {value.username}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout} href="#">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navhead;
