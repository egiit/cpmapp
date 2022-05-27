import React, { useContext } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';
import CheckNilai from '../utilis/CheckNilai';

const DetailRejectBatch = () => {
  const { state } = useContext(DashboardContex);

  return (
    <>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table size="sm" bordered responsive hover>
              <thead className="align-middle text-center">
                <tr className="table-secondary">
                  <th colSpan={4}>Table Report Total Reject Keping</th>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Product Name</td>
                  <td>Type</td>
                  <td className="text-end">Reject(KG)</td>
                </tr>
              </thead>
              <tbody>
                {state.datTotalReject.dataKeping.map((dough, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{dough.product_name}</td>
                    <td>{dough.prod_reject_flag}</td>
                    <td className="text-end">{dough.prod_reject_qty}</td>
                  </tr>
                ))}
                <tr className="align-middle text-end  fw-bold">
                  <td className="align-middle text-center" colSpan={3}>
                    Total
                  </td>
                  <td>
                    {state.datTotalReject.dataKeping
                      .map((item) => item.prod_reject_qty)
                      .reduce((prev, curr) => prev + curr, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col>
          <div className="table-responsive">
            <Table size="sm" bordered responsive hover>
              <thead className="align-middle text-center">
                <tr className="table-warning">
                  <th colSpan={3}>Table Report Total Reject Dough</th>
                </tr>
                <tr>
                  <td>#</td>
                  <td>Product Name</td>
                  <td>Reject(KG)</td>
                </tr>
              </thead>
              <tbody>
                {state.datTotalReject.dataDough.map((dough, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{dough.product_name}</td>
                    <td className="text-end">{dough.batch_comp_valuea}</td>
                  </tr>
                ))}
                <tr className="align-middle text-end fw-bold">
                  <td className="align-middle text-center" colSpan={2}>
                    Total
                  </td>
                  <td>
                    {state.datTotalReject.dataDough
                      .map((item) => item.batch_comp_valuea)
                      .reduce((prev, curr) => prev + curr, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="table-responsive">
            <Table size="sm" bordered responsive hover>
              <thead className="align-middle text-center">
                <tr className="table-info">
                  <th colSpan={7}>Table Report Reject Dough Per Batch</th>
                </tr>
                <tr>
                  <th rowSpan={2}>Batch</th>
                  <th rowSpan={2}>Product</th>
                  <th colSpan={3}>Reject Dough</th>
                </tr>
                <tr>
                  <th>Mixer</th>
                  <th>Forming</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {state.dataRejectPerBatch.map((batch, i) => (
                  <tr key={i} className="text-end align-middle">
                    <td>{i + 1}</td>
                    <td className="text-start">{batch.product_name}</td>
                    <td>{CheckNilai(parseFloat(batch.reject_dough_mixer))}</td>
                    <td>
                      {CheckNilai(parseFloat(batch.reject_dough_forming))}
                    </td>
                    <td>
                      {CheckNilai(parseFloat(batch.reject_dough_mixer)) +
                        CheckNilai(parseFloat(batch.reject_dough_forming))}
                    </td>
                  </tr>
                ))}

                <tr className="align-middle text-end  fw-bold">
                  <td className="align-middle text-center" colSpan={2}>
                    Total
                  </td>
                  <td>
                    {state.dataRejectPerBatch
                      .map((item) =>
                        CheckNilai(parseFloat(item.reject_dough_mixer))
                      )
                      .reduce((prev, curr) => prev + curr, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {state.dataRejectPerBatch
                      .map((item) =>
                        CheckNilai(parseFloat(item.reject_dough_forming))
                      )
                      .reduce((prev, curr) => prev + curr, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    {state.dataRejectPerBatch
                      .map(
                        (item) =>
                          CheckNilai(parseFloat(item.reject_dough_mixer)) +
                          CheckNilai(parseFloat(item.reject_dough_forming))
                      )
                      .reduce((prev, curr) => prev + curr, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailRejectBatch;
