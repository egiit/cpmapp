import React, { useContext } from 'react';
import { PackingContext } from '../provider/Packing.provider';
import { Table } from 'react-bootstrap';

const TableReject = () => {
  const { state } = useContext(PackingContext);

  return (
    <>
      <Table size="sm align-middle" bordered responsive>
        <thead>
          <tr>
            <th className="table-danger text-center" colSpan={6}>
              Reject
            </th>
          </tr>
          <tr className="text-center">
            <th>No</th>
            <th>Product</th>
            <th>Shift I</th>
            <th>Shift II</th>
            <th>Shift III</th>
            <th>Total (Kg)</th>
          </tr>
        </thead>
        <tbody>
          {state.dataReject.map((prod, i) => (
            <tr key={i} className="text-end">
              <td className="text-center">{i + 1}</td>
              <td className="text-start">{prod.product_name}</td>
              <td>{prod.shift1}</td>
              <td>{prod.shift2}</td>
              <td>{prod.shift3}</td>
              <td>{prod.total}</td>
            </tr>
          ))}
          <tr className="table-secondary fw-bold text-end">
            <td colSpan={2} className="text-start">
              Total (Kg)
            </td>
            <td>
              {state.dataReject
                .map((item) => item.shift1)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataReject
                .map((item) => item.shift2)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataReject
                .map((item) => item.shift3)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataReject
                .map((item) => item.total)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableReject;
