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
} from 'react-bootstrap';
import { FormingContex } from '../provider/Forming.provider';
import GetDate from '../utilis/GetDate';
import CountHour from '../utilis/CountHour';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';
import FormingModRemark from './FormingModRemark';

const FormingTabsContent = ({
  dataCheckProd,
  setdataCheckProd,
  setformingProdId,
  formingProdId,
  productId,
}) => {
  const date = GetDate();
  const { prodForming, batchData, userId, header } = useContext(FormingContex);
  const [batchFormVal, setBatchFormVal] = useState([]);
  const [showRemarkMod, setshowRemarkMod] = useState(false);
  const [batchId, setbatchId] = useState('');

  useEffect(() => {
    setBatchFormVal([]);
  }, [formingProdId, batchId]);

  //Ini Input Acordion
  const handleInputProd = (e) => {
    const { value, name } = e.target;
    const updateProd = { ...dataCheckProd[0] };
    updateProd[name] = value;

    if (name === 'forming_prod_start' || name === 'forming_prod_stop') {
      //hitung total time oprational forming
      if (
        updateProd.forming_prod_stop === null ||
        updateProd.forming_prod_start === null
      ) {
        return setdataCheckProd([{ ...updateProd, forming_prod_ttime: 0 }]);
      }

      const totTime = CountHour(
        updateProd.forming_prod_stop,
        updateProd.forming_prod_start
      );

      if (isNaN(totTime.split(':')[0])) {
        updateProd.forming_prod_ttime = 0;
        return setdataCheckProd([updateProd]);
      }

      return setdataCheckProd([{ ...updateProd, forming_prod_ttime: totTime }]);
    }

    if (name === 'forming_prod_cleaning' || name === 'forming_prod_setting') {
      //hitung total time  Downtime
      updateProd.forming_prod_tdown = funcPenjumlahan(
        updateProd.forming_prod_cleaning,
        updateProd.forming_prod_setting
      );

      return setdataCheckProd([updateProd]);
    }

    if (
      name === 'forming_prod_reject_mesin' ||
      name === 'forming_prod_reject_lantai'
    ) {
      //hitung total reject
      updateProd.forming_prod_reject_tot = funcPenjumlahanDec(
        updateProd.forming_prod_reject_mesin,
        updateProd.forming_prod_reject_lantai
      );

      return setdataCheckProd([updateProd]);
    }

    setdataCheckProd([updateProd]);
  };

  //function untuk penjumlahan downtime atau  reject dough
  const funcPenjumlahan = (a, b) => {
    const total = parseInt(a) + parseInt(b);
    return isNaN(total) ? 0 : total;
    // return 0;
  };
  const funcPenjumlahanDec = (a, b) => {
    const total = parseFloat(a) + parseFloat(b);
    return isNaN(total) ? 0 : total.toFixed(2);
    // return 0;
  };

  //ini untuk submit Product Info (acordion)
  const handleSubmit = async (id) => {
    if (!dataCheckProd[0].forming_prod_start)
      return flash('Start Operational Belum diinput', 5000, 'danger');
    const forPushCheck = { ...dataCheckProd[0] };
    forPushCheck.header_id = header.header_id;
    forPushCheck.product_id = id;
    forPushCheck.forming_prod_date = date;
    forPushCheck.forming_prod_add_id = userId;
    forPushCheck.forming_prod_mod_id = userId;

    await axios
      .post('forming/product-check', forPushCheck)
      .then((ressponse) => {
        if (ressponse.data.message !== 'Data Updated') {
          setdataCheckProd([ressponse.data.data]);
          setformingProdId(ressponse.data.data.forming_prod_id);
        }

        flash(ressponse.data.message, 5000, 'success');
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //untuk get data saat klik tabs batch
  const handleChangeBatch = async (batchReg) => {
    setbatchId(batchReg);
    await axios
      .get(`/forming/batch/form/${batchReg}`)
      .then((response) => setBatchFormVal(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //untuk handle input data batch
  const handleInputBatchVal = async (e, batchRegId, prodCheckId) => {
    //disini di cek dulu apa Product info sudah di input? min input start product info
    if (!prodCheckId) {
      return flash('Harap Input Product Info', 5000, 'danger'); //jika tidak kasih flash danger
    }

    const { name, value } = e.target;
    const lists = [...batchFormVal];
    const dataInput = {
      forming_prod_id: prodCheckId,
      batch_regis_id: batchRegId,
      standar_form_id: parseInt(name),
      standar_form_value: value,
    };

    const index = lists.findIndex(
      (list) => list.standar_form_id === parseInt(name)
    );

    lists[index] = { ...lists[index], ...dataInput };

    if (
      lists[0].standar_form_value !== null &&
      lists[1].standar_form_value !== null
    ) {
      const totTime = CountHour(
        lists[1].standar_form_value,
        lists[0].standar_form_value
      );

      if (
        isNaN(totTime.split(':')[0]) ||
        parseInt(totTime.split(':')[0]) < 0 ||
        parseInt(totTime.split(':')[1]) < 0
      ) {
        return flash(
          'Finish Time Tidak Bisa Lebih Kecil Dari Start Time',
          10000,
          'danger'
        );
      }

      lists[2] = {
        ...lists[2],
        forming_prod_id: prodCheckId,
        batch_regis_id: batchRegId,
        standar_form_id: 69,
        standar_form_value: totTime,
      };
      return setBatchFormVal(lists);
    }

    return setBatchFormVal(lists); //set state jadi array of object
  };

  //ini function handle save batch
  const handleBatchFlagh = (batchRegId) => {
    if (batchFormVal[0].standar_form_value === null) {
      //kalo tidak ada berart belum di input start batch
      return flash('Start Batch Belum Diinput', 3000, 'danger'); //kasih flash danger
    }

    const dataBatch = batchFormVal.filter(
      // cek dulu apa regist id ada atau tidak
      (batch) => batch.standar_form_value !== null
    );

    dataBatch.map(async (dataPush, indx) => {
      dataPush['forming_batch_prod_flag'] = 'Y'; //jika ada rubah flagh

      if (dataPush.standar_form_value !== null) {
        dataPush.standar_form_value.split(':').forEach((dtime) => {
          if (isNaN(dtime) || parseInt(dtime) < 0) {
            return flash(
              'Finish Time Tidak Bisa Lebih Kecil Dari Start Time',
              3000,
              'danger'
            );
          }
        });
      }
      //push data
      await axios
        .post(`/forming/batch`, dataPush)
        .then((response) => {
          if (dataBatch.length === indx + 1) {
            //jika push data terakhir maka munculkan flash
            flash(response.data.message, 5000, 'success');
            handleChangeBatch(batchRegId);
          }
        })
        .catch((error) => flash(error.message, 5000, 'danger'));
    });
  };

  return (
    <>
      {/* {JSON.stringify(batchFormVal)} */}
      {/* {JSON.stringify(batchData)} */}
      <Tab.Content>
        {prodForming.map((product, idx) => (
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
                    <Row className="mb-1">
                      <Col className="border border-1 p-2">
                        <p className="fw-bold">Operational</p>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="start-ops">
                            Start
                          </InputGroup.Text>
                          <FormControl
                            type="time"
                            size="sm"
                            placeholder="Start"
                            aria-label="Start"
                            name="forming_prod_start"
                            defaultValue={check.forming_prod_start}
                            onChange={handleInputProd}
                            aria-describedby="start-ops"
                          />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="stop-ops">Stop</InputGroup.Text>

                          <FormControl
                            type="time"
                            placeholder="Stop"
                            aria-label="StStopart"
                            name="forming_prod_stop"
                            defaultValue={check.forming_prod_stop}
                            onChange={handleInputProd}
                            aria-describedby="stop-ops"
                          />
                        </InputGroup>
                      </Col>

                      <Col className="border border-1 p-2 mx-2">
                        <p className="fw-bold">Plan Downtime</p>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="cleaning">
                            Cleaning
                          </InputGroup.Text>
                          <FormControl
                            type="number"
                            size="sm"
                            min={0}
                            placeholder="30"
                            name="forming_prod_cleaning"
                            defaultValue={check.forming_prod_cleaning}
                            onChange={handleInputProd}
                            aria-label="cleaning"
                            aria-describedby="cleaning"
                          />
                          <InputGroup.Text id="cleaning">Mnt</InputGroup.Text>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="setting">
                            Setting
                          </InputGroup.Text>
                          <FormControl
                            type="number"
                            size="sm"
                            min={0}
                            placeholder="10"
                            aria-label="setting"
                            name="forming_prod_setting"
                            defaultValue={check.forming_prod_setting}
                            onChange={handleInputProd}
                            aria-describedby="setting"
                          />
                          <InputGroup.Text id="setting-menit">
                            Mnt
                          </InputGroup.Text>
                        </InputGroup>
                      </Col>

                      <Col className="border border-1 p-2 ">
                        <p className="fw-bold">Reject Dough</p>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="reject-mesin">
                            Mesin
                          </InputGroup.Text>
                          <FormControl
                            type="number"
                            size="sm"
                            min={0}
                            step="0.1"
                            placeholder="2"
                            aria-label="reject-mesin"
                            name="forming_prod_reject_mesin"
                            defaultValue={check.forming_prod_reject_mesin}
                            onChange={handleInputProd}
                            aria-describedby="reject-mesin"
                          />
                          <InputGroup.Text id="reject-mesin-mnt">
                            Kg
                          </InputGroup.Text>
                        </InputGroup>
                        <InputGroup size="sm" className="mb-2">
                          <InputGroup.Text id="lantai">Lantai</InputGroup.Text>
                          <FormControl
                            type="number"
                            size="sm"
                            min={0}
                            step="0.1"
                            placeholder="10"
                            aria-label="lantai"
                            name="forming_prod_reject_lantai"
                            defaultValue={check.forming_prod_reject_lantai}
                            onChange={handleInputProd}
                            aria-describedby="lantai"
                          />
                          <InputGroup.Text id="lantai-kg">Kg</InputGroup.Text>
                        </InputGroup>
                      </Col>
                    </Row>

                    <Row className="justify-content-end">
                      <Col sm={4} className="text-end">
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
                          save
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
                    eventKey={batch.batch_regis_id}
                    title={`Batch${ind + 1}`}
                  >
                    <Row className="container">
                      {batchFormVal
                        .filter((frm) => frm.standar_form_section !== 'result')
                        .map((formVal, indx) => (
                          <Col sm={4} key={indx}>
                            <Form.Group
                              as={Row}
                              controlId={formVal.standar_form_param}
                            >
                              <Form.Label className="text-end" column sm="6">
                                {formVal.standar_form_param}
                              </Form.Label>
                              <Col sm="6">
                                <FormControl
                                  type={formVal.standar_form_tipe}
                                  size="sm"
                                  placeholder=""
                                  aria-label={formVal.standar_form_param}
                                  disabled={
                                    formVal.forming_batch_prod_flag === 'Y'
                                  }
                                  name={formVal.standar_form_id}
                                  defaultValue={formVal.standar_form_value}
                                  onChange={(e) =>
                                    handleInputBatchVal(
                                      e,
                                      batch.batch_regis_id,
                                      formingProdId
                                    )
                                  }
                                  aria-describedby="start-ops"
                                />
                              </Col>
                            </Form.Group>
                          </Col>
                        ))}
                    </Row>
                    <Row className="justify-content-end">
                      <Col sm={2} className="text-end">
                        {batchFormVal.length !== 0 ? (
                          <Button
                            size="sm"
                            id={'button' + batch.batch_regis_id}
                            variant="primary"
                            // disabled={formVal.forming_batch_prod_flag === 'Y'}
                            onClick={() =>
                              handleBatchFlagh(batch.batch_regis_id)
                            }
                          >
                            Save
                          </Button>
                        ) : (
                          ''
                        )}
                      </Col>{' '}
                    </Row>
                  </Tab>
                ))}
            </Tabs>
          </Tab.Pane>
        ))}
      </Tab.Content>
      {showRemarkMod ? (
        <FormingModRemark
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
    </>
  );
};

export default FormingTabsContent;
