import React, { useState, useContext, useEffect } from 'react';
// import { MixingContex } from '../provider/Mixing.provider';
import axios from '../../axios/axios';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { flash } from 'react-universal-flash';
import { AuthContext } from '../../auth/AuthProvider';

function ModelRemarkFrml({
  setshowModalRemark,
  cancleModal,
  prodId,
  headers,
  mixFrmlCheck,
  idParams = 49,
}) {
  const { value } = useContext(AuthContext);
  const userId = value.userId;
  // const [idParams, setidParams] = useState(idParams);
  const [dataRemark, setDataRemark] = useState('');
  const [mixFrmlData, setMixFrmlData] = useState({});

  useEffect(() => {
    const mixData = mixFrmlCheck.filter(
      (data) => data.standar_form_id === idParams
    )[0];

    setDataRemark(mixData.mixer_frml_params);
    setMixFrmlData(mixData);

    // console.log(mixData);
  }, [prodId]);

  const inputRemark = (e) => {
    setDataRemark(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dataParamBahan = {
      mixer_frml_id:
        mixFrmlData.mixer_frml_id === '' ? null : mixFrmlData.mixer_frml_id,
      standar_form_id: idParams,
      mixer_frml_params: dataRemark,
      product_id: prodId,
      header_id: headers.header_id,
      mixer_frml_add_id: userId,
      mixer_frml_mod_id: userId,
    };

    await axios
      .post('/mixer/frmla-params', dataParamBahan)
      .then((response) => {
        flash('Success Remark Saved', 5000, 'success');
      })
      .catch((error) => {
        if (error.response) {
          flash(error.response.data.message, 5000, 'danger');
        }
      });
    cancleModal();
  };

  return (
    <>
      <Modal
        show={setshowModalRemark}
        onHide={cancleModal}
        backdrop="static"
        keyboard={false}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* {JSON.stringify(dataRemark)} */}
            <FloatingLabel
              controlId="remark"
              label="Input Remark"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                name={idParams}
                required
                defaultValue={dataRemark}
                onChange={inputRemark}
                style={{ height: '100px' }}
                placeholder="Batch 1"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={cancleModal}>
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

export default ModelRemarkFrml;
