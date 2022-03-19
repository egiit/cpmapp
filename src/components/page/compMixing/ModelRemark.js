import React, { useState, useContext } from 'react';
import { MixingContex } from '../provider/Mixing.provider';
import axios from '../../axios/axios';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { flash } from 'react-universal-flash';

function ModelRemark({ showModal, cancelmNext, dataRemarkDef, batchId }) {
  const { header } = useContext(MixingContex);
  const [dataRemark, setDataRemark] = useState('');

  const inputRemark = (e) => {
    const daraRe = {
      params: e.target.name,
      value: e.target.value,
    };
    setDataRemark(daraRe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dataProcRemark = {
      header_id: header.header_id,
      batch_regis_id: batchId,
      mixer_proc_chek_date: header.header_prod_date,
      mixer_proc_chek_shift: header.header_shift,
    };

    await axios
      .post('/mixer/batch/procheck', dataProcRemark)
      .then((response) => {
        const checkId = response.data.data.mixer_proc_chek_id;
        const dataRem = {
          mixer_proc_check_id: checkId,
          standar_form_id: dataRemark.params,
          standar_form_value: dataRemark.value,
        };
        // console.log(response);
        // console.log(dataRem);
        axios
          .post('/mixer/batch/checklist', dataRem)
          .then((response) => {
            flash(response.data.message, 5000, 'success');
          })
          .catch((error) => {
            if (error.response) {
              flash(error.response.data.message, 5000, 'danger');
            }
          });
      })
      .catch((error) => console.log(error));
    cancelmNext();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={cancelmNext}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* {JSON.stringify(dataRemarkDef)} */}
            <FloatingLabel
              controlId="remark"
              label="Input Remark"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                name={25}
                required
                defaultValue={dataRemarkDef[0].standar_form_value}
                onChange={inputRemark}
                style={{ height: '100px' }}
                placeholder="Batch 1"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={cancelmNext}>
              Cancel
            </Button>
            <Button size="sm" variant="danger" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ModelRemark;
