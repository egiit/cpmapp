import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axios';
import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  Form,
  Button,
} from 'react-bootstrap';
import TagsInput from 'taginput-react';
import { AuthContext } from '../auth/AuthProvider';
import GetDate from './utilis/GetDate';

const HeaderForm = () => {
  //declare state
  const navigate = useNavigate();
  const pathName = window.location.pathname;

  const { value } = useContext(AuthContext);
  const [shift, setShift] = useState('');
  const [operator, setOperator] = useState([]);
  const [leader, setLeader] = useState('');
  const [deptName, setdeptName] = useState('');
  const [validated, setValidated] = useState(false);
  const [notifOpNull, setnotifOpNull] = useState('');
  const tanggal = GetDate();
  const [urlPush, seturlPush] = useState('/header');

  useEffect(() => {
    const getHeader = async () => {
      await axios
        .get(`header/${value.userId}/${tanggal}`)
        .then((response) => {
          seturlPush(`/header/${response.data.header_id}`);
          const arrOperator = response.data.header_operator.split(',');
          setShift(response.data.header_shift);
          setOperator(arrOperator);
          setLeader(response.data.header_leader);
          // axios
          //   .get(`/header/${response.data.header_id}`)
          //   .then((response) => {

          //   });
        })
        .catch((error) => {
          console.log('Error Dapatkan Data Shift Header');
        });
    };
    if (pathName === '/headerform/edit') {
      getHeader();
    }
    getHeader();
    const getDept = async () => {
      await axios
        .get(`/dept/${value.userDept}`)
        .then((response) => {
          // console.log(response.data.DEP_NAME);
          setdeptName(response.data.DEP_NAME);
        })
        .catch((error) => console.log(error));
    };
    getDept();
  }, [value, pathName, tanggal]);

  // handel input
  const onChangeShit = (e) => {
    const value = e.target.value;
    setShift(value);
  };
  const onChangeOperator = (data) => {
    setOperator(data);
    setnotifOpNull('');
  };
  const onChangeLeader = (e) => {
    const value = e.target.value;
    setLeader(value);
  };

  const resetForm = () => {
    setShift('');
    setOperator([]);
    onChangeOperator([]);
    setLeader('');
    setValidated(false);
  };

  //handle Submit Create Header
  const onSubmitHeader = async (e) => {
    const form = e.target.parentElement;

    if (form.checkValidity() === false || operator.length < 1) {
      setnotifOpNull('Mohon Isi Operator');
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        e.preventDefault();
        const opt = operator.toString();
        const dataHeader = {
          header_prod_date: tanggal,
          header_shift: shift,
          header_operator: opt,
          header_leader: leader,
          header_dept_id: value.userDept,
          header_add_id: value.userId,
        };
        if (pathName === '/headerform/edit') {
          await axios.patch(urlPush, dataHeader);
        } else {
          await axios.post('/header', dataHeader);
        }
        resetForm();
        navigate(`/${deptName}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container fluid className="px-4 mt-4">
      <Row className="justify-content-center">
        <Col sm={10} md={8} xl={6}>
          <Row>
            <div className="ms-2">
              <h2 className="">{deptName}</h2>
              <Breadcrumb>
                <Breadcrumb.Item href="" active>
                  Check List Mixer
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Row>
          <Row>
            <Card className="border-0 shadow">
              <Card.Body>
                <Form noValidate validated={validated}>
                  <Form.Group as={Row} className="mb-3" controlId="tanggal">
                    <Form.Label className="pt-0 fw-bold" column sm={3}>
                      Tanggal
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        size="sm"
                        type="text"
                        defaultValue={tanggal}
                        disabled
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="shift">
                    <Form.Label className="fw-bold" column sm={3}>
                      Shift
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Select
                        onChange={onChangeShit}
                        size="sm"
                        value={shift}
                        required
                      >
                        <option></option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="forOperator">
                    <Form.Label className="pt-0 fw-bold" column sm={3}>
                      Operator
                    </Form.Label>
                    <Col sm={9}>
                      <TagsInput
                        required
                        // value={operator}
                        tags={operator}
                        onChange={onChangeOperator}
                        placeholder="Tekan Enter Untuk Tambah"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="forLeader">
                    <Form.Label className="pt-0 fw-bold" column sm={3}>
                      Leader
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control
                        size="sm"
                        type="text"
                        required
                        value={leader}
                        onChange={onChangeLeader}
                      />
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col className="offset-3 fs-6 fst-italic text-danger">
                      {notifOpNull}
                    </Col>
                  </Row>
                  <Button size="sm" variant="primary" onClick={onSubmitHeader}>
                    Save Header
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderForm;
