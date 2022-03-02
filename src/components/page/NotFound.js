import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imgNotFound from '../partial/404-NotFound.png';

const NotFound = () => {
  return (
    <div className="mt-5">
      <Row className="justify-content-center">
        <Col className=" col-10 col-md-8 col-lg-6">
          <Card className="shadow border-0 rounded mt-5">
            <Card.Body>
              <div className="mx-auto d-block text-center">
                <img
                  className="img-fluid"
                  style={{ width: '18rem' }}
                  src={imgNotFound}
                  alt=""
                />
                <div className="mt-3 ">
                  <h2 className="fs-3">Upss!! Page Not Found</h2>
                </div>
                <Link
                  className="mt-3 btn btn-primary rounded-pill"
                  to="dashboards"
                >
                  Back to Dashboards
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;
