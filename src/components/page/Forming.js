import React, { useContext, useState } from 'react';
import { Container, Breadcrumb, Row, Col, Card, Tab } from 'react-bootstrap';
import CardProdForming from './compForming/CardProdForming';
import FormingTabsContent from './compForming/FormingTabsContent';
import HeaderForming from './compForming/HeaderForming';
import axios from '../axios/axios';
import GetDate from './utilis/GetDate';
import { flash } from 'react-universal-flash';
import { FormingContex } from './provider/Forming.provider';
import CardDowntime from './compUtils/CardDowntime';

const Forming = () => {
  const { header } = useContext(FormingContex);
  const date = GetDate();
  const [productName, setProductName] = useState('Pilih Product');
  const [formingProdId, setformingProdId] = useState(null);
  const [productId, setProductId] = useState(null);
  const initialsCheck = [
    {
      forming_prod_id: null,
      header_id: null,
      product_id: null,
      forming_prod_date: null,
      forming_prod_start: null,
      forming_prod_stop: null,
      forming_prod_ttime: null,
      forming_prod_cleaning: null,
      forming_prod_setting: null,
      forming_prod_tdown: null,
      forming_prod_reject_mesin: null,
      forming_prod_reject_lantai: null,
      forming_prod_reject_tot: null,
      forming_prod_remark: null,
      forming_prod_add_id: null,
      forming_prod_mod_id: null,
    },
  ];
  const [dataCheckProd, setdataCheckProd] = useState(initialsCheck);
  // const [inputListProd, setInputListProd] = useState(dataCheckProd[0]);

  const handleChangeProd = async (name, id) => {
    setdataCheckProd(initialsCheck);
    setProductName(name);
    setProductId(id);
    await axios
      .get(`/forming/product/${date}/${id}/${header.header_id}`)
      .then((response) => {
        // console.log(response.data);
        if (response.data) {
          setdataCheckProd([response.data]);
          setformingProdId(response.data.forming_prod_id);
          // console.log(true);
        }
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  return (
    <div>
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
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col sm={3}>
              <CardProdForming setProductName={handleChangeProd} />
              <CardDowntime />
            </Col>
            <Col sm={9}>
              <Card className="border-0 shadow">
                <Card.Body>
                  <div className="my-2 ps-3 border-bottom">
                    <h4 className="fw-bold fs-5">{productName}</h4>
                  </div>
                  <FormingTabsContent
                    dataCheckProd={dataCheckProd}
                    formingProdId={formingProdId}
                    productId={productId}
                    setdataCheckProd={setdataCheckProd}
                    setformingProdId={setformingProdId}
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

export default Forming;
