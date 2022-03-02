import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { BiAddToQueue } from 'react-icons/bi';
import ModalDowntime from './ModalDowntime';

const CardDowntime = () => {
  const [showModalDownTime, setshowModalDownTime] = useState(false);
  return (
    <>
      <Card className="mt-3 shadow border-0">
        <Card.Header>
          <Button
            size="sm"
            variant="danger"
            onClick={() => setshowModalDownTime(true)}
          >
            Add Downtime <BiAddToQueue size={20} />
          </Button>
        </Card.Header>
        <Card.Body></Card.Body>
      </Card>
      {showModalDownTime ? (
        <ModalDowntime
          showModalDownTime={showModalDownTime}
          handleClose={() => setshowModalDownTime(false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CardDowntime;
