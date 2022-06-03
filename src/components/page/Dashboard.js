import React, { useContext, useState } from 'react';
import { Card, Col, Container, Row, Accordion } from 'react-bootstrap';
import { BsTable } from 'react-icons/bs';
import ColumChart from './apexChart/ColumChart';
import LineChart from './apexChart/LineChart';

import CardDashboard from './compdashboard/CardDashboard';
import ChartDashboard from './compdashboard/ChartDashboard';
import ChartProdTime from './compdashboard/ChartProdTime';
import DashProgressView from './compdashboard/DashProgressView';
import DashTableOverview from './compdashboard/DashTableOverview';
import DetailProcess from './compdashboard/DetailProcess';
import DetailRejectBatch from './compdashboard/DetailRejectBatch';
import FgReworkProgres from './compdashboard/FgReworkProgres';
import HeaderDashboard from './compdashboard/HeaderDashboard';
import TableProdTime from './compdashboard/TableProdTime';
import { DashboardContex } from './provider/Dashboard.provider';
// import { AuthContext } from '../../App';

const Dashboard = () => {
  const { state } = useContext(DashboardContex);
  const [tableOverview, settableOverview] = useState(false);
  const [tableViewProdTime, settableViewProdTime] = useState(false);
  const [colTblO, setcolTblO] = useState(4);
  const [colChart, setcolChart] = useState(8);

  const handlTblOv = (e) => {
    settableOverview(e.target.checked);
    if (e.target.checked) {
      setcolTblO(6);
      setcolChart(6);
    } else {
      setcolTblO(5);
      setcolChart(7);
    }
  };

  const handlTblProdTime = (e) => {
    settableViewProdTime(e.target.checked);
  };

  return (
    <main>
      <Container fluid className="px-4">
        <HeaderDashboard />
        <CardDashboard />
        <div className="mb-3 border-0 shadow py-2 px-2">
          <h5 className="fs-5 m-0">
            Production By Plan{' '}
            <span className="fs-5 fst-italic">
              {' '}
              {state.dataPlanFG.length !== 0 ? '' : `( No Data )`}
            </span>
          </h5>
        </div>
        {state.dataPlanFG.length !== 0 ? (
          <>
            <Row>
              <Col
                className="order-sm-2 order-xl-1 mb-3"
                xs={12}
                md={5}
                xl={colTblO}
              >
                <Card className="border-0 shadow">
                  <Card.Body>
                    <Row className="justify-content-between mb-2">
                      <Col sm={8} className="fw-bold text-start">
                        Production Progress
                      </Col>
                      <Col sm={2} className="text-end me-2">
                        <div className="form-check form-switch text-end">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="tableSwitch"
                            onChange={(e) => handlTblOv(e)}
                            aria-checked
                          ></input>
                          <label className="form-check-label">
                            <BsTable />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {tableOverview ? (
                      <DashTableOverview />
                    ) : (
                      <DashProgressView />
                    )}
                  </Card.Body>
                </Card>
              </Col>

              <Col
                className="order-sm-1 order-xl-2 mb-3"
                xs={12}
                md={7}
                xl={colChart}
              >
                <ChartDashboard />
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="border-0 shadow">
                  <Card.Body>
                    <Row className="justify-content-between mb-2">
                      <Col sm={9} className="fw-bold text-start">
                        Production Time (Mixer, Forming, Oven)
                      </Col>
                      <Col
                        sm={2}
                        md={1}
                        className="align-content-sm-end pe-md-2"
                      >
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="tableSwitch"
                            onChange={(e) => handlTblProdTime(e)}
                            aria-checked
                          ></input>
                          <label className="form-check-label">
                            <BsTable />
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {tableViewProdTime ? <TableProdTime /> : <ChartProdTime />}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}
        <div className="mb-3 border-0 shadow py-2 px-2">
          <h5 className="fs-5 m-0">
            Production By Rework{' '}
            <span className="fs-5 fst-italic">
              {' '}
              {state.dataProductFgRework.length !== 0 ? '' : `( No Data )`}
            </span>
          </h5>
        </div>
        {state.dataProductFgRework.length !== 0 ? (
          <Row>
            <Col className="order-sm-2 order-xl-1 mb-3" xs={12} md={5}>
              <FgReworkProgres />
            </Col>
            <Col className="order-sm-1 order-xl-2 mb-3" xs={12} md={7}>
              <LineChart
                title={'FG Rework By Hour'}
                dataChart={
                  state.dataChartFgRework.series
                    ? state.dataChartFgRework.series
                    : []
                }
                categorie={
                  state.dataChartFgRework.categories
                    ? state.dataChartFgRework.categories
                    : []
                }
              />
            </Col>
          </Row>
        ) : (
          ``
        )}

        <div className="mb-3 border-0 shadow py-2 px-2">
          <h5 className="fs-5 m-0">
            Batch Info{' '}
            <span className="fs-5 fst-italic">
              {' '}
              {state.allBatchTrack.length !== 0 ? '' : `( No Data )`}
            </span>
          </h5>
        </div>
        {state.allBatchTrack.length !== 0 ? (
          <Row className="mb-3">
            <Col className="mb-3" sm={12} xl={12} xxxl={6}>
              <ColumChart />
            </Col>
            <Col sm={12} xl={12} xxxl={6}>
              <Accordion>
                <Accordion.Item className="border-0 shadow" eventKey="0">
                  <Accordion.Header className="fs-5">
                    <span className="fw-bold">Batch Total Time Detail</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <DetailProcess />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        ) : (
          ''
        )}
        <Row className="mb-3">
          <Col className="mb-3">
            <Accordion>
              <Accordion.Item className="border-0 shadow" eventKey="0">
                <Accordion.Header>
                  <span className="fw-bold">Reject Detail</span>
                </Accordion.Header>
                <Accordion.Body>
                  <DetailRejectBatch />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Dashboard;
