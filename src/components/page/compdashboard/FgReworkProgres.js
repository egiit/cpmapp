import React, { useContext } from 'react';
import { DashboardContex } from '../provider/Dashboard.provider';
import { Table, Card } from 'react-bootstrap';

const FgReworkProgres = () => {
  const { state } = useContext(DashboardContex);
  return (
    <>
      <Card>
        <Card.Body>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {state.dataProductFgRework.map((fgRework, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{fgRework.product_name}</td>
                  <td className="fw-bold">{fgRework.totprod}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default FgReworkProgres;
