import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { MixingContex } from '../provider/Mixing.provider';

const FooterFormMixing = () => {
  const { batchData } = useContext(MixingContex);
  const [totalBatch, setTotalBatch] = useState(0);
  const [finishBatch, setfinishBatch] = useState(0);

  const getAndCount = () => {
    setTotalBatch(batchData.length);
    const countFinish = batchData.filter(
      (item) => item.batch_regis_prod_flag === 'Y'
    ).length;
    setfinishBatch(countFinish);
  };

  useEffect(() => {
    getAndCount();
  }, [batchData]);

  return (
    <>
      <Row className="pt-2">
        <Col>
          <Card className="shadow border-0">
            <Card.Body className="p-2">
              <div className="btn fw-bold btn-primary btn-sm">
                Total Batch : {totalBatch}
              </div>
              <div className="btn fw-bold btn-info btn-sm">
                Finish Batch : {finishBatch}
              </div>
              <div className="btn fw-bold btn-warning btn-sm">
                Runing Batch :{' '}
                {finishBatch !== totalBatch ? finishBatch + 1 : totalBatch}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FooterFormMixing;
