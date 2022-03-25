import React, { useState } from 'react';
import { Container, Row, Col, Card, Breadcrumb, Tab } from 'react-bootstrap';
import HeaderFormMixing from './compMixing/HeaderFormMixing';
// import FooterFormMixing from './compMixing/FooterFormMixing';
import CardProductMixing from './compMixing/CardProductMixing';
import { MixingProvider } from './provider/Mixing.provider';
import ContentFrmlCheck from './compMixing/ContentFrmlCheck';

const MixingCheckListFormula = () => {
  const [productName, setProductName] = useState('Pilih Product');
  const [prodId, setprodId] = useState(null);
  // const [showModal, setshowModal] = useState(false);

  const handleChangeProduct = (name, id) => {
    setProductName(name);
    setprodId(id);
    // console.log(id);
  };

  return (
    // title Page
    <MixingProvider>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Mixer</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Check List Formula Mixer
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div></div>

        {/* accordion for Header Form */}
        <HeaderFormMixing />

        {/* for Footer */}
        {/* <FooterFormMixing /> */}

        {/* Row Input Mixing Batch */}
        <Row className="mt-3">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={3}>
              {/* Card Product List */}
              <CardProductMixing setProductName={handleChangeProduct} />
            </Col>
            <Col sm={9}>
              <Card className="shadow border-0">
                <Card.Body>
                  <div className="my-2 ps-3 border-bottom">
                    <h4 className="fw-bold fs-5">{productName}</h4>
                  </div>
                  {/* Container Tab */}
                  <ContentFrmlCheck idProd={prodId} />
                </Card.Body>
              </Card>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </MixingProvider>
  );
};

export default MixingCheckListFormula;
