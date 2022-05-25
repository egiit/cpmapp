import React, { useContext, useState } from 'react';
import { Breadcrumb, Row, Form, Col, Card } from 'react-bootstrap';
import { ACTION, DashboardContex } from '../provider/Dashboard.provider';
import useInterval from 'use-interval';

const HeaderDashboard = () => {
  const { state, dispatch } = useContext(DashboardContex);
  const [activeRefresh, setactiveRefresh] = useState(false);
  const [delay, setDelay] = useState(20000);

  const changeDate = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION.CHANGE_DATE, payload: { date: value } });
  };

  const changeDelay = (e) => {
    const { value } = e.target;
    if (value * 1000 < 15000) return setDelay(20000);
    setDelay(value * 1000);
  };

  useInterval(
    () => {
      dispatch({
        type: ACTION.FUNC_AUTO_REFRESH,
        payload: { count: state.countRefresh + 1 },
      });
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
      <div className="ms-3" id="titlepage">
        <h1 className="mt-4">Dashboard</h1>
        <Breadcrumb>
          <Breadcrumb.Item href="" active>
            Production Performance
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
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
