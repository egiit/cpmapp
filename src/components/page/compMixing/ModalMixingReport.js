import React from 'react';
import { Modal, Button, Table, Row, Col } from 'react-bootstrap';

function ModalMixingReport({
  dataBatch,
  showModal,
  closedModal,
  prodName,
  batchNo,

  prossestime1,
  prossestime2,
  prossestime3,
}) {
  return (
    <>
      <Modal
        show={showModal}
        onHide={closedModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>
            {prodName} - Batch {batchNo}
          </h4>
          {/* {JSON.stringify(prossestime1)} */}
          <Row>
            <Col>
              <Table size="sm" bordered responsive hover>
                <thead>
                  <tr className="table-dark">
                    <th colSpan={3}>Persiapan & Mulai Mixing</th>
                  </tr>
                  <tr className="table-secondary">
                    {/* <th>#</th> */}
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dataBatch
                    .filter((pre) => pre.standar_form_section === 'pre')
                    .map((batch, index) => (
                      <tr key={index}>
                        {/* <td>{index + 1}</td> */}
                        <td>{batch.standar_form_param}</td>
                        <td>{batch.standar_form_value}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table size="sm" bordered responsive hover>
                <thead>
                  <tr className="table-dark">
                    <th colSpan={3}>Proccess Mixing</th>
                  </tr>
                  <tr className="table-secondary">
                    {/* <th>#</th> */}
                    <th>Start</th>
                    <th>Finish</th>
                    <th>Ttime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="table-warning fw-bold">
                    <td colSpan={3}>Tahap 1</td>
                  </tr>
                  {prossestime1.map((batch, index) => (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}
                      <td>{batch.mulai}</td>
                      <td>{batch.selesai}</td>
                      <td className="fw-bold">{batch.ttime_proc}</td>
                    </tr>
                  ))}
                  <tr className="table-warning fw-bold">
                    <td colSpan={3}>Tahap 2</td>
                  </tr>
                  {prossestime2.map((batch, index) => (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}
                      <td>{batch.mulai}</td>
                      <td>{batch.selesai}</td>
                      <td className="fw-bold">{batch.ttime_proc}</td>
                    </tr>
                  ))}
                  <tr className="table-warning fw-bold">
                    <td colSpan={3}>Tahap 3</td>
                  </tr>
                  {prossestime3.map((batch, index) => (
                    <tr key={index}>
                      {/* <td>{index + 1}</td> */}
                      <td>{batch.mulai}</td>
                      <td>{batch.selesai}</td>
                      <td className="fw-bold">{batch.ttime_proc}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table size="sm" bordered responsive hover>
                <thead>
                  <tr>
                    <th colSpan={3} className="table-dark ">
                      Input Tambahan
                    </th>
                  </tr>
                  <tr className="table-secondary fw-bold">
                    {/* <th>#</th> */}
                    <th>Parameter</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dataBatch
                    .filter((pre) => pre.standar_form_section === 'after')
                    .map((batch, index) => (
                      <tr key={index}>
                        {/* <td>{index + 1}</td> */}
                        <td>{batch.standar_form_param}</td>
                        <td>{batch.standar_form_value}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={closedModal}>
            Closed
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMixingReport;
