import React, { useContext } from 'react';
import {
  Row,
  Col,
  Card,
  Container,
  Breadcrumb,
  Table,
  Form,
} from 'react-bootstrap';
import { ACTION, PackingContext } from '../provider/Packing.provider';
import TableHoldPacking from './TableHoldPacking';
import TableProdPacking from './TableProdPacking';
import TableReject from './TableReject';
import TableRework from './TableRework';

const PackingDayReport = () => {
  const { state, dispatch } = useContext(PackingContext);

  const changeDate = (e) => {
    const { value } = e.target;
    dispatch({ type: ACTION.CHANGE_DATE, payload: { date: value } });
  };

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Packing</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Packing Dayli Report
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Row className="mb-2">
          {/* {JSON.stringify(proCheckList)} */}

          <Col md={4}>
            <Card className="border-0 shadow">
              <Card.Body>
                <Form.Control
                  size="sm"
                  defaultValue={state.date}
                  onChange={changeDate}
                  type="date"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Row className="mb-3">
              <Col>
                <Card className="shadow border-0">
                  <Card.Body>
                    <TableProdPacking />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* Rewpack /Rework  */}
            <Row className="mb-3">
              <Col>
                <Card className="shadow border-0">
                  <Card.Body>
                    <TableRework />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
          {/* Hold  */}
          <Col>
            <Row className="mb-3">
              <Col>
                <Card className="shadow border-0">
                  <Card.Body>
                    <TableHoldPacking />
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Reject  */}
            <Row className="mb-3">
              <Col>
                <Card className="shadow border-0">
                  <Card.Body>
                    <TableReject />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PackingDayReport;
