import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from '../../axios/axios';
import moment from 'moment';
import { flash } from 'react-universal-flash';

const ModalEditDowntime = ({
  showModal,
  closedModal,
  getDowntime,
  mixerData,
  userId,
  batchData,
  date,
  dataEdit,
}) => {
  const [header, setHeader] = useState({});

  // const [dataDowntime, setDataDowntime] = useState([]);
  const [filterBatch, setfilterBatch] = useState([]);
  const [productId, setproductId] = useState('');
  const [batchId, setbatchId] = useState('');
  const [startTime, setstartTime] = useState('');
  const [typeDown, settypeDown] = useState('');
  const [remarkDown, setremarkDown] = useState('');
  const [messageState, setMessageSate] = useState('');
  const [validated, setValidated] = useState(false);

  // function untuk select Product event looping batch
  const handleSelectProduct = (e) => {
    const { value } = e.target;
    // console.log(batchData);

    // console.log(value);
    const hasilFilter = batchData.filter(
      (dataB) => dataB.product_id === parseInt(value)
    );
    setfilterBatch(hasilFilter);
    setproductId(value);
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
        setstartTime(`${date} ${value}:00`);
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

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();

      const dataDowntime = {
        downtime_id: dataEdit.downtime_id,
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
      closedModal();
    }
  };

  const getHeader = async () => {
    await axios
      .get(`header/${userId}/${date}`)
      .then((response) => {
        setHeader(response.data);
      })
      .catch((error) => {
        console.log('Error Dapatkan Data Shift Header');
      });
  };

  useEffect(() => {
    const hasilFilter = batchData.filter(
      (dataB) => dataB.product_id === dataEdit.product_id
    );

    setfilterBatch(hasilFilter);
    setproductId(dataEdit.product_id);
    setbatchId(dataEdit.batch_regis_id);
    setstartTime(moment(dataEdit.downtime_start).format('YYYY-MM-DD HH:mm:ss'));
    settypeDown(dataEdit.downtime_type);
    setremarkDown(dataEdit.downtime_add_remark);

    getHeader();
  }, []);

  const handleDelete = async () => {
    if (dataEdit.downtime_end !== null) {
      return setMessageSate('Tidak Bisa Dihapus, Downtime Sudah Berstatus Fix');
    }

    await axios
      .delete(`/downtime/${dataEdit.downtime_id}`)
      .then((response) => {
        flash(response.data.message, 5000, 'success');
      })
      .catch((error) => {
        flash(error.data.message, 5000, 'danger');
      });

    getDowntime();
    closedModal();
  };

  return (
    <div>
      <Modal show={showModal} onHide={closedModal} centered>
        {/* {JSON.stringify(dataEdit)} */}
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Downtime Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="text-danger fst-italic">{messageState}</h4>
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
                <option value={dataEdit.product_id}>
                  {dataEdit.product_name}
                </option>
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
                onChange={(e) => handleInput(e)}
                name="batch"
                aria-label="Floating label select Batch"
              >
                <option value={dataEdit.batch_regis_id}>
                  Batch{' '}
                  {filterBatch.findIndex(
                    (batc) => batc.batch_regis_id === dataEdit.batch_regis_id
                  ) + 1}
                </option>
                {filterBatch.map((data, i) => (
                  <option key={i} value={data.batch_regis_id}>
                    Batch{i + 1}
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
                onChange={handleInput}
                defaultValue={moment(dataEdit.downtime_start).format('hh:mm')}
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
                onChange={handleInput}
                defaultValue={dataEdit.downtime_type}
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
                onChange={handleInput}
                defaultValue={dataEdit.downtime_add_remark}
                name="remarak"
                required
                placeholder="Keterangan"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={header.header_id !== dataEdit.header_id}
              size="sm"
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button size="sm" variant="primary" onClick={closedModal}>
              Cancel
            </Button>
            <Button
              disabled={header.header_id !== dataEdit.header_id}
              size="sm"
              variant="success"
              type="submit"
            >
              save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalEditDowntime;
