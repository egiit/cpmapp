import React, { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import {
  BsFillCaretUpFill,
  BsFillCaretDownFill,
  BsBoxSeam,
} from 'react-icons/bs';
import { FcAreaChart, FcInspection } from 'react-icons/fc';
// import { BiTimer } from 'react-icons/bi';
import { IconContext } from 'react-icons';
import { DashboardContex } from '../provider/Dashboard.provider';
import AnimatedNumbers from 'react-animated-numbers';

const CardDashboard = () => {
  const { state } = useContext(DashboardContex);
  // const [num, setNum] = React.useState(331231);

  const checkNilai = (nilai) => {
    if (!nilai || isNaN(nilai)) return 0;

    return nilai;
  };

  return (
    <>
      <Row className="mb-3">
        <Col xs={12} sm={6} xl={3}>
          <Card className="shadow border-0 mb-3">
            <Card.Body className="">
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center "
                >
                  <div
                    className="shadow p-3"
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundImage: `linear-gradient(to right, rgba(0, 224, 255, 1), rgba(0, 133, 255, 1))`,
                      borderRadius: 50,
                    }}
                  >
                    <IconContext.Provider value={{ color: '#fff' }}>
                      <BsBoxSeam size={45} />
                    </IconContext.Provider>
                  </div>
                </Col>
                <Col xs={8} className=" pl-0 ">
                  <div className="fw-bold">Finish Good</div>
                  <Row>
                    <Col xs={5} className="align-self-center ">
                      <span className="fs-6 fw-normal text-start">Total</span>
                    </Col>
                    <Col xs={7} className="fs-3 fw-bold p-0 align-self-center">
                      <AnimatedNumbers
                        animateToNumber={checkNilai(
                          state.dataChartFG.totalFG +
                            state.dataChartFgRework.totalFG
                        )}
                        includeComma
                        configs={(number, index) => {
                          return {
                            mass: 1,
                            tension: 230 * (index + 1),
                            friction: 140,
                          };
                        }}
                      ></AnimatedNumbers>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Rework
                    </Col>
                    <Col xs={7} className="fs-4 fw-bold">
                      {checkNilai(state.dataChartFgRework.totalFG)}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <Card className="shadow border-0 mb-3">
            <Card.Body className="py-2">
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center "
                >
                  <div
                    className="shadow p-3"
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundImage: `linear-gradient(90deg, rgba(14,255,0,1) 0%, rgba(86,204,0,0.9192051820728291) 57%, rgba(111,158,5,0.9220063025210083) 100%)`,
                      borderRadius: 50,
                    }}
                  >
                    <IconContext.Provider value={{ color: '#fff' }}>
                      <BsBoxSeam size={45} />
                    </IconContext.Provider>
                  </div>
                </Col>
                <Col xs={8} className=" pl-0 ">
                  <div className="fw-bold">FG By Plan</div>
                  <Row>
                    <Col xs={5} className="align-self-center ">
                      <span className="fs-6 fw-normal">Actual</span>
                    </Col>
                    <Col xs={7} className="fs-3 fw-bold p-0 align-self-center">
                      <AnimatedNumbers
                        animateToNumber={checkNilai(state.dataChartFG.totalFG)}
                        includeComma
                        configs={(number, index) => {
                          return {
                            mass: 1,
                            tension: 230 * (index + 1),
                            friction: 140,
                          };
                        }}
                      ></AnimatedNumbers>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Target
                    </Col>
                    <Col xs={7} className="fs-5 fw-bold">
                      {checkNilai(state.dataTotalPlanFG)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Var
                    </Col>
                    <Col
                      xs={7}
                      className={`fw-bold ${
                        state.dataChartFG.totalFG -
                          checkNilai(state.dataTotalPlanFG) <
                        0
                          ? 'text-danger'
                          : 'text-success'
                      }`}
                    >
                      {isNaN(state.dataChartFG.totalFG - state.dataTotalPlanFG)
                        ? 0
                        : (
                            state.dataChartFG.totalFG - state.dataTotalPlanFG
                          ).toFixed(1)}
                      {(
                        state.dataChartFG.totalFG - state.dataTotalPlanFG
                      ).toFixed(1) < 0 || isNaN(state.dataChartFG.totalFG) ? (
                        <BsFillCaretDownFill />
                      ) : (
                        <BsFillCaretUpFill />
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} xl={3}>
          <Card className="shadow mb-3 border-0">
            <Card.Body className="py-2">
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center "
                >
                  <div
                    className="shadow p-3"
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundImage: `linear-gradient(to bottom, #abbaab, #ffffff)`,
                      borderRadius: 50,
                    }}
                  >
                    <IconContext.Provider value={{ color: '#fff' }}>
                      <FcAreaChart size={45} />
                    </IconContext.Provider>
                  </div>
                </Col>
                <Col xs={8} className="pl-0">
                  <div className="fw-bold">Batch</div>
                  <Row>
                    <Col xs={5} className="align-self-center ">
                      <span className="fs-6 fw-normal">Actual</span>
                    </Col>
                    <Col xs={7} className="fs-3 fw-bold align-self-center">
                      <AnimatedNumbers
                        animateToNumber={state.actualQtyBatch}
                        includeComma
                        configs={(number, index) => {
                          return {
                            mass: 1,
                            tension: 230 * (index + 1),
                            friction: 140,
                          };
                        }}
                      ></AnimatedNumbers>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Target
                    </Col>
                    <Col xs={7} className="fs-5 fw-bold">
                      {state.actualQtyBatch}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Var
                    </Col>
                    <Col
                      xs={7}
                      className={`fw-bold ${
                        state.actualQtyBatch < 0
                          ? 'text-danger'
                          : 'text-success'
                      }`}
                    >
                      {state.actualQtyBatch - state.datTotTargetBatch
                        ? 0
                        : state.actualQtyBatch - state.datTotTargetBatch}
                      {state.actualQtyBatch - state.datTotTargetBatch ? (
                        <BsFillCaretDownFill />
                      ) : (
                        <BsFillCaretUpFill />
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xs={12} sm={6} xl={3}>
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
                  <div className="fs-3 fw-bold">
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
        </Col> */}
        <Col xs={12} sm={6} xl={3}>
          <Card className="shadow border-0 ">
            <Card.Body className=" py-2">
              <Row>
                <Col
                  xs={4}
                  className="d-flex justify-content-center align-items-center "
                >
                  <div
                    className="shadow p-3"
                    style={{
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundImage: `linear-gradient(90deg, rgba(255,0,138,1) 0%, rgba(204,0,0,0.9192051820728291) 49%, rgba(158,5,5,0.9220063025210083) 100%)`,
                      borderRadius: 50,
                    }}
                  >
                    <IconContext.Provider value={{ color: '#fff' }}>
                      <FcInspection size={45} />
                    </IconContext.Provider>
                  </div>
                </Col>

                <Col xs={8}>
                  <div className="fw-bold">Reject (kg)</div>
                  <Row>
                    <Col xs={5} className="align-self-center ">
                      <span className="fs-6 fw-normal"> Total</span>
                    </Col>
                    <Col xs={7} className="fs-3 fw-bold align-self-center">
                      <AnimatedNumbers
                        animateToNumber={checkNilai(
                          state.datTotalReject.totalReject
                        )}
                        includeComma
                        configs={(number, index) => {
                          return {
                            mass: 1,
                            tension: 230 * (index + 1),
                            friction: 140,
                          };
                        }}
                      ></AnimatedNumbers>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Keping
                    </Col>
                    <Col xs={7} className="fs-5 fw-bold">
                      {checkNilai(state.datTotalReject.rejectKeping)}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={5} className="fs-6 fw-normal align-self-center">
                      Dough
                    </Col>
                    <Col xs={7} className="fs-6 fw-bold">
                      {checkNilai(state.datTotalReject.rejectDough)}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CardDashboard;
