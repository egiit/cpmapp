import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { flash } from 'react-universal-flash';

const ModalDelete = ({ showModal, handleClose, idUserDelete, getUsers }) => {
  const deleteUser = async (id) => {
    await axios.patch(`http://localhost:3001/user/delete/${id}`, {
      USER_DELETE_STATUS: 1,
    });
    handleClose();
    getUsers();
    flash('User Deleted', 5000, 'success');
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Want to delete User?</Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => deleteUser(idUserDelete)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
