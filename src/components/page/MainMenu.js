import React from 'react';
import { FcComboChart, FcDeployment, FcServices } from 'react-icons/fc';
import { RiAlarmWarningFill } from 'react-icons/ri';

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
                      <div
                        style={{ color: '#0d6efd' }}
                        className="btn fw-bold fs-5   btn-sm rounded-pill"
                      >
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
                      <div
                        style={{ color: '#dc3545' }}
                        className="btn fw-bold fs-5   btn-sm rounded-pill"
                      >
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
                <Link to="/forming/report">
                  <Row>
                    <Col className="text-center">
                      <FcServices size={80} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div
                        style={{ color: '#fd7e14' }}
                        className="btn fw-bold fs-5   btn-sm rounded-pill"
                      >
                        Forming
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
                <Link to="/oven/report">
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
                        style={{ color: '#adb5bd' }}
                        className="btn fw-bold fs-5 btn-sm rounded-pill"
                      >
                        Oven
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
                <Link to="/downtime">
                  <Row>
                    <Col className="text-center">
                      <RiAlarmWarningFill color="#dc3545" size={80} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <div
                        style={{ color: '#dc3545' }}
                        className="btn fw-bold fs-5   btn-sm rounded-pill"
                      >
                        Downtime
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
                      <div
                        style={{ color: '#ffc107' }}
                        className="btn fw-bold fs-5   btn-sm rounded-pill"
                      >
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
