import React, { useContext, useState } from 'react';
import { Container, Breadcrumb, Row, Col, Card, Tab } from 'react-bootstrap';
import HeaderFormOven from './compOven/HeaderFormOven';
import CardProdOven from './compOven/CardProdOven';
// import CardProdForming from './compForming/CardProdForming';
// import FormingTabsContent from './compForming/FormingTabsContent';
// import HeaderForming from './compForming/HeaderForming';
// import { FormingProvider } from './provider/Oven.provider';
import axios from '../axios/axios';
import GetDate from './utilis/GetDate';
import { flash } from 'react-universal-flash';
import { OvenContex } from './provider/Oven.provider';
import OvenTabContent from './compOven/OvenTabContent';
import CardDowntime from './compUtils/CardDowntime';

const Oven = () => {
  const { header } = useContext(OvenContex);
  const date = GetDate();
  const [productName, setProductName] = useState('Pilih Product');
  const [ovenProdId, setovenProdId] = useState(null);
  const [productId, setProductId] = useState(null);
  const initialsCheck = [
    {
      oven_prod_id: null,
      header_id: null,
      product_id: null,
      oven_prod_date: null,
      oven_prod_start: null,
      oven_prod_temp: null,
      oven_prod_stop: null,
      oven_prod_ttime: null,
      oven_prod_warm_time: null,
      oven_prod_remark: null,
      oven_prod_add_id: null,
      oven_prod_mod_id: null,
    },
  ];
  const [dataCheckProd, setdataCheckProd] = useState(initialsCheck);

  const handleChangeProd = async (name, id) => {
    setdataCheckProd(initialsCheck);
    setProductName(name);
    setProductId(id);
    await axios
      .get(`/oven/product/${date}/${id}/${header.header_id}`)
      .then((response) => {
        if (response.data) {
          setdataCheckProd([response.data]);
          setovenProdId(response.data.oven_prod_id);
        }
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Oven</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Form Oven
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <HeaderFormOven />

        <Row className="mt-3">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={3}>
              <CardProdOven setProductName={handleChangeProd} />
              <CardDowntime />
            </Col>
            <Col sm={9} className="mb-3">
              <Card className="border-0 shadow">
                <Card.Body>
                  <div className="my-2 ps-3 border-bottom">
                    <h4 className="fw-bold fs-5">{productName}</h4>
                  </div>
                  <OvenTabContent
                    dataCheckProd={dataCheckProd}
                    ovenProdId={ovenProdId}
                    productId={productId}
                    productName={productName}
                    setdataCheckProd={setdataCheckProd}
                    handleChangeProd={handleChangeProd}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </div>
  );
};

export default Oven;
