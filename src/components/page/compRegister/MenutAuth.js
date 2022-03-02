import React from 'react';
// import axios from 'axios';
import { Table, Col, Card, Row, Button } from 'react-bootstrap';

const MenutAuth = ({
  menuAcces,
  btnFalse,
  setarrView,
  setarrCreate,
  setarrUpdate,
  setarrDelete,
  setarrPrint,
  arrView,
  arrCreate,
  arrUpdate,
  arrDelete,
  arrPrint,
  saveResultbtn,
}) => {
  const pushArry = (arr, indx) => {
    const arrvalueCheck = arr; //konversi state ke array
    const newValueCheck = arr[indx] ? false : true; //rubah valuenya
    arrvalueCheck[indx] = newValueCheck; //masukan kedalam array
    return arrvalueCheck;
  };

  const handleCheckbox = ({ e, index }) => {
    // console.log(e.target.name);
    // console.log(index);
    if (e.target.name === 'view') {
      setarrView(pushArry(arrView, index));
    } else if (e.target.name === 'create') {
      setarrCreate(pushArry(arrCreate, index));
    } else if (e.target.name === 'update') {
      setarrUpdate(pushArry(arrUpdate, index));
    } else if (e.target.name === 'delete') {
      setarrDelete(pushArry(arrDelete, index));
    } else {
      setarrPrint(pushArry(arrPrint, index));
    }
  };

  return (
    <>
      <Col lg={6}>
        <Card className="shadow border-0">
          <Card.Body>
            <Table striped bordered responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Menu name</th>
                  <th>Views</th>
                  <th>Create</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>Print</th>
                </tr>
              </thead>
              <tbody>
                {menuAcces.map((menu, index) => (
                  <tr key={menu.MENU_ID}>
                    <td>{index + 1}</td>
                    <td>{menu.MENU_NAME}</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        disabled={menu.MENU_ACT_VIW !== 1 ? true : ''}
                        defaultChecked={arrView[index]}
                        name="view"
                        id={`view${menu.MENU_ID}${index}`}
                        onChange={(e) => handleCheckbox({ e, index })}
                      ></input>
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={arrCreate[index]}
                        disabled={menu.MENU_ACT_ADD !== 1 ? true : ''}
                        name="create"
                        id={`add${menu.MENU_ID}${index}`}
                        onChange={(e) => handleCheckbox({ e, index })}
                      ></input>
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={arrUpdate[index]}
                        disabled={menu.MENU_ACT_MOD !== 1 ? true : ''}
                        name="update"
                        id={`mod${menu.MENU_ID}${index}`}
                        onChange={(e) => handleCheckbox({ e, index })}
                      ></input>
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={arrDelete[index]}
                        disabled={menu.MENU_ACT_DEL !== 1 ? true : ''}
                        name="delete"
                        id={`del${menu.MENU_ID}${index}`}
                        onChange={(e) => handleCheckbox({ e, index })}
                      ></input>
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultChecked={arrPrint[index]}
                        disabled={menu.MENU_ACT_PRN !== 1 ? true : ''}
                        name="print"
                        id={`prin${menu.MENU_ID}${index}`}
                        onChange={(e) => handleCheckbox({ e, index })}
                      ></input>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row className="justify-content-end">
              <Col className="text-end" sm={4}>
                <Button
                  className="me-2"
                  size="sm"
                  variant="primary"
                  onClick={() => btnFalse()}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => saveResultbtn()}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default MenutAuth;
