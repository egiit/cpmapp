import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { flash } from 'react-universal-flash';

const ModalSaveAccs = ({ showModalAccs, handleCloseAccs, arrNewMenu }) => {
  const saveResultAcc = () => {
    arrNewMenu.map(async (menu) => {
      await axios.post(
        `http://localhost:3001/useraccess/${menu.USER_ID}/${menu.MENU_ID}`,
        menu
      );
    });
    flash('User Access Saved', 5000, 'success');
    handleCloseAccs();
  };

  return (
    <>
      <Modal
        show={showModalAccs}
        onHide={handleCloseAccs}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Save Setting User Access?</Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleCloseAccs}>
            Cancel
          </Button>
          <Button size="sm" variant="danger" onClick={() => saveResultAcc()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSaveAccs;
