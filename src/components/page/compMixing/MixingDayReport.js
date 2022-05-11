import React, { useContext, useEffect, useState } from 'react';

import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Card,
  Form,
  Tab,
  Tabs,
  Accordion,
  Badge,
  Table,
} from 'react-bootstrap';
import { FcApproval, FcCancel } from 'react-icons/fc';

import GetDate from '../utilis/GetDate';
import axios from '../../axios/axios';
import LineChart from '../apexChart/LineChart';
import MixingBatchReport from './MixingBatchReport';
import MixingProdReport from './MixingProdReport';
import { AuthContext } from '../../auth/AuthProvider';
// import moment from 'moment';

const MixingDayReport = () => {
  const { dispatch } = useContext(AuthContext);

  const [date, setDate] = useState(GetDate());
  const [dataChart, setDataChart] = useState([]);
  const [sequenBatch, setsequenBatch] = useState([]);
  const [paramReport, setparamReport] = useState([]);
  const [listShift, setListShift] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [shiftId, setShiftid] = useState('');
  const [productId, setproductId] = useState('');
  const [productListId, setPoruductListid] = useState([]);
  const [masterValue, setMasterValue] = useState([]);
  const [standarForm, setStandarForm] = useState([]);

  const [totalBatch, setTotalBatch] = useState(0);
  const [finishBatch, setFinishBatch] = useState(0);
  const [varBatch, setVarBatch] = useState(0);
  const [runBatch, setRunBatch] = useState(0);

  const [downtimeList, setDowntimeList] = useState([]);

  const loadingOn = () => {
    dispatch({ type: 'LAUNCH_LOADING', payload: true });
  };
  const loadingOff = () => {
    dispatch({ type: 'LAUNCH_LOADING', payload: false });
  };

  const changeDate = (e) => {
    const { value } = e.target;
    setShiftid('');
    setproductId('');
    setDate(value);
  };

  const changeShift = (e) => {
    const { value } = e.target;
    setShiftid(value);
    getProductChart(date, value, productId);
    getSequenBatch(date, value, productId);
    getparamReport(date, value, productId);
  };

  const changeProduct = (e) => {
    const { value } = e.target;
    setproductId(value);
    getProductChart(date, shiftId, value);
    getSequenBatch(date, shiftId, value);
    getparamReport(date, shiftId, value);
  };

  const getDowntimeList = async () => {
    await axios
      .get(`/downtime/report/${date}%25/1`)
      .then((response) => setDowntimeList(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    // setDate();

    getSequenBatch(date, shiftId, productId);
    getProductChart(date, shiftId, productId);
    getparamReport(date, shiftId, productId);
    getMixMasterVal(date);
    getDowntimeList();
    getStandarForm();
  }, [date]);

  const getparamReport = async (tgl, shft, prod) => {
    try {
      await axios
        .get(`/mixer/report/${tgl}/%25${shft}%25/${prod}%25`)
        .then((res) => {
          setparamReport(res.data);
          // console.log(res.data);
          const valueShift = [
            ...new Set(res.data.map((x) => x.mixer_proc_chek_shift)), //disitng shift
          ];

          //runing batch
          const runB = res.data.findIndex(
            (bt) => bt.start_time !== null && bt.finish_time === null
          );

          //Total Batch
          const ttlB = res.data.length;

          //finish Batch
          const fnsB = res.data.filter(
            (btchF) => btchF.batch_regis_end_time !== null
          ).length;

          setTotalBatch(ttlB);
          setFinishBatch(fnsB);
          setVarBatch(ttlB - fnsB);

          setRunBatch(runB + 1);

          if (shft === '') {
            setListShift(valueShift);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductChart = async (tgl, shft, prod) => {
    try {
      loadingOn();
      await axios
        .get(`/mixer/report/product/${tgl}/%25${shft}%25/${prod}%25`)
        .then((response) => {
          setPoruductListid(response.data);
          // console.log(response.data);
          const valueProduct = [
            ...new Map(
              response.data.map((item) => [item['id'], item])
            ).values(), //disitng shift
          ];
          setDataChart(valueProduct);

          if (prod === '') {
            setListProduct(response.data);
          }
        });
      loadingOff();
    } catch (error) {
      console.log(error);
    }
  };

  const getSequenBatch = async (tgl, shft, prod) => {
    await axios
      .get(`/mixer/report/sequence/${tgl}/%25${shft}%25/${prod}%25`)
      .then((response) => setsequenBatch(response.data))
      .catch((error) => {
        console.log('error mendapatkan sequence', error);
      });
  };

  const getMixMasterVal = async (tgl) => {
    await axios
      .get(`mixer/report/master/${tgl}`)
      .then((response) => {
        // console.log(response.data);
        setMasterValue(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStandarForm = async (tgl) => {
    await axios
      .get(`/getform/MIXER`)
      .then((response) => {
        // console.log(response.data);
        setStandarForm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Mixer</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Mixer Daily Reports
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="border-0 shadow mb-3">
          <Card.Body>
            {/* {JSON.stringify(sequenBatch)} */}
            <Row>
              <Col className="mb-2" md={4}>
                <Form.Control
                  size="sm"
                  defaultValue={date}
                  onChange={changeDate}
                  type="date"
                />
              </Col>
              <Col className="mb-2" md={4}>
                <Form.Select value={shiftId} onChange={changeShift} size="sm">
                  <option value="">Select Shift</option>
                  {listShift.map((shif, index) =>
                    shif !== null ? (
                      <option key={index} value={shif}>
                        shift {shif}
                      </option>
                    ) : (
                      ''
                    )
                  )}
                </Form.Select>
              </Col>
              <Col className="mb-2" md={4}>
                <Form.Select
                  value={productId}
                  onChange={changeProduct}
                  size="sm"
                >
                  <option value="">Select Product</option>
                  {listProduct.map((idPord, index) => (
                    <option key={index} value={idPord.id}>
                      {idPord.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Row>
          <Col xs={6} sm={3}>
            <Card className="border-0 shadow mb-3 bg-primary">
              <Card.Body>
                <p className="h5">Total Batch</p>
                <p className="h2">{totalBatch}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={3}>
            <Card
              className="border-0 shadow mb-3"
              style={{ background: 'rgba(66, 219, 0, 0.5)' }}
            >
              <Card.Body>
                <p className="h5">Finish Batch</p>

                <p className="h2">{finishBatch}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={3}>
            <Card
              className="border-0 shadow mb-3"
              style={{ background: 'rgba(248, 0, 23, 0.7)' }}
            >
              <Card.Body>
                <p className="h5">Var Batch</p>
                <p className="h2">{varBatch}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} sm={3}>
            <Card className="border-0 shadow mb-3 bg-warning">
              <Card.Body>
                <p className="h5">Running Batch</p>
                <p className="h2">{runBatch}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <LineChart
              title={'Mixer Time Per Batch By Minute'}
              dataChart={dataChart}
              categorie={sequenBatch}
            />
          </Col>
        </Row>

        <Accordion className="shadow">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="fw-bold">Downtime List</span>
              <Badge bg="danger">{downtimeList.length}</Badge>
            </Accordion.Header>
            <Accordion.Body>
              {/* {JSON.stringify(downtimeList)} */}
              <Table size="sm" responsive hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <th>Batch Sequence</th>
                    <th>Downtime Type</th>
                    <th>Remark</th>
                    <th>Start Time</th>
                    <th>Fix Time</th>
                    <th>Fix Remark</th>
                    <th>Total Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {downtimeList.map((downtm, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{downtm.product_name}</td>
                      <td>{downtm.batch_regis_sequen}</td>
                      <td>{downtm.downtime_type}</td>
                      <td>{downtm.downtime_add_remark}</td>
                      <td>{downtm.downtime_start}</td>
                      <td>{downtm.downtime_end}</td>
                      <td>{downtm.downtime_fix_remark}</td>
                      <td>{downtm.ttime}</td>
                      <td>
                        {downtm.downtime_end !== '00:00:00' ? (
                          <FcApproval />
                        ) : (
                          <FcCancel />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Row className="my-3">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body>
                <Row className="mb-2">
                  <Col>
                    <h3>Detail Mixer Report</h3>
                  </Col>
                </Row>
                <Tabs
                  defaultActiveKey="batch"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="batch" title="Report By Batch">
                    <MixingBatchReport
                      // listProduct={listProduct}
                      batchData={paramReport}
                    />
                  </Tab>
                  <Tab eventKey="product" title="Report By Shift">
                    <MixingProdReport
                      listProduct={productListId}
                      listShift={listShift}
                      shiftId={shiftId}
                      date={date}
                      batchData={paramReport}
                      masterValue={masterValue}
                      standarForm={standarForm}
                      changeShift={changeShift}
                    />
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MixingDayReport;
