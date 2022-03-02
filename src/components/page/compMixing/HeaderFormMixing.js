import React, { useState } from 'react';
import TagsInput from 'taginput-react';

import { Row, Col, Form, Accordion } from 'react-bootstrap';

const HeaderFormMixing = () => {
  const [operator, setOperator] = useState([]);
  const handleOnChange = (data) => {
    setOperator(data);
  };
  return (
    <>
      <Accordion defaultActiveKey="0">
        <Accordion.Item className="shadow border-0" eventKey="0">
          <Accordion.Header>
            <span className="fw-bold">Header Form</span>
          </Accordion.Header>
          <Accordion.Body>
            <Row>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="tanggal">
                  <Form.Label className="pt-0 fw-bold" column sm={2}>
                    Tanggal
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      size="sm"
                      type="text"
                      defaultValue="20 February 2022"
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="shift">
                  <Form.Label className="fw-bold" column sm={2}>
                    Shift
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select size="sm" defaultValue="I">
                      <option>I</option>
                      <option>II</option>
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group as={Row} className="mb-3" controlId="forOperator">
                  <Form.Label className="pt-0 fw-bold" column sm={2}>
                    Operator
                  </Form.Label>
                  <Col sm={10}>
                    <TagsInput
                      onChange={handleOnChange}
                      placeholder="Tekan Enter Untuk Tambah"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="forLeader">
                  <Form.Label className="pt-0 fw-bold" column sm={2}>
                    Leader
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control size="sm" type="text" />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default HeaderFormMixing;
