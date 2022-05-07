import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import GetDate from '../utilis/GetDate';
import { flash } from 'react-universal-flash';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Breadcrumb,
} from 'react-bootstrap';

const OvenDayReport = () => {
  const [date, setDate] = useState(GetDate());
  const [repProduct, setRepProduct] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [headerList, setHeaderList] = useState([]);
  const [standarForm, setStandarForm] = useState([]);
  const [batchValue, setBatchValue] = useState([]);
  const [proCheckList, setProCheckList] = useState([]);

  const [baseProdForFilter, setbaseProdForFilter] = useState([]);
  const [productId, setProductId] = useState('');
  const [shiftId, setshiftId] = useState('');
  const [listSelectShift, setlistSelectShift] = useState([]);
  const [listSelectProduct, setlistSelectProduct] = useState([]);

  useEffect(() => {
    getRepProductList();
    getHeadersForm();
    getRepBatchList();
    getRepStandarForm();
    getRepBatchValue();
    getRepProdInfo();
    // getRepProdCheck();
  }, [date]);

  const getHeadersForm = async () => {
    axios
      .get(`/header/report/${date}/2`)
      .then((response) => {
        setHeaderList(response.data);
        setlistSelectShift(response.data);
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  // function get API Report List Product berdasarkan Shift
  const getRepProductList = async () => {
    axios
      .get(`/oven/report/product/${date}`)
      .then((response) => {
        const valueProduct = [
          ...new Map(
            response.data.map((item) => [item['product_id'], item])
          ).values(), //disitng product
        ];
        setRepProduct(response.data);
        setbaseProdForFilter(response.data);
        setlistSelectProduct(valueProduct);
      })
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //Ambil Product info Operational
  const getRepProdInfo = async () => {
    axios
      .get(`oven//report/product-info/${date}`)
      .then((response) => setProCheckList(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //Ambil List Batch
  const getRepBatchList = async () => {
    axios
      .get(`/oven/report/batch-list/${date}`)
      .then((response) => setBatchList(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //untuk get standarForm oven
  const getRepStandarForm = async () => {
    axios
      .get('/getform/OVEN')
      .then((response) => {
        setStandarForm(response.data);
      })
      .catch((error) => console.log(error));
  };

  //untuk get form with value
  const getRepBatchValue = async () => {
    await axios
      .get(`/oven/report/batch/form/${date}`)
      .then((response) => setBatchValue(response.data))
      .catch((error) => flash(error.message, 5000, 'danger'));
  };

  //handle Filter Date
  const changeDate = (e) => {
    const { value } = e.target;
    setDate(value);
  };

  //handle Filter Shift
  const changeShift = (e) => {
    const { value } = e.target;
    setshiftId(value);
  };

  //handle Filter Shift
  const changeProduct = (e) => {
    const { value } = e.target;
    setProductId(value);
  };

  useEffect(() => {
    filterHeader();
    handleAllFilter();
  }, [productId, shiftId]);

  const handleAllFilter = () => {
    if (shiftId === '' && productId === '') {
      return setRepProduct(baseProdForFilter);
    }

    const filterProduct = baseProdForFilter.filter((product) => {
      if (shiftId !== '' && productId !== '') {
        return (
          product.product_id === parseInt(productId) &&
          product.header_shift === parseInt(shiftId)
        );
      }
      if (shiftId !== '' && productId === '') {
        return product.header_shift === parseInt(shiftId);
      }
      if (shiftId === '' && productId !== '') {
        return product.product_id === parseInt(productId);
      }

      return true;
    });

    setRepProduct(filterProduct);
  };

  const filterHeader = () => {
    if (shiftId === '') {
      return setHeaderList(listSelectShift);
    }

    const fltrHead = listSelectShift.filter(
      (header) => header.header_shift === parseInt(shiftId)
    );

    setHeaderList(fltrHead);
  };

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Oven</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Oven Daily Reports
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="border-0 shadow mb-3">
          <Card.Body>
            {/* {JSON.stringify(proCheckList)} */}
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
                  {listSelectShift.map((shif, index) =>
                    shif.header_shift !== null ? (
                      <option key={index} value={shif.header_shift}>
                        shift {shif.header_shift}
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
                  {listSelectProduct.map((idPord, index) => (
                    <option key={index} value={idPord.product_id}>
                      {idPord.product_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {headerList.map((header, index) => (
          <Row className="mb-3" key={index}>
            <Col>
              <Card className="border-0 shadow">
                <Card.Body>
                  <Row>
                    <Col>
                      <Table
                        // id={`table-to-xls${header.header_id}`}
                        striped
                        bordered
                        responsive
                      >
                        <tbody>
                          <tr key="1">
                            <th>Tanggal</th>
                            <td>{header.header_prod_date}</td>
                            <th>Operator</th>
                            <td>{header.header_operator}</td>
                          </tr>
                          <tr key="2">
                            <th>Shift</th>
                            <td>{header.header_shift}</td>
                            <th>Leader</th>
                            <td>{header.header_leader}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                  {repProduct
                    .filter((pro) => pro.header_shift === header.header_shift)
                    .map((product, i) => (
                      <div key={i} className="mb-4 border-bottom border-2">
                        <Table size="sm" striped bordered responsive>
                          <thead>
                            <tr className="table-dark">
                              <th colSpan={standarForm.length + 1}>
                                {product.product_name}
                              </th>
                            </tr>
                            <tr className="table-center align-middle">
                              <th rowSpan={2}>Batch</th>
                              {standarForm
                                .filter(
                                  (title) => title.standar_form_parent === null
                                )
                                .map((form, idnx) => (
                                  <th
                                    className="text-center align-middle"
                                    key={idnx}
                                    rowSpan={
                                      form.standar_form_tipe !== 'sparator'
                                        ? 2
                                        : ''
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
                            <tr className="text-center">
                              {standarForm
                                .filter(
                                  (title, ix) =>
                                    title.standar_form_parent !== null
                                )
                                .map((form, idnx) => (
                                  <th key={idnx}>{form.standar_form_param}</th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {batchList
                              .filter(
                                (btchProd) =>
                                  btchProd.product_id === product.product_id &&
                                  btchProd.header_id === header.header_id
                              )
                              .map((batch, i) => (
                                <tr key={i} className="text-center">
                                  <td>{i + 1}</td>
                                  {standarForm
                                    .filter(
                                      (title, ix) =>
                                        title.standar_form_unit === null
                                    )
                                    .map((form, idnx) => (
                                      <td key={idnx}>
                                        {batchValue
                                          .filter(
                                            (formVal) =>
                                              formVal.batch_regis_id ===
                                                batch.batch_regis_id &&
                                              form.standar_form_id ===
                                                formVal.standar_form_id
                                          )
                                          .map((val, yndex) => (
                                            <div key={yndex}>
                                              {val.standar_form_value}
                                              {val.standar_form_initials}
                                            </div>
                                          ))}
                                      </td>
                                    ))}
                                </tr>
                              ))}
                          </tbody>
                        </Table>

                        <Row>
                          <Col sm={6}>
                            <Table size="sm" bordered responsive hover>
                              <thead>
                                <tr className="table-info text-center">
                                  <th colSpan={2}>Operational</th>
                                  <th>Remark</th>
                                </tr>
                              </thead>
                              {proCheckList
                                .filter(
                                  (proinfo) =>
                                    proinfo.header_id === header.header_id &&
                                    proinfo.product_id === product.product_id
                                )
                                .map((productInfo, index) => (
                                  <tbody key={index}>
                                    <tr>
                                      <td>Start</td>
                                      <td className="text-center">
                                        {productInfo.oven_prod_start}
                                      </td>
                                      <td className="text-start" rowSpan={5}>
                                        {productInfo.oven_prod_remark}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Set Temp</td>
                                      <td className="text-center">
                                        {productInfo.oven_prod_temp}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>End</td>
                                      <td className="text-center">
                                        {productInfo.oven_prod_stop}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>Total Warm Time</th>
                                      <th className="text-center">
                                        {productInfo.oven_prod_warm_time}
                                      </th>
                                    </tr>
                                    <tr>
                                      <th>Total Opt Time</th>
                                      <th className="text-center">
                                        {productInfo.oven_prod_ttime}
                                      </th>
                                    </tr>
                                  </tbody>
                                ))}
                            </Table>
                          </Col>
                        </Row>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default OvenDayReport;
