import React, { useState } from 'react';
import { Container, Row, Col, Card, Breadcrumb, Tab } from 'react-bootstrap';
import HeaderFormMixing from './compMixing/HeaderFormMixing';
import FooterFormMixing from './compMixing/FooterFormMixing';
import CardDowntime from './compUtils/CardDowntime';
import CardProductMixing from './compMixing/CardProductMixing';
import TabContentMixing from './compMixing/TabContentMixing';
import { MixingProvider } from './provider/Mixing.provider';

const Mixing = () => {
  const [productName, setProductName] = useState('Pilih Product');

  return (
    // title Page
    <MixingProvider>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Mixer</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Check List Mixer
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div></div>

        {/* accordion for Header Form */}
        <HeaderFormMixing />

        {/* for Footer */}
        <FooterFormMixing />

        {/* Row Input Mixing Batch */}
        <Row className="mt-3">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={3}>
              {/* Card Product List */}
              <CardProductMixing setProductName={setProductName} />
              {/* Card DownTime */}
              <CardDowntime />
            </Col>
            <Col sm={9}>
              <Card className="shadow border-0">
                <Card.Body>
                  <div className="my-2 ps-3 border-bottom">
                    <h4 className="fw-bold fs-5">{productName}</h4>
                  </div>
                  {/* Container Tab */}
                  <TabContentMixing />
                </Card.Body>
              </Card>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </MixingProvider>
  );
};

export default Mixing;
