import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsBoxSeam,
} from 'react-icons/bs';
import { FcAreaChart, FcInspection } from 'react-icons/fc';
import { BiTimer } from 'react-icons/bi';
import { IconContext } from 'react-icons';

const CardDashboard = () => {
  return (
    <>
      <Col md={12} xl={6}>
        <Row className="mb-3">
          <Col sm={6}>
            <Card className="shadow border-0 mb-3">
              <Card.Body className="">
                <Row>
                  <Col className="d-flex justify-content-center align-items-center shadow-sm">
                    <IconContext.Provider
                      value={{ color: 'rgba(39, 110, 245, 0.8)' }}
                    >
                      <BsBoxSeam size={70} />
                    </IconContext.Provider>
                  </Col>
                  <Col>
                    <div className="fw-bold">Actual</div>
                    <div className="fs-2 fw-bold">
                      9 <span className="fs-6 fw-normal">Batch</span>{' '}
                      <IconContext.Provider
                        value={{ color: 'rgba(253, 0, 0, 0.8)' }}
                      >
                        <BsFillCaretDownFill size={30} />
                      </IconContext.Provider>
                    </div>
                    <div className="fs-4 fw-bold">
                      749 <span className="fs-6 fw-normal">FG</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card className="shadow border-0">
              <Card.Body className="">
                <Row>
                  <Col className="d-flex justify-content-center align-items-center shadow-sm">
                    <FcAreaChart size={70} />
                  </Col>
                  <Col>
                    <div className="fw-bold">Target</div>
                    <div className="fs-2 fw-bold">
                      15 <span className="fs-6 fw-normal">Batch</span>
                    </div>
                    <div className="fs-4 fw-bold">
                      1218 <span className="fs-6 fw-normal">FG</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col sm={6}>
            <Card className="shadow border-0 mb-3">
              <Card.Body className="">
                <Row>
                  <Col className="d-flex justify-content-center align-items-center shadow-sm">
                    <IconContext.Provider
                      value={{ color: 'rgba(39, 110, 245, 0.8)' }}
                    >
                      <BiTimer size={80} />
                    </IconContext.Provider>
                  </Col>
                  <Col>
                    <div className="fw-bold">Effeciency (%)</div>
                    <div className="fs-2 fw-bold">
                      85 <span className="fs-6 fw-normal">Actual</span>
                      <IconContext.Provider
                        value={{ color: 'rgba(12, 240, 0, 0.8)' }}
                      >
                        <BsFillCaretUpFill size={25} />
                      </IconContext.Provider>
                    </div>
                    <div className="fs-4 fw-bold">
                      78 <span className="fs-6 fw-normal">Target</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6}>
            <Card className="shadow border-0 ">
              <Card.Body className=" py-2">
                <Row>
                  <Col className="d-flex justify-content-center align-items-center shadow-sm">
                    <FcInspection size={70} />
                  </Col>
                  <Col>
                    <div className="fw-bold">Dough (kg)</div>
                    <div className="fs-3 fw-bold">
                      2,206
                      <span className="fs-6 fw-normal"> Yield</span>
                    </div>
                    <div className="fs-5 fw-bold">
                      2,251
                      <span className="fs-6 fw-normal"> Dough</span>
                    </div>
                    <div className="fs-5 fw-bold">
                      44.14
                      <span className="fs-6 fw-normal"> Reject</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default CardDashboard;
