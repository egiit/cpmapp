import React, { useContext } from 'react';
import { DashboardContex } from '../provider/Dashboard.provider';
import { Row, Col, ListGroup, ProgressBar } from 'react-bootstrap';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';

const DashProgressView = () => {
  const { state } = useContext(DashboardContex);

  return (
    <>
      <ListGroup variant="flush" as="ol">
        {state.dataPlanFG.map((planProd, i) => (
          <ListGroup.Item key={i} className="mb-2" as="li">
            <Row className="fw-bold">{planProd.product_name}</Row>
            <Row className=" justify-content-end">
              <Col className="align-self-end text-end fs-6">
                Target :{' '}
                <span className="fw-bold">
                  {planProd.product_plan_batch_publish_qty}
                </span>{' '}
                Batch &{' '}
                <span className="fw-bold">{planProd.target.toFixed(2)}</span> FG
              </Col>
            </Row>
            <Row>
              <Col sm={2} md={2} className="p-0">
                Batch
              </Col>
              <Col sm={8} md={8} className="p-0">
                <ProgressBar
                  animated
                  now={(
                    (planProd.actual_batch /
                      planProd.product_plan_batch_publish_qty) *
                    100
                  ).toFixed(1)}
                  label={`${(
                    (planProd.actual_batch /
                      planProd.product_plan_batch_publish_qty) *
                    100
                  ).toFixed(1)}%`}
                />
              </Col>
              <Col className="text-end fw-bold p-0" sm={2}>
                <span
                  className={
                    planProd.actual_batch <
                    planProd.product_plan_batch_publish_qty
                      ? 'text-danger'
                      : 'text-success'
                  }
                >
                  {planProd.actual_batch}
                </span>
                {planProd.actual_batch <
                planProd.product_plan_batch_publish_qty ? (
                  <IconContext.Provider
                    value={{ color: 'rgba(253, 0, 0, 0.8)' }}
                  >
                    <BsFillCaretDownFill />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ color: '#05b50b' }}>
                    <BsFillCaretUpFill />
                  </IconContext.Provider>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm={2} md={2} className="p-0">
                FG
              </Col>
              <Col sm={8} md={8} className="p-0">
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{
                      backgroundColor: '#05b50b',
                      width: `${(
                        (planProd.actual_FG / planProd.target) *
                        100
                      ).toFixed(1)}%`,
                    }}
                    role="progressbar"
                    aria-valuenow={(
                      (planProd.actual_FG / planProd.target) *
                      100
                    ).toFixed(1)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >{`${((planProd.actual_FG / planProd.target) * 100).toFixed(
                    1
                  )}%`}</div>
                </div>
              </Col>
              <Col className="text-end fw-bold p-0" sm={2}>
                <span
                  className={
                    planProd.actual_FG < planProd.target
                      ? 'text-danger'
                      : 'text-success'
                  }
                >
                  {planProd.actual_FG}
                </span>
                {planProd.actual_FG < planProd.target ? (
                  <IconContext.Provider
                    value={{ color: 'rgba(253, 0, 0, 0.8)' }}
                  >
                    <BsFillCaretDownFill />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider value={{ color: '#05b50b' }}>
                    <BsFillCaretUpFill />
                  </IconContext.Provider>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default DashProgressView;
