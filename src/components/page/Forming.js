import React from 'react';
import { Container, Breadcrumb, Row, Col, Card } from 'react-bootstrap';
import FormingTabsContent from './compForming/FormingTabsContent';
import HeaderForming from './compForming/HeaderForming';
import { FormingProvider } from './provider/Forming.provider';

const Forming = () => {
  return (
    <FormingProvider>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Forming</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Form Forming
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <HeaderForming />

        <Row className="mt-3">
          <Col>
            <Card>
              <Card.Body>
                <FormingTabsContent />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </FormingProvider>
  );
};

export default Forming;
