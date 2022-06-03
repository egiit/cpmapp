import React from 'react';
import { Modal, Button, Table, Row, Col } from 'react-bootstrap';
import Moment from 'react-moment';

const ModalDetailDowntime = ({
  showModal,
  closedModal,
  dataDetailDowntime,
  status,
}) => {
  return (
    <>
      <Modal show={showModal} onHide={closedModal} centered>
        <Modal.Body>
          {/* {JSON.stringify(dataDetailDowntime)} */}
          <Row>
            <Col>
              <Table size="sm" striped bordered responsive hover>
                <thead>
                  <tr className="table-secondary">
                    <th colSpan={2}>Detail Downtime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">Status</td>
                    <td>{status}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Dept Name</td>
                    <td>{dataDetailDowntime.DEP_NAME}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Product Name</td>
                    <td>{dataDetailDowntime.product_name}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Batch Seq</td>
                    <td>{dataDetailDowntime.batch_regis_sequen}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Type</td>
                    <td>{dataDetailDowntime.downtime_type}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Dept Remark</td>
                    <td>{dataDetailDowntime.downtime_add_remark}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Start Time</td>
                    <td>
                      <Moment format="YYYY/MM/DD HH:mm:ss">
                        {dataDetailDowntime.downtime_start}
                      </Moment>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Fix Time</td>
                    <td>
                      {dataDetailDowntime.downtime_end ? (
                        <Moment format="YYYY/MM/DD HH:mm:ss">
                          {dataDetailDowntime.downtime_end}
                        </Moment>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Fix Remark</td>
                    <td>{dataDetailDowntime.downtime_fix_remark}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">T.Time Downtime</td>
                    <td>{dataDetailDowntime.ttime}</td>
                  </tr>
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
};

export default ModalDetailDowntime;
