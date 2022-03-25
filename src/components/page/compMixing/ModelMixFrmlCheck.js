import React, { useContext, useState } from 'react';
import { Modal, Button, Table, Container } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthProvider';
import { MixingContex } from '../provider/Mixing.provider';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';

const ModelMixFrmlCheck = ({
  showModal,
  cancleModal,
  prodId,
  mixFrmlCheck,
  getForm,
}) => {
  const { header } = useContext(MixingContex);
  const { value } = useContext(AuthContext);
  const { userId } = value;
  const [inputList, setInputList] = useState([]);

  // handle input change
  const handleInputChange = (e) => {
    const lists = [...inputList];
    const { name, value, id } = e.target;
    const index = lists.findIndex((list) => list.params === name);
    index !== -1
      ? (lists[index] = { params: name, valuePar: value, frmid: id })
      : lists.push({ params: name, valuePar: value, frmid: id });
    setInputList(lists);
  };

  // const handleSave = () =>{

  // }

  const handleSubmit = () => {
    try {
      let inputLength = 0;
      inputList.forEach(async (list) => {
        const dataParamBahan = {
          mixer_frml_id: list.frmid === '' ? null : list.frmid,
          standar_form_id: list.params,
          mixer_frml_params: list.valuePar,
          product_id: prodId,
          header_id: header.header_id,
          mixer_frml_add_id: userId,
          mixer_frml_mod_id: userId,
        };
        // console.log(dataParamBahan);
        await axios.post('/mixer/frmla-params', dataParamBahan);
        inputLength++;
        if (inputLength === inputList.length) {
          flash('Parameter Bahan Baku Updated', 5000, 'success');
          getForm();
          cancleModal();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        className="modal-dialog-scrollable"
        show={showModal}
        onHide={() => cancleModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Container>
            <Table striped bordered responsive hover>
              <thead style={{ position: 'sticky', top: 0 }}>
                <tr>
                  <th>No</th>
                  <th>Default Params</th>
                  <th>Input</th>
                </tr>
              </thead>
              <tbody>
                {mixFrmlCheck.map((params, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{params.standar_form_param}</td>
                    <td>
                      <input
                        type="text"
                        defaultValue={params.mixer_frml_params}
                        id={params.mixer_frml_id}
                        name={params.standar_form_id}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={cancleModal}>
            Cancel
          </Button>
          <Button size="sm" variant="danger" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelMixFrmlCheck;
