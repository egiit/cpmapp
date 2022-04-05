import React, { useContext } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FormingContex } from '../provider/Forming.provider';

const HeaderForming = () => {
  const { header } = useContext(FormingContex);

  return (
    <>
      <Card className="border-0 shadow">
        <Card.Body>
          <Row>
            <Col>
              <Table striped bordered responsive>
                <tbody>
                  <tr key="1">
                    <th>Tanggal</th>
                    <td>{header.header_prod_date}</td>
                  </tr>
                  <tr key="2">
                    <th>Shift</th>
                    <td>{header.header_shift}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table striped bordered responsive>
                <tbody>
                  <tr key="1">
                    <th>Operator</th>
                    <td>{header.header_operator}</td>
                  </tr>
                  <tr key="2">
                    <th>Leader</th>
                    <td>{header.header_leader}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link className="btn btn-sm btn-primary" to="/headerform/edit">
                Edit
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default HeaderForming;
