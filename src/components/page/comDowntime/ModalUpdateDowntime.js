import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import axios from '../../axios/axios';
import Moment from 'react-moment';
import moment from 'moment';
import { flash } from 'react-universal-flash';

const ModalUpdateDowntime = ({
  showModal,
  closedModal,
  getDowntime,
  userId,

  dataUpdate,
  startChecked,
  endChecked,
}) => {
  const [fixremarkDown, setfixremarkDown] = useState('');
  const [startHandle, setstartHandle] = useState(null);
  const [clearDowntime, setclearDowntime] = useState(null);
  //   const [messageState, setMessageSate] = useState('');
  const [validated, setValidated] = useState(false);

  // function get input menggunakan switch case
  const handleInput = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'handle':
        if (!checked) {
          setstartHandle('');
          break;
        }
        const timeHandle = moment().format('YYYY/MM/DD hh:mm:ss');
        setstartHandle(timeHandle);
        break;
      case 'clear':
        if (!checked) {
          setclearDowntime('');
          break;
        }
        const timeClear = moment().format('YYYY/MM/DD hh:mm:ss');
        setclearDowntime(timeClear);
        break;
      case 'remark':
        setfixremarkDown(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();

      const dataDowntime = {
        downtime_id: dataUpdate.downtime_id,
        downtime_repair: startHandle,
        downtime_end: clearDowntime,
        downtime_fix_remark: fixremarkDown,
        downtime_mod_id: userId,
      };

      await axios
        .post('/downtime', dataDowntime)
        .then((response) => flash(response.data.message, 5000, 'success'))
        .catch((error) => {
          flash(error.message, 5000, 'danger');
        });
      getDowntime();
      closedModal();
    }
  };

  useEffect(() => {
    console.log(startChecked);
    console.log(endChecked);
    setfixremarkDown(dataUpdate.downtime_fix_remark);
    if (dataUpdate.downtime_repair) {
      setstartHandle(
        moment(dataUpdate.downtime_repair).format('YYYY/MM/DD hh:mm:ss')
      );
    }
    if (dataUpdate.downtime_end) {
      setclearDowntime(
        moment(dataUpdate.downtime_end).format('YYYY/MM/DD hh:mm:ss')
      );
    }
  }, []);

  return (
    <div>
      <Modal size="xl" show={showModal} onHide={closedModal} centered>
        {/* {JSON.stringify(dataUpdate)} */}
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Downtime Form Handle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Table size="sm" striped bordered responsive hover>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Dept Name</td>
                      <td>{dataUpdate.DEP_NAME}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Product Name</td>
                      <td>{dataUpdate.product_name}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Batch Seq</td>
                      <td>{dataUpdate.batch_regis_sequen}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Type</td>
                      <td>{dataUpdate.downtime_type}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Dept Remark</td>
                      <td>{dataUpdate.downtime_add_remark}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Start Time</td>
                      <td>
                        <Moment format="YYYY/MM/DD hh:mm:ss">
                          {dataUpdate.downtime_start}
                        </Moment>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col>
                <Table size="sm" striped bordered responsive hover>
                  <tbody>
                    <tr>
                      <td className="fw-bold">Dept Name</td>
                      <td>Mechanic</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Start Handle</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            onChange={handleInput}
                            defaultChecked={startChecked}
                            className="form-check-input"
                            aria-checked
                            name="handle"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            required
                          ></input>
                          <label className="form-check-label">
                            {startHandle}
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Fix Remark</td>
                      <td>
                        <Form.Control
                          as="textarea"
                          style={{ height: '100px' }}
                          onChange={handleInput}
                          defaultValue={fixremarkDown}
                          name="remark"
                          required
                          placeholder="Keterangan"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Downtime Clear</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            onChange={handleInput}
                            defaultChecked={endChecked}
                            name="clear"
                            className="form-check-input"
                            aria-checked
                            type="checkbox"
                            role="switch"
                            id="clearCheck"
                          ></input>
                          <label className="form-check-label">
                            {clearDowntime}
                          </label>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Handle T.Time</td>
                      <td>
                        {clearDowntime !== null ? (
                          <Moment duration={startHandle} date={clearDowntime} />
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Total Time</td>
                      <td>
                        {clearDowntime !== null ? (
                          <Moment
                            duration={dataUpdate.downtime_start}
                            date={clearDowntime}
                          />
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={closedModal}>
              Cancel
            </Button>
            <Button size="sm" variant="success" type="submit">
              save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdateDowntime;
