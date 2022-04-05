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
} from 'react-bootstrap';
// import Chart from 'react-apexcharts';
// import ChartDashboard from '../compdashboard/ChartDashboard';
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

  // const filterFunc = () => {
  //   getProductChart();
  //   getSequenBatch();
  // };

  useEffect(() => {
    // setDate();

    getSequenBatch(date, shiftId, productId);
    getProductChart(date, shiftId, productId);
    getparamReport(date, shiftId, productId);
    getMixMasterVal(date);
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
            {/* {JSON.stringify(listProduct)} */}
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
          <Col>
            <LineChart
              title={'Mixer Time Per Batch By Minute'}
              dataChart={dataChart}
              categorie={sequenBatch}
            />
          </Col>
        </Row>

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
