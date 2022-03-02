import React from 'react';
import { Row, Col, Card, Form, Tab, Tabs, Button } from 'react-bootstrap';
import { BiAddToQueue } from 'react-icons/bi';
import { IconContext } from 'react-icons';

const TabContentMixing = ({ productPlann, planBatch }) => {
  return (
    <>
      <Tab.Content>
        {productPlann.map((product, index) => (
          <Tab.Pane key={index} eventKey={product.PRODUCT_ID}>
            <Tabs
              defaultActiveKey="Batch1"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              {planBatch
                .filter((plan) => plan.PRODUCT_ID === product.PRODUCT_ID)
                .map((batch, idx) => (
                  <Tab
                    key={idx}
                    eventKey={`Batch${batch.BATCH_ID}`}
                    title={`Batch${idx + 1}`}
                  >
                    <div className="ms-2">
                      <Row className="justify-content-end mb-2 me-2">
                        <Col
                          sm={3}
                          className="text-end border rounded-pill shadow-sm"
                        >
                          <div className="form-check form-switch">
                            <label className="form-check-label fs-6 me-2 pe-4">
                              Save & Transfer
                            </label>
                            <input
                              className="form-check-input p-0"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckDefault"
                            ></input>
                          </div>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col sm={6}>
                          <Row className="mb-3">
                            <Card>
                              <Card.Body>
                                <Form.Group as={Col} controlId="formSuhuAir">
                                  <Form.Label>
                                    Suhu Air (<span>&#8451;</span>)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    maxLength={3}
                                    max={100}
                                    size="sm"
                                  />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formSuhuTepu">
                                  <Form.Label>
                                    Suhu Tepung (<span>&#8451;</span>)
                                  </Form.Label>
                                  <Form.Control
                                    type="number"
                                    maxLength={3}
                                    max={100}
                                    size="sm"
                                  />
                                </Form.Group>

                                <Form.Group
                                  as={Col}
                                  controlId="formMulaiMixing"
                                >
                                  <Form.Label>Mulai Mixing</Form.Label>
                                  <Form.Control size="sm" type="time" />
                                </Form.Group>
                              </Card.Body>
                            </Card>
                          </Row>
                          <Row>
                            <Card>
                              <Card.Body>
                                <div className="row border-bottom justify-content-between">
                                  <div className="col">Tahap 1 Speed (Mnt)</div>
                                  <div className="col text-end">
                                    <button className="btn btn-sm btn-link">
                                      <IconContext.Provider
                                        value={{ color: 'green' }}
                                      >
                                        <BiAddToQueue size={20} />
                                      </IconContext.Provider>
                                    </button>
                                  </div>
                                </div>
                                <Row className="mb-2">
                                  <Form.Group as={Col} controlId="formSpeedHig">
                                    <Form.Label>High</Form.Label>
                                    <Form.Control
                                      type="number"
                                      maxLength={3}
                                      max={100}
                                      size="sm"
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    as={Col}
                                    controlId="formSpeedMedium"
                                  >
                                    <Form.Label>Medium</Form.Label>
                                    <Form.Control
                                      type="number"
                                      maxLength={3}
                                      max={100}
                                      size="sm"
                                    />
                                  </Form.Group>

                                  <Form.Group as={Col} controlId="formSpeedLow">
                                    <Form.Label>Low</Form.Label>
                                    <Form.Control type="number" size="sm" />
                                  </Form.Group>
                                </Row>
                                <div className="border-bottom">
                                  Tahap 2 Speed (Mnt)
                                </div>
                                <Row>
                                  <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>High</Form.Label>
                                    <Form.Control
                                      type="number"
                                      maxLength={3}
                                      max={100}
                                      size="sm"
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    as={Col}
                                    controlId="formGridState"
                                  >
                                    <Form.Label>Medium</Form.Label>
                                    <Form.Control
                                      type="number"
                                      maxLength={3}
                                      max={100}
                                      size="sm"
                                    />
                                  </Form.Group>

                                  <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Low</Form.Label>
                                    <Form.Control type="number" size="sm" />
                                  </Form.Group>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Row>
                        </Col>
                        <Col>
                          <Card>
                            <Card.Body>
                              <Form.Group as={Col} controlId="formAir">
                                <Form.Label>Air (Kg)</Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                              <Form.Group
                                as={Col}
                                controlId="firmSelesaiMixing"
                              >
                                <Form.Label>Selesai Mixing</Form.Label>
                                <Form.Control type="time" size="sm" />
                              </Form.Group>
                              <Form.Group as={Col} controlId="formSuhuAdonan">
                                <Form.Label>
                                  Suhu Adonan (<span>&#8451;</span>)
                                </Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                              <Form.Group as={Col} controlId="formResting">
                                <Form.Label>Resting (Jam)</Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                              <Form.Group as={Col} controlId="formFermentasi">
                                <Form.Label>Fermentasi (Jam)</Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                              <Form.Group as={Col} controlId="formSuhuResitng">
                                <Form.Label>
                                  Suhu Adonan Setelah Resting (
                                  <span>&#8451;</span>)
                                </Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                              <Form.Group as={Col} controlId="FormScrap">
                                <Form.Label>Scrap (Kg)</Form.Label>
                                <Form.Control type="number" size="sm" />
                              </Form.Group>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row className=" justify-content-end">
                        <Col className="text-end" sm={4}>
                          <Button
                            className="me-2"
                            size="sm"
                            variant="warning"
                            onClick={() => console.log('remark')}
                          >
                            Add Remark
                          </Button>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => console.log('Save')}
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Tab>
                ))}
            </Tabs>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </>
  );
};

export default TabContentMixing;
