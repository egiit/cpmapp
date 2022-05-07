import React, { useState } from 'react';
import axios from '../../axios/axios';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { flash } from 'react-universal-flash';

const OvenModRemark = ({ dataCheckProd, paramsId, showModal, closeMdl }) => {
  const [dataRemark, setDataRemark] = useState([]);

  const handleInputProd = (e) => {
    const { value, name } = e.target;
    const updateProd = { ...dataCheckProd[0] };
    updateProd[name] = value;
    setDataRemark(updateProd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const forPushCheck = { ...dataRemark, ...paramsId };

    await axios
      .post('oven/product-check', forPushCheck)
      .then((response) => {
        flash(response.data.message, 5000, 'success');
      })
      .catch((error) => flash(error.message, 5000, 'danger'));

    closeMdl();
  };

  return (
    <div>
      <>
        <Modal
          show={showModal}
          onHide={closeMdl}
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
                  name="oven_prod_remark"
                  required
                  defaultValue={dataCheckProd[0].forming_prod_remark}
                  onChange={(e) => handleInputProd(e)}
                  style={{ height: '100px' }}
                  placeholder="Remark"
                />
              </FloatingLabel>
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" variant="secondary" onClick={closeMdl}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default OvenModRemark;
