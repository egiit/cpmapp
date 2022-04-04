import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { BiAddToQueue } from 'react-icons/bi';
import ModalDowntime from './ModalDowntime';
import { MixingContex } from '../provider/Mixing.provider';
import axios from '../../axios/axios';
import { FcApproval, FcCancel } from 'react-icons/fc';

const CardDowntime = () => {
  const { header } = useContext(MixingContex);
  const [showModalDownTime, setshowModalDownTime] = useState(false);
  const [listDownTime, setlistDownTime] = useState([]);
  const [dataEdit, setdataEdit] = useState([]);
  const [editStatus, seteditStatus] = useState(false);

  useEffect(() => {
    getDowntime();
  }, [header]);

  // function get list downtime
  const getDowntime = async () => {
    await axios
      .get(`downtime/${header.header_id}`)
      .then((response) => setlistDownTime(response.data));
  };

  //handle on modal edit or delete
  const editDowntime = (dwtId) => {
    const forEdit = listDownTime.filter(
      (dataDwt) => dataDwt.downtime_id === dwtId
    );
    seteditStatus(true);
    setdataEdit(forEdit);
    setshowModalDownTime(true);
  };

  // function cancel Modal
  const cancelModal = () => {
    seteditStatus(false);
    setdataEdit([]);
    setshowModalDownTime(false);
  };

  // interval for check fix downtime
  // setInterval(function() {
  //   getDowntime();
  // }, 300000);

  return (
    <>
      <Card className="mt-3 shadow border-0">
        <Card.Header>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setshowModalDownTime(true)}
          >
            Add Downtime <BiAddToQueue size={20} />
          </Button>
        </Card.Header>
        <Card.Body>
          {listDownTime.map((listD, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <div
                  onClick={() => editDowntime(listD.downtime_id)}
                  style={{ cursor: 'pointer' }}
                  className={
                    listD.downtime_end === '00:00:00'
                      ? `rounded p-2 border shadow border-danger`
                      : `rounded p-2 border shadow border-success`
                  }
                >
                  {listD.downtime_type}
                  {listD.downtime_end === '00:00:00' ? (
                    <FcCancel />
                  ) : (
                    <FcApproval />
                  )}
                  {/* <span className="badge bg-danger">
                    {listD.downtime_start}
                  </span> */}
                </div>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>
      {showModalDownTime ? (
        <ModalDowntime
          editStatus={editStatus}
          dataEdit={dataEdit}
          getDowntime={() => getDowntime()}
          showModalDownTime={showModalDownTime}
          handleClose={() => cancelModal()}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CardDowntime;
