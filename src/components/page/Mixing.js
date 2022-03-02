import React, { useState } from 'react';
import { Container, Row, Col, Card, Breadcrumb, Tab } from 'react-bootstrap';
import HeaderFormMixing from './compMixing/HeaderFormMixing';
import FooterFormMixing from './compMixing/FooterFormMixing';
import CardDowntime from './compUtils/CardDowntime';
import CardProductMixing from './compMixing/CardProductMixing';
import TabContentMixing from './compMixing/TabContentMixing';

const Mixing = () => {
  const [productName, setProductName] = useState('Malkist Gula');
  const productPlann = [
    {
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
      PRODUCT_BATCH: 5,
    },
    {
      PRODUCT_ID: 33222,
      PRODUCT_NAME: 'Malkist Krim',
      PRODUCT_BATCH: 3,
    },
    {
      PRODUCT_ID: 33223,
      PRODUCT_NAME: 'Malkist Lemon',
      PRODUCT_BATCH: 4,
    },
  ];

  const planBatch = [
    {
      BATCH_ID: 1,
      PRODUCT_ID: 33222,
      PRODUCT_NAME: 'Malkist Krim',
    },
    {
      BATCH_ID: 2,
      PRODUCT_ID: 33222,
      PRODUCT_NAME: 'Malkist Krim',
    },
    {
      BATCH_ID: 3,
      PRODUCT_ID: 33222,
      PRODUCT_NAME: 'Malkist Krim',
    },
    {
      BATCH_ID: 4,
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
    },
    {
      BATCH_ID: 5,
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
    },
    {
      BATCH_ID: 6,
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
    },
    {
      BATCH_ID: 7,
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
    },
    {
      BATCH_ID: 8,
      PRODUCT_ID: 33221,
      PRODUCT_NAME: 'Malkist Gula',
    },
    {
      BATCH_ID: 9,
      PRODUCT_ID: 33223,
      PRODUCT_NAME: 'Malkist Lemon',
    },
    {
      BATCH_ID: 10,
      PRODUCT_ID: 33223,
      PRODUCT_NAME: 'Malkist Lemon',
    },
    {
      BATCH_ID: 11,
      PRODUCT_ID: 33223,
      PRODUCT_NAME: 'Malkist Lemon',
    },
    {
      BATCH_ID: 12,
      PRODUCT_ID: 33223,
      PRODUCT_NAME: 'Malkist Lemon',
    },
  ];

  return (
    // title Page
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
            <CardProductMixing
              productPlann={productPlann}
              setProductName={setProductName}
            />
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
                <TabContentMixing
                  productPlann={productPlann}
                  planBatch={planBatch}
                />
              </Card.Body>
            </Card>
          </Col>
        </Tab.Container>
      </Row>
    </Container>
  );
};

export default Mixing;
