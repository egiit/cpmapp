import React, { useContext } from 'react';
import { PackingContext } from '../provider/Packing.provider';
import { Table } from 'react-bootstrap';

const TableProdPacking = () => {
  const { state } = useContext(PackingContext);
  return (
    <>
      <Table size="sm align-middle" bordered responsive>
        <thead>
          <tr>
            <th className="table-success text-center" colSpan={6}>
              Packing Output
            </th>
          </tr>
          <tr className="text-center align-middle">
            <th>No</th>
            <th>Product</th>
            <th>Shift I</th>
            <th>Shift II</th>
            <th>Shift III</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.dataProd.map((prod, i) => (
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
              Total
            </td>
            <td>
              {state.dataProd
                .map((item) => item.shift1)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataProd
                .map((item) => item.shift2)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataProd
                .map((item) => item.shift3)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataProd
                .map((item) => item.total)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableProdPacking;
