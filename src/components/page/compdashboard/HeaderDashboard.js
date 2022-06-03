import React, { useContext, useState, useEffect } from 'react';
import { Breadcrumb, Row, Form, Col, Card } from 'react-bootstrap';
import { ACTION, DashboardContex } from '../provider/Dashboard.provider';
import useInterval from 'use-interval';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import { Blink } from '@bdchauvette/react-blink';
import { FcApproval, FcCancel } from 'react-icons/fc';

const HeaderDashboard = () => {
  const { state, dispatch } = useContext(DashboardContex);
  const [activeRefresh, setactiveRefresh] = useState(false);
  const [delay, setDelay] = useState(20000);
  const [downtimeList, setDowntimeList] = useState([]);

  const navigate = useNavigate();

  const changeDate = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION.CHANGE_DATE, payload: { date: value } });
  };

  const changeDelay = (e) => {
    const { value } = e.target;
    if (value * 1000 < 15000) return setDelay(20000);
    setDelay(value * 1000);
  };

  const getDowntimeList = async (date) => {
    await axios
      .get(`/downtime/list/${date}%25`)
      .then((response) => {
        if (response.data.length !== 0) {
          const dwtList = response.data.filter(
            (dlist) => dlist.downtime_end === null
          );
          return setDowntimeList(dwtList);
        }
        setDowntimeList(response.data);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getDowntimeList(state.date);
  }, [state.date]);

  useInterval(
    () => {
      dispatch({
        type: ACTION.FUNC_AUTO_REFRESH,
        payload: { count: state.countRefresh + 1 },
      });
      getDowntimeList(state.date);
    },
    activeRefresh ? delay : null
  );

  const handleActive = (e) => {
    const { checked } = e.target;
    if (checked === false) {
      dispatch({
        type: ACTION.FUNC_AUTO_REFRESH,
        payload: { count: 0 },
      });
    }
    setactiveRefresh(checked);
  };

  return (
    <>
      <Row className="mt-4 justify-content-between">
        <Col xs={8} sm={6}>
          <div className="ms-3" id="titlepage">
            <h1>Dashboards</h1>
            <Breadcrumb>
              <Breadcrumb.Item href="" active>
                Production Performance
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
        <Col xs={4} sm={3} lg={2} className=" align-content-center">
          {downtimeList.length !== 0 ? (
            <Blink>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/downtime')}
                className="border text-center border-danger border-3 p-1 p-md-3 rounded-1 bg-light shadow fw-bold"
              >
                Downtime{' '}
                <span>
                  <FcCancel />
                </span>
              </div>
            </Blink>
          ) : (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/downtime')}
              className=" text-center border-start border-success border-3 p-1 p-md-3 rounded-1 bg-light fw-bold shadow"
            >
              Downtime{' '}
              <span>
                <FcApproval />
              </span>
            </div>
          )}
        </Col>
      </Row>
      {/* <div>{JSON.stringify(state.batchByplan)}</div> */}
      <Card className="border-0 shadow mb-3">
        <Card.Body className="p-2">
          <Row className="justify-content-between">
            <Col className="mb-sm-2 mb-md-0" xs={12} sm={6} md={4}>
              <Form>
                <Form.Control
                  size="sm"
                  value={state.date}
                  onChange={(e) => changeDate(e)}
                  type="date"
                />
              </Form>
            </Col>
            {/* <Col className="mb-2" sm={12} md={4}>
                <Form.Select size="sm">
                  <option>Select Shift</option>
                </Form.Select>
              </Col>
              <Col className="mb-2" sm={12} md={4}>
                <Form.Select size="sm">
                  <option>Select Product</option>
                </Form.Select>
              </Col> */}
            <Col xs={12} sm={6} md={5} lg={4}>
              <Form>
                <Form.Group
                  as={Row}
                  className="align-items-center justify-content-md-end justify-content-sm-center"
                  controlId="formHorizontalEmail"
                >
                  <Col xs={6} md={6} sm={6} xl={4} className="pl-2">
                    <Form.Check
                      label="Auto Update"
                      onChange={(e) => handleActive(e)}
                    />
                  </Col>
                  <Col xs={2} className="p-0">
                    <Form.Control
                      size="sm"
                      min={15}
                      max={120}
                      defaultValue={delay / 1000}
                      onChange={changeDelay}
                      type="number"
                    />
                  </Col>
                  <Form.Label
                    column
                    xs={4}
                    className="text-start pl-1 d-sm-none d-md-block"
                  >
                    Second
                  </Form.Label>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default HeaderDashboard;
