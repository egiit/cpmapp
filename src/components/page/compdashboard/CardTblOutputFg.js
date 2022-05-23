import React from 'react';
import { Col, Table, Card } from 'react-bootstrap';

const CardTblOutputFg = () => {
  return (
    <>
      <Col xl={4}>
        <Card className="border-0 shadow mb-3">
          <Card.Body>
            <Table responsive hover className="table-borderless">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Batch</th>
                  <th>Finish Good</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Malkist Lemon</td>
                  <td>11</td>
                  <td>990</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Malkist Gula</td>
                  <td>11</td>
                  <td>836</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Malkist Kemensos</td>
                  <td>2</td>
                  <td>3650</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default CardTblOutputFg;
