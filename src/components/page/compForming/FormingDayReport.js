import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import GetDate from '../utilis/GetDate';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Table,
  Breadcrumb,
} from 'react-bootstrap';
// import { FormingContex } from '../provider/Forming.provider';

const FormingDayReport = () => {
  // const { prodForming } = useContext(FormingContex);
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
    getRepProdCheck();
  }, [date]);

  const getHeadersForm = async () => {
    axios
      .get(`/header/report/${date}/3`)
      .then((response) => {
        setHeaderList(response.data);
        setlistSelectShift(response.data);
      })
      .catch((error) => console.log(error));
  };

  // function get API Report List Product berdasarkan Shift
  const getRepProductList = async () => {
    axios
      .get(`/forming/report/product/${date}`)
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
      .catch((error) => console.log(error));
  };

  const getRepBatchList = async () => {
    axios
      .get(`/forming/report/batch/${date}`)
      .then((response) => setBatchList(response.data))
      .catch((error) => console.log(error));
  };

  const getRepStandarForm = async () => {
    axios
      .get('/getform/FORMING')
      .then((response) => {
        setStandarForm(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getRepBatchValue = async () => {
    axios
      .get(`/forming/report/batch-value/${date}`)
      .then((response) => {
        // console.log(response.data);
        setBatchValue(response.data);
      })
      .catch((error) => console.log(error));
  };

  const getRepProdCheck = async () => {
    await axios
      .get(`/forming/report/product-value/${date}`)
      .then((response) => {
        // console.log(response.data);
        setProCheckList(response.data);
      })
      .catch((error) => console.log(error));
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

    // console.log(filterProduct);

    setRepProduct(filterProduct);
  };

  const filterHeader = () => {
    if (shiftId === '') {
      return setHeaderList(listSelectShift);
    }

    const fltrHead = listSelectShift.filter(
      (header) => header.header_shift === parseInt(shiftId)
    );

    // console.log('filterHeader:', fltrHead);
    setHeaderList(fltrHead);
  };

  return (
    <div>
      <Container fluid className="px-4 mt-4">
        <div className="ms-2">
          <h2 className="">Forming</h2>
          <Breadcrumb>
            <Breadcrumb.Item href="" active>
              Forming Daily Reports
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Card className="border-0 shadow mb-3">
          <Card.Body>
            {/* {JSON.stringify(repProduct)} */}
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
                        <Table size="sm" striped bordered responsive hover>
                          <thead>
                            <tr className="table-primary">
                              <th
                                className="text-center"
                                colSpan={
                                  batchList.filter(
                                    (y) => y.product_id === product.product_id
                                  ).length + 1
                                }
                              >
                                {product.product_name}
                              </th>
                            </tr>
                            <tr>
                              <th rowSpan={2}>Parameter</th>
                              <th
                                className="text-center"
                                colSpan={
                                  batchList.filter(
                                    (y) => y.product_id === product.product_id
                                  ).length
                                }
                              >
                                Batch
                              </th>
                            </tr>
                            <tr>
                              {batchList
                                .filter(
                                  (y) => y.product_id === product.product_id
                                )
                                .map((batch, idx) => (
                                  <th className="text-center" key={idx}>
                                    {idx + 1}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {standarForm.map((std, ixd) => (
                              <tr key={ixd}>
                                <td>{std.standar_form_param}</td>
                                {batchList
                                  .filter(
                                    (y) => y.product_id === product.product_id
                                  )
                                  .map((batch, idx) => (
                                    <td className="text-center" key={idx}>
                                      {batchValue
                                        .filter(
                                          (btchVal) =>
                                            btchVal.header_id ===
                                              header.header_id &&
                                            btchVal.batch_regis_id ===
                                              batch.batch_regis_id &&
                                            btchVal.standar_form_id ===
                                              std.standar_form_id
                                        )
                                        .map((val, ix) => (
                                          <div key={ix}>
                                            {val.standar_form_value}
                                          </div>
                                        ))}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                        <Table size="sm" striped bordered responsive>
                          <thead>
                            <tr className="text-center table-dark">
                              <th colSpan={3}>Opeartional</th>
                              <th colSpan={3}>Plan Downtime</th>
                              <th colSpan={3}>Reject</th>
                              <th>Breakdown</th>
                              <th>Remark</th>
                            </tr>
                            <tr className="text-center">
                              <th>Start</th>
                              <th>Stop</th>
                              <th>T.Time(Jam:Mnt)</th>
                              <th>Cleaning (mnt)</th>
                              <th>Setting (mnt)</th>
                              <th>T.Downtime (mnt)</th>
                              <th>Mesin (kg)</th>
                              <th>Sampah/Lantai (kg)</th>
                              <th>T.Reject (kg)</th>
                              <th>Effective</th>
                              <th>Remark</th>
                            </tr>
                          </thead>
                          <tbody>
                            {proCheckList
                              .filter(
                                (fProd) =>
                                  fProd.header_id === header.header_id &&
                                  fProd.product_id === product.product_id
                              )
                              .map((prodChe, ilx) => (
                                <tr className="text-center" key={ilx}>
                                  <td>{prodChe.forming_prod_start}</td>
                                  <td>{prodChe.forming_prod_stop}</td>
                                  <td>{prodChe.forming_prod_ttime}</td>
                                  <td>{prodChe.forming_prod_cleaning}</td>
                                  <td>{prodChe.forming_prod_setting}</td>
                                  <td>{prodChe.forming_prod_tdown}</td>
                                  <td>{prodChe.forming_prod_reject_mesin}</td>
                                  <td>{prodChe.forming_prod_reject_lantai}</td>
                                  <td>{prodChe.forming_prod_reject_tot}</td>
                                  <td>{prodChe.effective}</td>
                                  <td>{prodChe.forming_prod_remark}</td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
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

export default FormingDayReport;
