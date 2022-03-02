import React from 'react';
import { Row, Col, Table, Card } from 'react-bootstrap';
const DetailProcess = () => {
  return (
    <div id="detailprocess">
      <Row className="mt-4 pb-4">
        <Col sm={12} md={4} className="mb-3">
          <Row>
            <Col>
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
            <Col>
              <Card className="border-0 shadow">
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
          </Row>
        </Col>
        <Col sm={12} md={8} className="">
          <Card className="border-0 shadow">
            <Card.Body>
              <Table responsive hover className="table-borderless">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Shift</th>
                    <th>Leader</th>
                    <th>Product</th>
                    <th>Batch</th>
                    <th>Dough</th>
                    <th>Spray Oil</th>
                    <th>Krim</th>
                    <th>Baking Loss</th>
                    <th>Reject Dough</th>
                    <th>Reject Biskuit</th>
                    <th>Reject Krim</th>
                    <th>FG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Shift 1</td>
                    <td>Dadang</td>
                    <td>Malkist Lemon</td>
                    <td>11</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                    <td>990</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Malkist Gula</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>11</td>
                    <td>836</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Malkist Kemensos</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                    <td>3650</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DetailProcess;
