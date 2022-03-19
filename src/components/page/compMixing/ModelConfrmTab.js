import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModelConfrmTab = ({
  showModal,
  messageConf,
  confirmNext,
  cancelmNext,
}) => {
  return (
    <>
      <Modal
        show={showModal}
        onHide={cancelmNext}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>{messageConf}</Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={cancelmNext}>
            Cancel
          </Button>
          <Button size="sm" variant="danger" onClick={confirmNext}>
            Ya
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelConfrmTab;
