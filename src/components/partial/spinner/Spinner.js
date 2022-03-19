import React, { useContext } from 'react';
import { Modal, Spinner as Spin } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthProvider';
import './spinner.css';

const Spinner = () => {
  const { loading } = useContext(AuthContext);

  return (
    <>
      <Modal show={loading.spin} centered>
        <Modal.Dialog>
          <Modal.Body>
            <Spin
              animation="grow"
              variant="primary"
              style={{ width: '3rem', height: '3rem' }}
            />
            <Spin
              animation="grow"
              variant="primary"
              style={{ width: '3rem', height: '3rem' }}
            />
            <Spin
              animation="grow"
              variant="primary"
              style={{ width: '3rem', height: '3rem' }}
            />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default Spinner;
