import React, { useState, useContext, useEffect } from 'react';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';
import { MixingContex } from '../provider/Mixing.provider';

const ModalDowntime = ({
  editStatus,
  dataEdit,
  getDowntime,
  showModalDownTime,
  handleClose,
}) => {
  const { header, mixerData, batchData } = useContext(MixingContex);

  // const [dataDowntime, setDataDowntime] = useState([]);
  const [filterBatch, setfilterBatch] = useState([]);
  const [activSelect, setactivSelect] = useState(true);
  const [downtimeId, setDowntimeId] = useState(0);
  const [productId, setproductId] = useState('');
  const [batchId, setbatchId] = useState('');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('00:00:00');
  const [typeDown, settypeDown] = useState('');
  const [remarkDown, setremarkDown] = useState('');
  const [messageState, setMessageSate] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (editStatus) {
      dataEdit.forEach((data) => {
        setDowntimeId(data.downtime_id);
        setproductId(data.product_id);
        setbatchId(data.batch_regis_id);
        setremarkDown(data.downtime_add_remark);
        settypeDown(data.downtime_type);
        setstartTime(data.downtime_start);
        setendTime(data.downtime_end);
      });
      setactivSelect(false);
    }
  }, [editStatus]);

  // function untuk select Product event looping batch
  const handleSelectProduct = (e) => {
    const { value } = e.target;
    // console.log(batchData);

    // console.log(value);
    if (value !== 0) {
      const hasilFilter = batchData.filter(
        (dataB) => dataB.product_id === parseInt(value)
      );
      setfilterBatch(hasilFilter);
      setproductId(value);
      return setactivSelect(false);
    }
    return setactivSelect(true);
  };

  // function get input menggunakan switch case
  const handleInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      // case "product":
      //   setproductId(value)
      //   break;
      case 'batch':
        // console.log(value);
        setbatchId(value);
        break;
      case 'timeStart':
        setstartTime(value);
        break;
      case 'typeDown':
        settypeDown(value);
        break;
      case 'remarak':
        setremarkDown(value);
        break;

      default:
        break;
    }
  };

  const handleSubmi = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      if (endTime !== '00:00:00') {
        return setMessageSate(
          'Tidak Bisa Update, Downtime Sudah Berstatus Fix'
        );
      }

      const dataDowntime = {
        downtime_id: downtimeId,
        downtime_dept_id: header.header_dept_id,
        header_id: header.header_id,
        product_id: productId,
        batch_regis_id: batchId,
        downtime_type: typeDown,
        downtime_start: startTime,
        downtime_add_remark: remarkDown,
        downtime_add_id: header.header_add_id,
      };

      await axios
        .post('/downtime', dataDowntime)
        .then((response) => flash(response.data.message, 5000, 'success'))
        .catch((error) => {
          flash(error.message, 5000, 'danger');
        });
      getDowntime();
      handleClose();
    }
  };
  const handleDelete = async () => {
    if (endTime !== '00:00:00') {
      return setMessageSate('Tidak Bisa Dihapus, Downtime Sudah Berstatus Fix');
    }

    await axios
      .delete(`/downtime/${downtimeId}`)
      .then((response) => {
        flash(response.data.message, 5000, 'success');
      })
      .catch((error) => {
        flash(error.data.message, 5000, 'danger');
      });

    getDowntime();
    handleClose();
  };

  return (
    <>
      <Modal
        show={showModalDownTime}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmi} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Downtime Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {JSON.stringify(filterBatch)} */}
            <div className="fst-italic text-danger">{messageState}</div>
            <FloatingLabel
              controlId="downtimeProduct"
              label="Product Name"
              className="mb-2"
            >
              <Form.Select
                onChange={(e) => handleSelectProduct(e)}
                aria-label="Floating label select Product"
                required
              >
                {editStatus ? (
                  <option value={dataEdit[0].product_id}>
                    {mixerData
                      .filter(
                        (data) => data.product_id === dataEdit[0].product_id
                      )
                      .map((prod) => prod.product_name)}
                  </option>
                ) : (
                  <option value={0}>Select Product Proccess</option>
                )}
                {mixerData.map((data, i) => (
                  <option key={i} value={data.product_id}>
                    {data.product_name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="downtimeBacthId"
              label="Batch Number"
              className="mb-2"
            >
              <Form.Select
                disabled={activSelect}
                onChange={(e) => handleInput(e)}
                name="batch"
                aria-label="Floating label select Batch"
              >
                {editStatus ? (
                  <option value={dataEdit[0].batch_regis_id}>
                    {'Batch' + dataEdit[0].batch_regis_id}
                  </option>
                ) : (
                  <option value={0}>Select Batch Proccess</option>
                )}
                {filterBatch.map((data, i) => (
                  <option key={i} value={data.batch_regis_id}>
                    Batch{data.batch_regis_id}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              controlId="downtimeProduct"
              label="Waktu Downtime"
              className="mb-2"
            >
              <Form.Control
                type="time"
                defaultValue={startTime}
                onChange={handleInput}
                name="timeStart"
                placeholder="08:00"
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="downtimeJenisDowntime"
              label="Jenis Downtime"
              className="mb-2"
            >
              <Form.Control
                type="text"
                defaultValue={typeDown}
                onChange={handleInput}
                name="typeDown"
                placeholder="Padam Listrik"
                required
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="downtimeProduct"
              label="Keterangan"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                defaultValue={remarkDown}
                onChange={handleInput}
                name="remarak"
                required
                placeholder="Keterangan"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            {editStatus ? (
              <Button size="sm" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            ) : (
              ''
            )}
            <Button size="sm" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="sm" variant="success" type="submit">
              {editStatus ? 'Update' : 'Save'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDowntime;
