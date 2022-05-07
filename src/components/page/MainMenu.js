import React from 'react';
import { FcComboChart, FcDeployment } from 'react-icons/fc';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imgMixer from '../partial/iconMixer.ico';
import imgOven from '../partial/iconOven.png';

const MainMenu = () => {
  return (
    <main>
      <Container>
        <Row className="my-3 justify-content-md-center">
          <Col className="text-center text-primary fw-bold fst-italic">
            {new Date().toLocaleString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col className="mb-3 " xs={6} md={3}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Link to="/dashboards">
                  <Row>
                    <Col className="text-center">
                      <FcComboChart size={80} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div className="btn btn-primary  btn-sm rounded-pill">
                        Dashboards
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>

          <Col className="mb-3" xs={6} md={3}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Link to="/mixer/report">
                  <Row>
                    <Col className="text-center">
                      <img
                        className="img-fluid"
                        style={{ width: '5rem' }}
                        src={imgMixer}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div className="btn btn-danger  btn-sm rounded-pill">
                        Mixer
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col className="mb-3" xs={6} md={3}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Link to="/mainmenu">
                  <Row>
                    <Col className="text-center">
                      <img
                        className="img-fluid"
                        style={{ width: '6rem' }}
                        src={imgOven}
                        alt=""
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div
                        to="/mainmenu"
                        className="btn btn-secondary  btn-sm rounded-pill"
                      >
                        Forming & Oven
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3" xs={6} md={3}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Link to="/mainmenu">
                  <Row>
                    <Col className="text-center">
                      <FcDeployment size={80} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div className="btn btn-warning btn-sm rounded-pill">
                        Packing
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default MainMenu;
