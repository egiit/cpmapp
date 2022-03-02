import React from 'react';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';

const ModalDowntime = ({ showModalDownTime, handleClose }) => {
  return (
    <>
      <Modal
        show={showModalDownTime}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Downtime Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="downtimeBacthId"
            label="Batch Number"
            className="mb-2"
          >
            <Form.Control type="text" placeholder="Batch 1" />
          </FloatingLabel>
          <FloatingLabel
            controlId="downtimeProduct"
            label="ProductName"
            className="mb-2"
          >
            <Form.Control type="text" placeholder="Batch 1" />
          </FloatingLabel>

          <FloatingLabel
            controlId="downtimeProduct"
            label="Waktu Downtime"
            className="mb-2"
          >
            <Form.Control type="time" placeholder="08:00" />
          </FloatingLabel>

          <FloatingLabel
            controlId="downtimeJenisDowntime"
            label="Jenis Downtime"
            className="mb-2"
          >
            <Form.Control type="text" placeholder="Padam Listrik" />
          </FloatingLabel>

          <FloatingLabel
            controlId="downtimeProduct"
            label="Keterangan"
            className="mb-2"
          >
            <Form.Control as="textarea" placeholder="Keterangan" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => console.log('save down time')}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDowntime;
