import React, { useState, useContext } from 'react';
import { MixingContex } from '../provider/Mixing.provider';
import axios from '../../axios/axios';
import { Row, Col, Card, Form, Tab, Tabs, Button } from 'react-bootstrap';
import ModelConfrmTab from './ModelConfrmTab';
import ModelRemark from './ModelRemark';
import { flash } from 'react-universal-flash';

const TabContentMixing = () => {
  const { mixerData, batchData, header, refreshBatc } = useContext(
    MixingContex
  );

  const [key, setKey] = useState(''); //state batch regis id
  const [confmkey, setconfmkey] = useState(''); //state batch regis id jika tab di klik
  const [inputList, setInputList] = useState([]); //state jika user isi form
  const [dataForm, setDataForm] = useState([]); //form params dan value
  const [modalConfirm, setmodalConfirm] = useState(false); //modal confirm pindah tab
  const [modConfrmTsfr, setmodConfrmTsfr] = useState(false); //modal confirm transfer
  const [modRemark, setmodRemark] = useState(false); //modal add remark
  const [dataRemark, setDataRemak] = useState(''); //data remark

  // handle input change
  const handleInputChange = (e) => {
    const lists = [...inputList];
    const { name, value } = e.target;
    const index = lists.findIndex((list) => list.params === name);
    index !== -1
      ? (lists[index] = { params: name, valuePar: value })
      : lists.push({ params: name, valuePar: value });
    setInputList(lists);
  };

  // handle Submit
  const submitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleProcCheck(key, 'N');
  };

  // push procek dan value
  const handleProcCheck = async (batchId, statTfr) => {
    const dataProCheck = {
      header_id: header.header_id,
      batch_regis_id: batchId,
      transfer_flagh: statTfr,
      mixer_proc_chek_date: header.header_prod_date,
      mixer_proc_chek_shift: header.header_shift,
    };

    await axios
      .post('/mixer/batch/procheck', dataProCheck)
      .then((response) => {
        const checkId = response.data.data.mixer_proc_chek_id;
        inputList.forEach((list) => {
          const dataCheck = {
            mixer_proc_check_id: checkId,
            standar_form_id: list.params,
            standar_form_value: list.valuePar,
          };
          axios.post('/mixer/batch/checklist', dataCheck);
        });
        flash('Data Saved', 5000, 'success');
        setInputList([]);
      })
      .catch((error) => console.log(error));
    refreshBatc();
  };

  // cari form dan nilainya
  const getFormValue = async (bRegId) => {
    setKey(bRegId);
    setInputList([]);
    setDataForm([]);

    // console.log(batchRegId);
    await axios
      .get(`/mixer/batch/MIXER/${bRegId}`)
      .then((response) => {
        // console.log(response.data);
        setDataForm(response.data);
      })
      .catch((error) => console.log(error));
  };

  // handle tabs yang
  const handleTabs = (k) => {
    if (inputList.length !== 0) {
      // jika ada input tanya dulu aktifkan modal confirm
      setmodalConfirm(true);
      // masukan next key tab
      setconfmkey(k);
    } else {
      // jika kosong input maka direct langsung
      getFormValue(k);
    }
  };

  // function confirm modal tab
  const confrmTab = (k) => {
    getFormValue(k);
    setmodalConfirm(false);
  };

  // function decline modal tab
  const declineTab = (key) => {
    setKey(key);
    setmodalConfirm(false);
  };

  // handle switch save transfer nyalakan modal confirm
  const handleChecked = (e) => {
    setmodConfrmTsfr(true);
  };

  // function save and transfer
  const saveAndTransfer = async (batchReg) => {
    handleProcCheck(batchReg, 'Y');
    await axios
      .patch(`/formula/${batchReg}`, { batch_regis_prod_flag: 'Y' })
      .then((response) => {
        flash(response.data.meesage, 5000, 'success');
      });
  };

  // function jika confirm transfer
  const confrmTsfr = (batchReg) => {
    saveAndTransfer(batchReg);
    setmodConfrmTsfr(false);
  };

  // function jika cancel transfer
  const cancelTfr = (batchReg) => {
    document.getElementById(
      `flexSwitchCheckDefault${batchReg}`
    ).checked = false;
    setmodConfrmTsfr(false);
  };

  // handle remark button
  const remarkBtn = () => {
    const remarkValue = dataForm.filter((data) => data.standar_form_id === 25);
    // console.log(dataForm);
    // console.log(remarkValue);
    setDataRemak(remarkValue);
    setmodRemark(true);
  };

  return (
    <>
      <Tab.Content>
        {/* {JSON.stringify(inputList)} */}
        {mixerData.map((product, index) => (
          <Tab.Pane key={index} eventKey={product.product_id}>
            <Tabs
              activeKey={key}
              onSelect={(k) => handleTabs(k)}
              defaultActiveKey="Batch1"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {batchData
                .filter((plan) => plan.product_id === product.product_id)
                .map((batch, idx) => (
                  <Tab
                    key={idx}
                    eventKey={batch.batch_regis_id}
                    title={`Batch${idx + 1}`}
                  >
                    <div className="ms-2">
                      <Row className="justify-content-end mb-2 me-md-2  me-1">
                        <Col
                          sm={7}
                          md={5}
                          xl={3}
                          className="text-end border rounded-pill shadow-sm"
                        >
                          <div className="form-check form-switch">
                            <label className="form-check-label me-2 pe-4">
                              Save & Transfer
                            </label>
                            <input
                              className="form-check-input p-0"
                              type="checkbox"
                              role="switch"
                              aria-checked
                              disabled={
                                batch.batch_regis_prod_flag === 'Y'
                                  ? true
                                  : false
                              }
                              defaultChecked={
                                batch.batch_regis_prod_flag === 'Y'
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleChecked()}
                              id={
                                'flexSwitchCheckDefault' + batch.batch_regis_id
                              }
                            ></input>
                          </div>
                        </Col>
                      </Row>
                      <Form
                        onSubmit={submitForm}
                        // noValidate
                        // validated={validated}
                      >
                        <Row className="mb-3">
                          <Col sm={6}>
                            <Row className="mb-3">
                              <Card>
                                <Card.Body>
                                  {dataForm
                                    .filter(
                                      (formPre) =>
                                        formPre.standar_form_section === 'pre'
                                    )
                                    .map((pre, iy) => (
                                      <Form.Group
                                        key={iy}
                                        as={Col}
                                        controlId={pre.standar_form_id + 'form'}
                                      >
                                        <Form.Label>
                                          {pre.standar_form_param}
                                        </Form.Label>
                                        <Form.Control
                                          type={pre.standar_form_tipe}
                                          maxLength={3}
                                          min={0}
                                          max={100}
                                          size="sm"
                                          required
                                          disabled={
                                            batch.batch_regis_prod_flag === 'Y'
                                              ? true
                                              : false
                                          }
                                          name={pre.standar_form_id}
                                          defaultValue={pre.standar_form_value}
                                          onChange={handleInputChange}
                                        />
                                      </Form.Group>
                                    ))}
                                </Card.Body>
                              </Card>
                            </Row>
                            <Row>
                              <Card>
                                <Card.Body>
                                  {dataForm
                                    .filter(
                                      (formProc) =>
                                        formProc.standar_form_tipe ===
                                        'SEPARATOR'
                                    )
                                    .map((proc, i) => (
                                      <div key={i}>
                                        <div key={i} className="border-bottom">
                                          {proc.standar_form_param}
                                        </div>
                                        <Row>
                                          {dataForm
                                            .filter(
                                              (speedCat) =>
                                                speedCat.standar_form_parent ===
                                                  proc.standar_form_parent &&
                                                speedCat.standar_form_tipe !==
                                                  'SEPARATOR'
                                            )
                                            .map((speed, idnx) => (
                                              <Form.Group
                                                key={idnx}
                                                as={Col}
                                                controlId="formSpeedHigh1"
                                              >
                                                <Form.Label>
                                                  {speed.standar_form_param}
                                                </Form.Label>
                                                <Form.Control
                                                  type={speed.standar_form_tipe}
                                                  maxLength={3}
                                                  min={0}
                                                  max={100}
                                                  disabled={
                                                    batch.batch_regis_prod_flag ===
                                                    'Y'
                                                      ? true
                                                      : false
                                                  }
                                                  name={speed.standar_form_id}
                                                  defaultValue={
                                                    speed.standar_form_value
                                                  }
                                                  onChange={handleInputChange}
                                                  size="sm"
                                                />
                                              </Form.Group>
                                            ))}
                                        </Row>
                                      </div>
                                    ))}
                                </Card.Body>
                              </Card>
                            </Row>
                          </Col>
                          <Col>
                            <Card>
                              <Card.Body>
                                {dataForm
                                  .filter(
                                    (formPre) =>
                                      formPre.standar_form_section === 'after'
                                  )
                                  .map((after, ix) => (
                                    <Form.Group
                                      key={ix}
                                      as={Col}
                                      controlId={after.standar_form_id + 'form'}
                                    >
                                      <Form.Label>
                                        {after.standar_form_param}
                                      </Form.Label>
                                      <Form.Control
                                        type={after.standar_form_tipe}
                                        size="sm"
                                        disabled={
                                          batch.batch_regis_prod_flag === 'Y'
                                            ? true
                                            : false
                                        }
                                        name={after.standar_form_id}
                                        defaultValue={after.standar_form_value}
                                        onChange={handleInputChange}
                                      />
                                    </Form.Group>
                                  ))}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                        <Row className=" justify-content-end">
                          <Col className="text-end" sm={4}>
                            <Button
                              className="me-2"
                              size="sm"
                              variant="warning"
                              disabled={
                                batch.batch_regis_prod_flag === 'Y'
                                  ? true
                                  : false
                              }
                              onClick={() => remarkBtn()}
                            >
                              Add Remark
                            </Button>
                            <Button
                              size="sm"
                              variant="primary"
                              disabled={
                                batch.batch_regis_prod_flag === 'Y'
                                  ? true
                                  : false
                              }
                              type="submit"
                              // onClick={() =>
                              //   handleProcCheck(batch.batch_regis_id, 'N')
                              // }
                            >
                              Save
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Tab>
                ))}
            </Tabs>
          </Tab.Pane>
        ))}
      </Tab.Content>
      {modalConfirm ? (
        <ModelConfrmTab
          showModal={modalConfirm}
          messageConf={
            'Ada Data Check List Belum Disimpan Anda Yakin Akan Pindah Tab Batch?'
          }
          confirmNext={() => confrmTab(confmkey)}
          cancelmNext={() => declineTab(key)}
        />
      ) : (
        ''
      )}
      {modConfrmTsfr ? (
        <ModelConfrmTab
          showModal={modConfrmTsfr}
          messageConf={
            'Transfer Batch ?, Mohon Pastikan Data Sudah Terisi Dengan Benar!'
          }
          confirmNext={() => confrmTsfr(key)}
          cancelmNext={() => cancelTfr(key)}
        />
      ) : (
        ''
      )}
      {modRemark ? (
        <ModelRemark
          showModal={modRemark}
          batchId={key}
          headerId={header.header_id}
          dataRemarkDef={dataRemark}
          cancelmNext={() => setmodRemark(false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default TabContentMixing;
