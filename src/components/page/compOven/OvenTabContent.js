// import React from 'react';
import React, { useContext, useEffect, useState } from 'react';
import {
  Tab,
  Tabs,
  Accordion,
  InputGroup,
  Row,
  Col,
  FormControl,
  Button,
  Form,
  Table,
} from 'react-bootstrap';
import { OvenContex } from '../provider/Oven.provider';
import GetDate from '../utilis/GetDate';
import CountHour from '../utilis/CountHour';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';
import OvenModRemark from './OvenModRemark';

const OvenTabContent = ({
  dataCheckProd,
  setdataCheckProd,
  ovenProdId,
  productId,
  productName,
  handleChangeProd,
}) => {
  const date = GetDate();
  const { prodOven, batchData, userId, header } = useContext(OvenContex);
  const [batchFormVal, setBatchFormVal] = useState([]);
  const [standarForm, setStandarForm] = useState([]);
  const [dataBatchBridge, setDataBatchBridge] = useState({});
  const [showRemarkMod, setshowRemarkMod] = useState(false);

  useEffect(() => {
    getRepStandarForm();
  }, []);

  //untuk get standarForm oven
  const getRepStandarForm = async () => {
    axios
      .get('/getform/OVEN')
      .then((response) => {
        setStandarForm(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleInputProd = (e) => {
    const { value, name } = e.target;
    const updateProd = { ...dataCheckProd[0] };
    updateProd[name] = value;

    if (
      name === 'oven_prod_start' ||
      name === 'oven_prod_stop' ||
      name === 'oven_prod_temp'
    ) {
      //hitung total time oprational oven
      if (
        updateProd.oven_prod_stop === null ||
        updateProd.oven_prod_start === null
      ) {
        updateProd.oven_prod_ttime = 0;

        if (
          updateProd.oven_prod_temp === null ||
          updateProd.oven_prod_start == null
        ) {
          updateProd.oven_prod_warm_time = 0;
          return setdataCheckProd([updateProd]);
        }

        const warmTime = CountHour(
          updateProd.oven_prod_temp,
          updateProd.oven_prod_start
        );

        return setdataCheckProd([
          {
            ...updateProd,
            oven_prod_warm_time: warmTime,
          },
        ]);
      }

      if (
        updateProd.oven_prod_temp === null ||
        updateProd.oven_prod_start == null
      ) {
        updateProd.oven_prod_warm_time = 0;
        const totTime = CountHour(
          updateProd.oven_prod_stop,
          updateProd.oven_prod_start
        );

        return setdataCheckProd([{ ...updateProd, oven_prod_ttime: totTime }]);
      }

      const totTime = CountHour(
        updateProd.oven_prod_stop,
        updateProd.oven_prod_start
      );

      const warmTime = CountHour(
        updateProd.oven_prod_temp,
        updateProd.oven_prod_start
      );

      return setdataCheckProd([
        //jika dua dauanya tida NAN
        {
          ...updateProd,
          oven_prod_ttime: totTime,
          oven_prod_warm_time: warmTime,
        },
      ]);
    }

    setdataCheckProd([updateProd]);
  };

  //ini untuk submit Product Info (acordion)
  const handleSubmit = async (id) => {
    const forPushCheck = { ...dataCheckProd[0] };
    forPushCheck.header_id = header.header_id;
    forPushCheck.product_id = id;
    forPushCheck.oven_prod_date = date;
    forPushCheck.oven_prod_add_id = userId;
    forPushCheck.oven_prod_mod_id = userId;

    await axios
      .post('oven/product-check', forPushCheck)
      .then((response) => {
        handleChangeProd(productName, id);
        flash(response.data.message, 5000, 'success');
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //untuk get data saat klik tabs batch
  const handleChangeBatch = async (batchReg) => {
    setDataBatchBridge({});
    await axios
      .get(`/oven/batch-bridge/${batchReg}`)
      .then((response) => setDataBatchBridge(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));

    await axios
      .get(`/oven/batch/form/${batchReg}`)
      .then((response) => setBatchFormVal(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //untuk handle input data batch (saat ini baru start batch aja)
  const handleInputBatchVal = async (e, batchRegId, prodCheckId) => {
    //disini di cek dulu apa Product info sudah di input? min input start product info
    if (!prodCheckId) {
      return flash('Harap Input Product Info', 10000, 'danger'); //jika tidak kasih flash danger
    }
    const { name, value } = e.target;
    const batchBridge = {
      oven_prod_batch_id: null,
      oven_prod_id: prodCheckId,
      header_id: header.header_id,
      batch_regist_id: batchRegId,
      oven_prod_batch_date: date,
      oven_prod_batch_add_id: userId,
      oven_prod_batch_mod_id: userId,
    };

    setDataBatchBridge(batchBridge);

    const dataInput = {
      oven_prod_id: prodCheckId,
      batch_regis_id: batchRegId,
      standar_form_id: parseInt(name),
      standar_form_value: value,
    };

    const indexFormId = batchFormVal.findIndex(
      (frmId) => frmId.standar_form_id === parseInt(name)
    );
    const dataPostAwal = [...batchFormVal];

    dataPostAwal[indexFormId] = { ...dataPostAwal[indexFormId], ...dataInput };
    setBatchFormVal(dataPostAwal);
  };

  //ini function handle save batch
  const handlePushBatch = async (batchRegId) => {
    const dataBatch = batchFormVal.filter(
      // cek dulu apa regist id ada atau tidak
      (batch) => batch.batch_regis_id === batchRegId
    );

    if (dataBatch.length === 0) {
      //kalo tidak ada berart belum di input start batch
      return flash('Mohon Input Data', 3000, 'danger'); //kasih flash danger
    }

    await axios
      .post('/oven/batch-bridge', dataBatchBridge)
      .then((response) => flash(response.data.message, 5000, 'success'))
      .catch((error) => flash(error.message, 5000, 'danger'));

    if (dataBatch.length !== 0) {
      dataBatch.forEach(async (valBatch, index) => {
        await axios //push data
          .post(`/oven/batch`, valBatch)
          .then((response) => {
            handleChangeBatch(batchRegId);

            if (index === dataBatch.length - 1) {
              flash(response.data.message, 5000, 'success');
            }
          })
          .catch((error) => flash(error.message, 5000, 'danger'));
      });
    }
  };

  return (
    <div>
      <Tab.Content>
        {prodOven.map((product, idx) => (
          <Tab.Pane key={idx} eventKey={product.product_id}>
            {dataCheckProd.map((check, i) => (
              <Accordion
                key={i}
                className="mb-2"
                defaultActiveKey={product.product_id}
              >
                <Accordion.Item eventKey={product.product_id}>
                  <Accordion.Header>Input Product Info</Accordion.Header>
                  <Accordion.Body>
                    <Row className="mb-1 border border-1 p-1">
                      <p className="fw-bold">Operational</p>
                      <Col xs={4} className="">
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="start-ops">
                            Start
                          </InputGroup.Text>
                          <FormControl
                            type="time"
                            size="sm"
                            placeholder="Start"
                            aria-label="Start"
                            name="oven_prod_start"
                            defaultValue={check.oven_prod_start}
                            onChange={handleInputProd}
                            aria-describedby="start-ops"
                          />
                        </InputGroup>
                      </Col>
                      <Col xs={4} className="">
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="start-ops">
                            Set. Temp
                          </InputGroup.Text>
                          <FormControl
                            type="time"
                            size="sm"
                            placeholder="Start"
                            aria-label="Start"
                            name="oven_prod_temp"
                            defaultValue={check.oven_prod_temp}
                            onChange={handleInputProd}
                            aria-describedby="start-ops"
                          />
                        </InputGroup>
                      </Col>

                      <Col xs={4} className="">
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="stop-ops">Stop</InputGroup.Text>

                          <FormControl
                            type="time"
                            placeholder="Stop"
                            aria-label="StStopart"
                            name="oven_prod_stop"
                            defaultValue={check.oven_prod_stop}
                            onChange={handleInputProd}
                            aria-describedby="stop-ops"
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="justify-content-end">
                      <Col sm={3} className="text-end">
                        <Button
                          size="sm"
                          variant="warning"
                          className="mr-2"
                          onClick={() => setshowRemarkMod(true)}
                        >
                          Add Remark
                        </Button>
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleSubmit(product.product_id)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}

            <Tabs
              defaultActiveKey="Batch1"
              onSelect={(k) => handleChangeBatch(k)}
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {batchData
                .filter((plan) => plan.product_id === product.product_id)
                .map((batch, ind) => (
                  <Tab
                    key={ind}
                    disabled={
                      header.header_id !== batch.header_id &&
                      batch.header_id !== null
                    }
                    eventKey={batch.batch_regis_id}
                    title={`Batch${ind + 1}-${batch.batch_regis_id}`}
                  >
                    <Table size="sm" striped bordered responsive>
                      <thead>
                        <tr className="table-center align-middle">
                          {standarForm
                            .filter(
                              (title) => title.standar_form_parent === null
                            )
                            .map((form, idnx) => (
                              <th
                                className="text-center align-middle"
                                key={idnx}
                                rowSpan={
                                  form.standar_form_tipe !== 'sparator' ? 2 : ''
                                }
                                colSpan={
                                  form.standar_form_tipe === 'sparator'
                                    ? form.standar_form_unit
                                    : ''
                                }
                              >
                                {form.standar_form_param}
                              </th>
                            ))}
                        </tr>
                        <tr>
                          {standarForm
                            .filter(
                              (title, ix) => title.standar_form_parent !== null
                            )
                            .map((form, idnx) => (
                              <th key={idnx}>{form.standar_form_param}</th>
                            ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {batchFormVal
                            .filter(
                              (frm) =>
                                frm.batch_regis_id === batch.batch_regis_id ||
                                (frm.batch_regis_id === null &&
                                  frm.standar_form_tipe !== 'sparator')
                            )
                            .map((formVal, indx) => (
                              <td key={indx}>
                                <Form.Control
                                  size="sm"
                                  type={formVal.standar_form_tipe}
                                  name={formVal.standar_form_id}
                                  defaultValue={formVal.standar_form_value}
                                  min={0}
                                  onChange={(e) =>
                                    handleInputBatchVal(
                                      e,
                                      batch.batch_regis_id,
                                      ovenProdId
                                    )
                                  }
                                  placeholder={formVal.standar_form_intials}
                                />
                              </td>
                            ))}
                        </tr>
                      </tbody>
                    </Table>
                    <Row className="justify-content-end">
                      <Col className="col-auto">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handlePushBatch(batch.batch_regis_id)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                ))}
            </Tabs>
          </Tab.Pane>
        ))}
      </Tab.Content>
      {showRemarkMod ? (
        <OvenModRemark
          dataCheckProd={dataCheckProd}
          paramsId={{
            header_id: header.header_id,
            product_id: productId,
            forming_prod_date: date,
            forming_prod_add_id: userId,
            forming_prod_mod_id: userId,
          }}
          showModal={showRemarkMod}
          closeMdl={() => setshowRemarkMod(false)}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default OvenTabContent;
