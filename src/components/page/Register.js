import React, { useState, useEffect } from 'react';
import axios from '../axios/axios.js';
import {
  Form,
  Button,
  Table,
  Row,
  Col,
  Card,
  Accordion,
} from 'react-bootstrap';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { HiOutlineKey } from 'react-icons/hi';
import MenutAuth from './compRegister/MenutAuth.js';
import ModalDelete from './compRegister/ModalDelete.js';
import ModalSaveAccs from './compRegister/ModalSaveAccs.js';
import { flash } from 'react-universal-flash';

const Register = () => {
  const [users, setUsers] = useState([]);
  const [depts, setDepts] = useState([]);
  const [menus, setMenus] = useState([]);
  const [menuAcces, setMenuAcces] = useState([]);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [dept, setDept] = useState(0);
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(true);
  const [active, setActive] = useState(1);
  const [password, setPassword] = useState('');

  const [btnSubmit, setbtnSubmit] = useState(true);
  const [validated, setValidated] = useState(false);
  const [urlSave, seturlSave] = useState('/user');
  const [showModal, setshowModal] = useState(false);
  const [idUserDelete, setidUserDelete] = useState('');
  const [tabMenu, settabMenu] = useState(false);
  let i = 1;

  const [idUserAccess, setidUserAccess] = useState('');
  const [arrView, setarrView] = useState([]);
  const [arrCreate, setarrCreate] = useState([]);
  const [arrUpdate, setarrUpdate] = useState([]);
  const [arrDelete, setarrDelete] = useState([]);
  const [arrPrint, setarrPrint] = useState([]);
  const [showModalAccs, setshowModalAccs] = useState(false);
  const [arrNewMenu, setarrNewMenu] = useState([]);

  useEffect(() => {
    getUsers();
    getDepts();
    getMenus();
  }, []);

  // const axiosJWT = axios.create();

  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const currentDate = new Date();
  //     if (expire * 1000 < currentDate.getTime()) {
  //       const response = await axios.get('/token');
  //       config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  //       setToken(response.data.accessToken);
  //       const decoded = jwt_decode(response.data.accessToken);
  //       // setActiveId(decoded.userId);
  //       // setActiveUser(decoded.username);
  //       setExpire(decoded.exp);
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  const getUsers = async () => {
    const response = await axios.get('/user');
    // console.log(response.data);
    setUsers(response.data);
  };

  const getDepts = async () => {
    const respons = await axios.get('/dept');
    setDepts(respons.data);
  };

  const getMenus = async () => {
    const repsons = await axios.get('/menu');
    setMenus(repsons.data);
  };

  const getMenuAccess = async (id) => {
    const respons = await axios.get(`/useraccess/${id}`);
    // console.log(respons.data);

    const arrViewd = [];
    const arrCreated = [];
    const arrUpdated = [];
    const arrDeleted = [];
    const arrPrintd = [];
    respons.data.forEach((ma) => {
      // console.log(ma.USER_ACESS_VIEW);
      arrViewd.push(ma.USER_ACESS_VIEW === 1 ? true : false);
      arrCreated.push(ma.USER_ACESS_ADD === 1 ? true : false);
      arrUpdated.push(ma.USER_ACESS_MOD === 1 ? true : false);
      arrDeleted.push(ma.USER_ACESS_DELETE === 1 ? true : false);
      arrPrintd.push(ma.USER_ACESS_PRINT === 1 ? true : false);
    });
    setarrView(arrViewd);
    setarrCreate(arrCreated);
    setarrUpdate(arrUpdated);
    setarrDelete(arrDeleted);
    setarrPrint(arrPrintd);
    setMenuAcces(respons.data);
    // console.log(arrUpdated);
    settabMenu(true);
  };

  const resetForm = () => {
    setUsername('');
    setName('');
    setDept(0);
    setEmail('');
    setChecked(true);
    setActive(1);
    setPassword('');
    setbtnSubmit(true);
    setValidated(false);
    seturlSave('/user');
  };

  const saveUser = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      try {
        e.preventDefault();
        const dataUser = {
          USER_INISIAL: name,
          USER_PASS: password,
          USER_NAME: username,
          USER_EMAIL: email,
          USER_DEP: dept,
          USER_AKTIF_STATUS: active,
          USER_DELETE_STATUS: 0,
        };
        if (!btnSubmit) {
          await axios.patch(urlSave, dataUser);
          flash('User Update', 5000, 'success');
        } else {
          await axios.post(urlSave, dataUser);
          flash('User Added', 5000, 'success');
        }
        resetForm();
        setValidated(false);
        getUsers();
      } catch (error) {
        if (error.response) {
          flash(error.response.data.message, 5000, 'danger');
        }
      }
    }
  };

  const findUser = async (id) => {
    setbtnSubmit(false);
    seturlSave(`/user/${id}`);
    const responseData = await axios.get(`/user/${id}`);
    const resData = responseData.data;
    setUsername(resData.USER_NAME);
    setName(resData.USER_INISIAL);
    setDept(resData.USER_DEP);
    setEmail(resData.USER_EMAIL);
    setActive(resData.USER_AKTIF_STATUS);
    setPassword('');
    resData.USER_AKTIF_STATUS !== 1 ? setChecked(false) : setChecked(true);
  };

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value.toLowerCase().trim());
  };

  const onChangeName = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const onChangeDept = (e) => {
    const value = e.target.value;
    value !== '0'
      ? e.target.classList.remove('text-muted')
      : e.target.classList.add('text-muted');
    setDept(value);
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangeActive = (e) => {
    const valCheck = e.target.checked;
    setChecked(valCheck);
    checked ? setActive(0) : setActive(1);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const confirmModal = (id) => {
    setidUserDelete(id);
    setshowModal(true);
  };

  const resetMenuArr = () => {
    setidUserAccess('');
    setarrView([]);
    setarrCreate([]);
    setarrUpdate([]);
    setarrDelete([]);
    setarrPrint([]);
    setMenuAcces([]);
    setarrNewMenu([]);
  };

  const userAccessMen = (id) => {
    resetMenuArr();
    setidUserAccess(id);
    getMenuAccess(id);
  };

  const saveResultbtn = () => {
    const arrNewAccs = [];
    menuAcces.map(async (menu, index) => {
      const dataAcces = {
        USER_ID: idUserAccess,
        MENU_ID: menu.MENU_ID,
        USER_ACESS_VIEW: arrView[index] ? 1 : null,
        USER_ACESS_ADD: arrCreate[index] ? 1 : null,
        USER_ACESS_MOD: arrUpdate[index] ? 1 : null,
        USER_ACESS_DELETE: arrDelete[index] ? 1 : null,
        USER_ACESS_PRINT: arrPrint[index] ? 1 : null,
      };
      arrNewAccs.push(dataAcces);
    });
    setarrNewMenu(arrNewAccs);

    setshowModalAccs(true);
  };

  return (
    <>
      <div className="mt-3 py-4">
        <Row className="mx-2">
          <Col lg={!tabMenu ? 12 : 6}>
            <Card className="shadow border-0">
              <Card.Body>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Register & Edit Users</Accordion.Header>
                    <Accordion.Body>
                      <Form
                        onSubmit={saveUser}
                        noValidate
                        validated={validated}
                      >
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="forUsername"
                        >
                          <Form.Label size="sm" column sm="4">
                            Username
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              size="sm"
                              type="text"
                              placeholder="andrea"
                              value={username}
                              onChange={onChangeUsername}
                              required
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Please input a username.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="forName"
                        >
                          <Form.Label size="sm" column sm="4">
                            Name
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              size="sm"
                              type="text"
                              placeholder="andrea"
                              value={name}
                              onChange={onChangeName}
                              required
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Please input a username.
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="forDept"
                        >
                          <Form.Label size="sm" column sm="4">
                            Departement
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Select
                              size="sm"
                              aria-label="select dept"
                              className="text-muted"
                              onChange={onChangeDept}
                              value={dept}
                            >
                              <option value="0">Select Dept</option>
                              {depts.map((dep) => (
                                <option key={dep.DEP_ID} value={dep.DEP_ID}>
                                  {dep.DEP_NAME}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="forEmail"
                        >
                          <Form.Label size="sm" column sm="4">
                            Email address
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              size="sm"
                              type="email"
                              placeholder="name@example.com"
                              value={email}
                              onChange={onChangeEmail}
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="passwordForm"
                        >
                          <Form.Label size="sm" column sm="4">
                            Password
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control
                              size="sm"
                              type="password"
                              placeholder="Password"
                              minLength={6}
                              value={password}
                              onChange={onChangePassword}
                              autoComplete="on"
                              required
                            />
                            <Form.Control.Feedback>
                              Looks good!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                              Password minimum length 6 caracther
                            </Form.Control.Feedback>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label size="sm" column sm="4">
                            Status Active
                          </Form.Label>
                          <Col sm={4}>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                                checked={checked}
                                value={active}
                                onChange={onChangeActive}
                              ></input>
                              <label className="form-check-label">
                                {active === 1 ? 'Active' : 'Disabled'}
                              </label>
                            </div>
                          </Col>
                        </Form.Group>
                        <Row className="justify-content-end">
                          <Col className="text-end" sm={4}>
                            {btnSubmit ? (
                              <Button variant="primary" type="submit" size="sm">
                                Add User
                              </Button>
                            ) : (
                              <>
                                <Button
                                  className="me-1"
                                  size="sm"
                                  variant="warning"
                                  type="submit"
                                >
                                  Update
                                </Button>
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => resetForm()}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Form>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Row className="mt-3">
                  <Col className=" mt-3 border-top">
                    <Table size="sm" responsive hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Dept</th>
                          <th>Email</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users
                          .filter((userd) => userd.USER_DELETE_STATUS !== 1)
                          .map((user) => {
                            depts.find((dep) =>
                              dep.DEP_ID === user.USER_DEP
                                ? (user.USER_DEP = dep.DEP_NAME)
                                : ''
                            );
                            return (
                              <tr key={user.USER_ID}>
                                <td>{i++}</td>
                                <td>{user.USER_NAME}</td>
                                <td>{user.USER_INISIAL}</td>
                                <td>
                                  {user.USER_DEP === 0 ? '-' : user.USER_DEP}
                                </td>
                                <td>{user.USER_EMAIL}</td>
                                <td>
                                  {user.USER_AKTIF_STATUS === 1
                                    ? 'Active'
                                    : 'Disabled'}
                                </td>

                                <td className="">
                                  <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => findUser(user.USER_ID)}
                                  >
                                    <AiOutlineEdit />
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => confirmModal(user.USER_ID)}
                                  >
                                    <AiOutlineDelete />
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => userAccessMen(user.USER_ID)}
                                  >
                                    <HiOutlineKey />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                {showModal ? (
                  <ModalDelete
                    showModal={showModal}
                    idUserDelete={idUserDelete}
                    handleClose={() => setshowModal(false)}
                    getUsers={() => getUsers()}
                  />
                ) : (
                  ''
                )}
              </Card.Body>
            </Card>
          </Col>
          {tabMenu ? (
            <>
              <MenutAuth
                menus={menus}
                setarrView={setarrView}
                setarrCreate={setarrCreate}
                setarrUpdate={setarrUpdate}
                setarrDelete={setarrDelete}
                setarrPrint={setarrPrint}
                arrView={arrView}
                arrCreate={arrCreate}
                arrUpdate={arrUpdate}
                arrDelete={arrDelete}
                arrPrint={arrPrint}
                menuAcces={menuAcces}
                tabMenu={tabMenu}
                saveResultbtn={() => saveResultbtn()}
                btnFalse={() => settabMenu(false)}
              />
              <ModalSaveAccs
                showModalAccs={showModalAccs}
                handleCloseAccs={() => setshowModalAccs(false)}
                arrNewMenu={arrNewMenu}
              />
            </>
          ) : (
            ''
          )}
        </Row>
      </div>
    </>
  );
};

export default Register;
