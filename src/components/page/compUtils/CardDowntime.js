import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import GetDate from '../utilis/GetDate';
import axios from '../../axios/axios';
import { FcApproval, FcCancel, FcSupport } from 'react-icons/fc';
import ModalDetailDowntime from '../comDowntime/ModalDetailDowntime';
import { AuthContext } from '../../auth/AuthProvider';

const CardDowntime = () => {
  const navigate = useNavigate();
  const { value } = useContext(AuthContext);
  const { userDept } = value;
  const date = GetDate();
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const [status, setStatus] = useState('');

  const [downtimeList, setDowntimeList] = useState([]);

  const getDowntimeList = async (date) => {
    await axios
      .get(`/downtime/list/${date}%25`)
      .then((response) => setDowntimeList(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getDowntimeList(date);
    // getDowntime();
  }, [date]);

  // function get list downtime
  // const getDowntime = async () => {
  //   await axios
  //     .get(`downtime/${header.header_id}`)
  //     .then((response) => setlistDownTime(response.data));
  // };

  //handle on modal detail
  const handleDetail = (data) => {
    checkStatus(data.downtime_end, data.downtime_repair);
    setDataDetail(data);
    setShowModalDetail(true);
  };

  // // function cancel Modal
  // const cancelModal = () => {
  //   seteditStatus(false);
  //   setdataEdit([]);
  //   setShowModalDetail(false);
  // };

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

  return (
    <>
      <Card className="mt-3 shadow border-0">
        <Card.Header>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/downtime')}
          >
            Downtime List{' '}
            {downtimeList.length !== 0 ? (
              <span className="badge bg-danger">{downtimeList.length}</span>
            ) : (
              ''
            )}
          </Button>
        </Card.Header>
        <Card.Body>
          {downtimeList
            .filter((dtwlist) => dtwlist.downtime_dept_id === userDept)
            .map((listD, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <div
                    onClick={() => handleDetail(listD)}
                    style={{ cursor: 'pointer' }}
                    className={
                      listD.downtime_end === null
                        ? `rounded p-2 border shadow border-danger`
                        : `rounded p-2 border shadow border-success`
                    }
                  >
                    {listD.downtime_type}
                    {listD.downtime_end === null ? (
                      <FcCancel />
                    ) : (
                      <FcApproval />
                    )}
                    {listD.downtime_repair !== null &&
                    listD.downtime_end === null ? (
                      <FcSupport />
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
              </Row>
            ))}
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
    </>
  );
};

export default CardDowntime;
