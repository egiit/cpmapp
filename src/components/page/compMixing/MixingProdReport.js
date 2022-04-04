import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { jsPDF } from 'jspdf';
import {
  ButtonGroup,
  ToggleButton,
  Row,
  Col,
  Table,
  Card,
} from 'react-bootstrap';

const MixingProdReport = ({
  listProduct,
  batchData,
  changeShift,
  date,
  masterValue,
  standarForm,
}) => {
  // const [checked, setChecked] = useState(false);
  // const [productId, setProductId] = useState('');
  const [shiftId, setShiftId] = useState('');
  const [dataHeader, setDataHeader] = useState([]);
  const [defaulDataHeader, setDefaulDataHeader] = useState([]);

  useEffect(() => {
    setShiftId('');
    getHeaderList();
  }, [date]);

  const getHeaderList = async () => {
    try {
      axios.get(`/header/report/${date}`).then((response) => {
        // console.log(response.data);
        setDataHeader(response.data);
        setDefaulDataHeader(response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // const changeProduct = (e) => {
  //   const { value } = e.target;
  //   setProductId(parseInt(value));
  //   console.log(productId);
  // };

  const changeShiftRep = (e) => {
    changeShift(e);
    const { value } = e.target;
    setShiftId(parseInt(value));

    if (value !== '') {
      const fltrHead = defaulDataHeader.filter(
        (header) => header.header_shift === parseInt(value)
      );

      setDataHeader(fltrHead);
    } else {
      setDataHeader(defaulDataHeader);
    }
  };

  // const createPDF = async () => {
  //   const pdf = new jsPDF('portrait', 'pt', 'a4');
  //   const data = await document.querySelector('#pdf');
  //   pdf.html(data).then(() => {
  //     pdf.save('shipping_label.pdf');
  //   });
  // };

  return (
    <>
      {/* {JSON.stringify(listProduct)} */}
      {/* {JSON.stringify(dataHeader)} */}
      {/* {listProduct[0].id} */}

      <Row className="my-3">
        <Col>
          <ButtonGroup>
            <ToggleButton
              size="sm"
              // key={idx}
              id="all"
              type="radio"
              variant={'outline-primary'}
              name="radio"
              value=""
              checked={shiftId === ''}
              onChange={changeShiftRep}
            >
              ALL
            </ToggleButton>
            {defaulDataHeader.map((shiftL, idx) => (
              <ToggleButton
                size="sm"
                key={idx}
                id={shiftL.header_shift}
                type="radio"
                variant={'outline-primary'}
                name="radio"
                value={shiftL.header_shift}
                checked={shiftId === shiftL.header_shift}
                onChange={changeShiftRep}
              >
                Shift {shiftL.header_shift}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row>

      {dataHeader.map((header, i) => (
        <div key={i} className="mb-3">
          <Card>
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
              <Row className="mb-3">
                <Col>
                  <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-success btn-sm"
                    table={`table-to-xls${header.header_id}`}
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export To Excel"
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  {listProduct
                    .filter(
                      (prd) =>
                        parseInt(prd.mixer_proc_chek_shift) ===
                        header.header_shift
                    )
                    .map((product, idx) => (
                      <div key={idx}>
                        <div>
                          <Table
                            id={`table-to-xls${header.header_id}`}
                            size="sm"
                            striped
                            bordered
                            responsive
                            hover
                          >
                            <thead>
                              <tr>
                                <th
                                  className="table-primary text-center"
                                  colSpan={
                                    batchData.filter(
                                      (fltrB) =>
                                        parseInt(
                                          fltrB.mixer_proc_chek_shift
                                        ) === header.header_shift &&
                                        product.id === fltrB.product_id
                                    ).length + 2
                                  }
                                >
                                  {product.name}
                                </th>
                              </tr>
                              <tr>
                                <th rowSpan={2}>#</th>
                                <th rowSpan={2}>Parameter</th>
                                <th
                                  className="text-center"
                                  colSpan={
                                    batchData.filter(
                                      (fltrB) =>
                                        parseInt(
                                          fltrB.mixer_proc_chek_shift
                                        ) === header.header_shift &&
                                        product.id === fltrB.product_id
                                    ).length
                                  }
                                >
                                  Batch
                                </th>
                              </tr>
                              <tr>
                                {batchData
                                  .filter(
                                    (fltrB) =>
                                      parseInt(fltrB.mixer_proc_chek_shift) ===
                                        header.header_shift &&
                                      product.id === fltrB.product_id
                                  )
                                  .map((batch, ib) => (
                                    <th className="text-center" key={ib}>
                                      {ib + 1}
                                    </th>
                                  ))}
                              </tr>
                            </thead>
                            <tbody>
                              {standarForm
                                .filter(
                                  (frmStd) =>
                                    frmStd.standar_form_section !== 'remark'
                                )
                                .map((stdForm, indx) => (
                                  <tr key={indx}>
                                    <td>{indx + 1}</td>
                                    <td>{stdForm.standar_form_param}</td>
                                    {batchData
                                      .filter(
                                        (fltrB) =>
                                          parseInt(
                                            fltrB.mixer_proc_chek_shift
                                          ) === header.header_shift &&
                                          product.id === fltrB.product_id
                                      )
                                      .map((batch, ib) => (
                                        <td className="text-center" key={ib}>
                                          {masterValue
                                            .filter(
                                              (valBatch) =>
                                                valBatch.batch_regis_id ===
                                                  batch.batch_regis_id &&
                                                stdForm.standar_form_id ===
                                                  valBatch.standar_form_id
                                            )
                                            .map((val, iv) => (
                                              <div key={iv}>
                                                {val.standar_form_value}
                                              </div>
                                            ))}
                                        </td>
                                      ))}
                                  </tr>
                                ))}
                              {standarForm
                                .filter(
                                  (frmStd) =>
                                    frmStd.standar_form_section === 'remark'
                                )
                                .map((stdForm, indx) => (
                                  <tr key={indx}>
                                    <th colSpan={2}>
                                      {stdForm.standar_form_param}
                                    </th>
                                    <td
                                      colSpan={
                                        batchData.filter(
                                          (fltrB) =>
                                            parseInt(
                                              fltrB.mixer_proc_chek_shift
                                            ) === header.header_shift &&
                                            product.id === fltrB.product_id
                                        ).length
                                      }
                                    >
                                      {batchData
                                        .filter(
                                          (fltrB) =>
                                            parseInt(
                                              fltrB.mixer_proc_chek_shift
                                            ) === header.header_shift &&
                                            product.id === fltrB.product_id
                                        )
                                        .map((batch, ib) => (
                                          <div key={ib}>
                                            {masterValue
                                              .filter(
                                                (valBatch) =>
                                                  valBatch.batch_regis_id ===
                                                    batch.batch_regis_id &&
                                                  valBatch.standar_form_section ===
                                                    'remark'
                                              )
                                              .map((val, iv) => (
                                                <div key={iv}>
                                                  {val.standar_form_value}
                                                </div>
                                              ))}
                                          </div>
                                        ))}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
};

export default MixingProdReport;
