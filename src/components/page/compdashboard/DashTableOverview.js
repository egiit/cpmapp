import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';

const DashTableOverview = () => {
  const { state } = useContext(DashboardContex);

  return (
    <>
      <Table size="sm" bordered responsive hover>
        <thead className="align-middle text-center">
          <tr>
            <th rowSpan={2}>#</th>
            <th rowSpan={2}>Product Name</th>
            <th colSpan={2}>Plan</th>
            <th colSpan={2}>Actual</th>
            <th colSpan={2}>Progress</th>
          </tr>
          <tr>
            <th>Batch</th>
            <th>FG</th>
            <th>Batch</th>
            <th>FG</th>
            <th>Batch</th>
            <th>FG</th>
          </tr>
        </thead>
        <tbody>
          {state.dataPlanFG.map((planProd, i) => (
            <tr key={i} className="text-center">
              <td>{i + 1}</td>
              <td className="text-start">{planProd.product_name}</td>
              <td>{planProd.product_plan_batch_publish_qty}</td>
              <td>{planProd.target.toFixed(2)}</td>
              <td>{planProd.actual_batch}</td>
              <td>{planProd.actual_FG}</td>
              <td
                className={
                  planProd.actual_batch <
                  planProd.product_plan_batch_publish_qty
                    ? 'text-danger'
                    : 'text-success'
                }
              >
                {(
                  (planProd.actual_batch /
                    planProd.product_plan_batch_publish_qty) *
                  100
                ).toFixed(1)}
                %
              </td>
              <td
                className={
                  planProd.actual_FG < planProd.target
                    ? 'text-danger'
                    : 'text-success'
                }
              >
                {((planProd.actual_FG / planProd.target) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DashTableOverview;
