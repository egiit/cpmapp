import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import axios from '../axios/axios.js';
import logo from '../partial/cpmlogo.png';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    const cekLogin = async () => {
      return await axios
        .get('/token')
        .then((response) => navigate('/dashboards'))
        .catch((error) => {
          if (error.response) return '';
        });
    };
    cekLogin();
  }, [navigate]);

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value.toLowerCase());
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const Auth = async (e) => {
    try {
      e.preventDefault();
      await axios
        .post('/login', {
          USER_NAME: username,
          USER_PASS: password,
        })
        .then((response) => {
          const decode = jwtDecode(response.data.accessToken);
          if (decode.userLevel === 'ADM') return navigate('/headerform');
          navigate('/mainmenu');
        });
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
      }
    }
  };
  // const Auth = async (e) => {
  //   e.preventDefault();
  //   const exeLogin = await onLogin(username, password, setMsg);
  //   setMsg(exeLogin);
  //   // if (exeLogin) return setMsg(exeLogin);
  // };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col className="col-md-6 col-lg-4">
            <Card className="shadow border-0 rounded mt-5">
              <Card.Header>
                <div className="mx-auto d-block text-center">
                  <img
                    className="img-fluid"
                    style={{ width: '18rem' }}
                    src={logo}
                    alt=""
                  />
                </div>
                <h3 className="text-center text-muted fst-italic fs-6 font-weight-light">
                  Production Monitoring System
                </h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={Auth}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      className="rounded-pill ps-3"
                      name="username"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={onChangeUsername}
                    />
                    <Form.Label className=" ps-3 text-muted">
                      User Name
                    </Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      className="rounded-pill ps-3"
                      name="password"
                      type="password"
                      placeholder="*******"
                      value={password}
                      onChange={onChangePassword}
                      autoComplete="on"
                    />
                    <Form.Label className="ps-3 text-muted">
                      Password
                    </Form.Label>
                  </Form.Floating>
                  <div>
                    <p className="ps-3 fst-italic text-danger">{msg}</p>
                  </div>
                  <div className="d-grid align-items-center mt-3 mb-2">
                    <Button
                      className="rounded-pill"
                      variant="primary"
                      type="submit"
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
