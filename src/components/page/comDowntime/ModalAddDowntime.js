import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';
import GetDate from '../utilis/GetDate';

const ModalAddDowntime = ({
  showModal,
  closedModal,
  getDowntime,
  mixerData,
  userId,
  batchData,
}) => {
  const [date, setDate] = useState(GetDate());
  const [header, setHeader] = useState({});

  // const [dataDowntime, setDataDowntime] = useState([]);
  const [filterBatch, setfilterBatch] = useState([]);
  const [activSelect, setactivSelect] = useState(true);
  //   const [downtimeId, setDowntimeId] = useState(0);
  const [productId, setproductId] = useState('');
  const [batchId, setbatchId] = useState('');
  const [startTime, setstartTime] = useState('');
  const [typeDown, settypeDown] = useState('');
  const [remarkDown, setremarkDown] = useState('');
  //   const [messageState, setMessageSate] = useState('');
  const [validated, setValidated] = useState(false);

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
        downtime_id: null,
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
    setDate(GetDate());
    getHeader();
  }, []);
  //   const handleDelete = async () => {

  //     await axios
  //       .delete(`/downtime/${downtimeId}`)
  //       .then((response) => {
  //         flash(response.data.message, 5000, 'success');
  //       })
  //       .catch((error) => {
  //         flash(error.data.message, 5000, 'danger');
  //       });

  //     getDowntime();
  //     closedModal();
  //   };
  return (
    <div>
      <Modal show={showModal} onHide={closedModal} centered>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title>Downtime Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* {JSON.stringify(filterBatch)} */}
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
                <option value={0}>Select Product Proccess</option>
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
                <option value={0}>Select Batch Proccess</option>
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
                name="remarak"
                required
                placeholder="Keterangan"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={closedModal}>
              Cancel
            </Button>
            <Button size="sm" variant="success" type="submit">
              {/* {editStatus ? 'Update' : 'Save'} */}save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalAddDowntime;
