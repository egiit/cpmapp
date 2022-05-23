import React from 'react';
import { Row, Col, Card, Container, Breadcrumb } from 'react-bootstrap';

const PackingDayReport = () => {
  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Packing</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Packing Check List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Row>
          <Col>
            <Card></Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PackingDayReport;
