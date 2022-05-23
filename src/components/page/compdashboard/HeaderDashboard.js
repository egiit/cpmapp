import React, { useContext } from 'react';
import { Breadcrumb, Row, Form, Col, Card } from 'react-bootstrap';
import { ACTION, DashboardContex } from '../provider/Dashboard.provider';

const HeaderDashboard = () => {
  const { state, dispatch } = useContext(DashboardContex);

  const changeDate = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION.CHANGE_DATE, payload: { date: value } });
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
      <Row>
        <Col className="mb-2" sm={12} md={4}>
          <Card className="border-0 shadow">
            <Card.Body>
              <Form>
                <Form.Control
                  size="sm"
                  value={state.date}
                  onChange={(e) => changeDate(e)}
                  type="date"
                />
              </Form>
            </Card.Body>
          </Card>
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
      </Row>
    </>
  );
};

export default HeaderDashboard;
