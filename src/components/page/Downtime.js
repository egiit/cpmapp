import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';

import {
  Container,
  Card,
  Table,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import GetDate from './utilis/GetDate';
import axios from '../axios/axios';
import {
  FcApproval,
  FcCancel,
  FcViewDetails,
  FcSupport,
  FcAddRow,
} from 'react-icons/fc';
import { AiFillEdit } from 'react-icons/ai';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import ModalDetailDowntime from './comDowntime/ModalDetailDowntime';
import Moment from 'react-moment';
import ModalAddDowntime from './comDowntime/ModalAddDowntime';
import ModalEditDowntime from './comDowntime/ModalEditDowntime';
import ModalUpdateDowntime from './comDowntime/ModalUpdateDowntime';
import { Link } from 'react-router-dom';

const Downtime = () => {
  const { value } = useContext(AuthContext);
  const { userId, userLevel, userDept } = value;
  const [deptName, setdeptName] = useState('');

  const [downtimeList, setDowntimeList] = useState([]);
  const [date, setDate] = useState(GetDate());
  const [status, setStatus] = useState('');
  const [mixerData, setmixerData] = useState([]);
  const [batchData, setbatchData] = useState([]);

  const [dataDetail, setDataDetail] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [startChecked, setstartChecked] = useState(false);
  const [endChecked, setendChecked] = useState(false);

  const getDowntimeList = async () => {
    await axios
      .get(`/downtime/list/${date}%25`)
      .then((response) => setDowntimeList(response.data))
      .catch((error) => console.log(error.message));
  };

  const getProductMixer = async () => {
    await axios
      .get(`/mixer/product/${date}`)
      .then((response) => {
        // console.log(response);
        setmixerData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Produk Mixer', error);
      });
  };

  const getBatchMixer = async () => {
    await axios
      .get(`/mixer/batch/${date}`)
      .then((response) => {
        // console.log(response);
        setbatchData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Batch Mixer', error);
      });
  };

  const getDept = async () => {
    await axios
      .get(`/dept/${userDept}`)
      .then((response) => {
        setdeptName(response.data.DEP_NAME);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDowntimeList();
    getProductMixer();
    getBatchMixer();
    getDept();
  }, [date]);

  const changeDate = (e) => {
    const { value } = e.target;
    setDate(value);
  };

  const checkStatus = (end, repair) => {
    if (end === null && repair === null) {
      return setStatus('Still Not Fixed');
    }
    if (end === null && repair !== null) {
      return setStatus('Under Reapair');
    }
    if (end !== null) {
      return setStatus('Already Fixed');
    }
  };

  const handleDetail = (data) => {
    checkStatus(data.downtime_end, data.downtime_repair);
    setDataDetail(data);
    setShowModalDetail(true);
  };

  const handleEdit = (data) => {
    setDataEdit(data);
    setShowModalEdit(true);
  };

  const handleUpdate = (data) => {
    if (data.downtime_repair) {
      setstartChecked(true);
    }
    if (data.downtime_end) {
      setendChecked(true);
    }
    setDataUpdate(data);
    setShowModalUpdate(true);
  };

  return (
    <>
      <Container fluid className="px-4 mt-4">
        <div>
          <h2 className="">Downtime List</h2>
          {userLevel === 'ADM' ? (
            <Link style={{ textDecoration: 'none' }} to={`/${deptName}`}>
              <h5>
                <IoArrowBackCircleOutline /> Back
              </h5>
            </Link>
          ) : (
            ''
          )}
        </div>

        <Card className="border-0 shadow mb-3">
          <Card.Body>
            {/* {JSON.stringify(value)} */}
            <Row className=" justify-content-between">
              <Col className="mb-1" md={3}>
                <Form.Control
                  size="sm"
                  defaultValue={date}
                  onChange={changeDate}
                  type="date"
                />
              </Col>
              <Col className="mb-1 text-end" md={3}>
                {userLevel === 'ADM' || userLevel === 'admin' ? (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setShowModalAdd(true)}
                  >
                    Add Downtime
                    <FcAddRow size={22} />
                  </Button>
                ) : (
                  ''
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="border-0 shadow">
          <Card.Body>
            <Table size="sm" responsive hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Dept Name</th>
                  {/* <th>Product Name</th>
                  <th>Batch</th> */}
                  <th>Downtime Type</th>
                  {/* <th>Remark</th> */}
                  <th>Start Time</th>
                  <th>Fix Time</th>
                  {/* <th>Fix Remark</th> */}
                  <th>Total Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {downtimeList.map((downtm, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{downtm.DEP_NAME}</td>
                    {/* <td>{downtm.product_name}</td>
                    <td>{downtm.batch_regis_sequen}</td> */}
                    <td>{downtm.downtime_type}</td>
                    {/* <td>{downtm.downtime_add_remark}</td> */}
                    <td>
                      <Moment format="YYYY/MM/DD hh:mm:ss">
                        {downtm.downtime_start}
                      </Moment>
                    </td>
                    <td>
                      {downtm.downtime_end ? (
                        <Moment format="YYYY/MM/DD hh:mm:ss">
                          {downtm.downtime_end}
                        </Moment>
                      ) : (
                        ''
                      )}
                    </td>
                    {/* <td>{downtm.downtime_fix_remark}</td> */}
                    <td>{downtm.ttime}</td>
                    <td>
                      {downtm.downtime_end !== null ? (
                        <FcApproval />
                      ) : (
                        <FcCancel />
                      )}
                      {downtm.downtime_repair !== null &&
                      downtm.downtime_end === null ? (
                        <FcSupport />
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      <Button
                        className="shadow me-1"
                        size="sm"
                        variant="primary"
                        onClick={() => handleDetail(downtm)}
                      >
                        <FcViewDetails size={17} />
                      </Button>
                      {downtm.downtime_add_id === userId ||
                      userLevel === 'admin' ? (
                        <Button
                          className="shadow me-1"
                          size="sm"
                          variant="warning"
                          onClick={() => handleEdit(downtm)}
                        >
                          <AiFillEdit size={17} />
                        </Button>
                      ) : (
                        ''
                      )}
                      {userDept === 9 || userLevel === 'admin' ? (
                        <Button
                          className="shadow me-1"
                          size="sm"
                          variant="light"
                          onClick={() => handleUpdate(downtm)}
                        >
                          <FcSupport size={17} />
                        </Button>
                      ) : (
                        ''
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {showModalDetail ? (
          <ModalDetailDowntime
            showModal={showModalDetail}
            closedModal={() => setShowModalDetail(false)}
            dataDetailDowntime={dataDetail}
            status={status}
          />
        ) : (
          ''
        )}
        {showModalAdd ? (
          <ModalAddDowntime
            showModal={showModalAdd}
            closedModal={() => setShowModalAdd(false)}
            userId={userId}
            getDowntime={() => getDowntimeList()}
            mixerData={mixerData}
            batchData={batchData}
          />
        ) : (
          ''
        )}
        {showModalEdit ? (
          <ModalEditDowntime
            showModal={showModalEdit}
            closedModal={() => setShowModalEdit(false)}
            userId={userId}
            getDowntime={() => getDowntimeList()}
            mixerData={mixerData}
            batchData={batchData}
            dataEdit={dataEdit}
            date={date}
          />
        ) : (
          ''
        )}
        {showModalUpdate ? (
          <ModalUpdateDowntime
            showModal={showModalUpdate}
            closedModal={() => setShowModalUpdate(false)}
            userId={userId}
            getDowntime={() => getDowntimeList()}
            mixerData={mixerData}
            batchData={batchData}
            startChecked={startChecked}
            endChecked={endChecked}
            dataUpdate={dataUpdate}
            date={date}
          />
        ) : (
          ''
        )}
      </Container>
    </>
  );
};

export default Downtime;
