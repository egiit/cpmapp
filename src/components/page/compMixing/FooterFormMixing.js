import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const FooterFormMixing = () => {
  return (
    <>
      <Row>
        <Col>
          <Card className="mt-3 shadow border-0">
            <Card.Body className="p-2">
              <div className="btn fw-bold btn-primary btn-sm">
                Total Batch : 14
              </div>
              <div className="btn fw-bold btn-info btn-sm">
                Finish Batch : 7
              </div>
              <div className="btn fw-bold btn-warning btn-sm">
                Runing Batch : 8
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FooterFormMixing;
