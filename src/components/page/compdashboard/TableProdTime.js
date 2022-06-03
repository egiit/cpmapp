import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';
// import Moment from 'react-moment';

const TableProdTime = () => {
  const { state } = useContext(DashboardContex);

  return (
    <>
      <div className="table-responsive">
        <Table size="sm" bordered responsive hover>
          <thead className="align-middle text-center">
            <tr>
              <th rowSpan={3}>Shift</th>
              <th rowSpan={3}>Product</th>
              <th colSpan={11}>Production Time </th>
              <th rowSpan={3}>Total (Hour)</th>
            </tr>
            <tr>
              <th colSpan={3}>Mixer</th>
              <th colSpan={4}>Forming</th>
              <th colSpan={4}>Oven</th>
            </tr>
            <tr>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>T.Time (Hour)</th>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>Plan Downtime</th>
              <th>T.Time (Hour)</th>
              <th>Start Time</th>
              <th>Temp Time</th>
              <th>Stop Time</th>
              <th>T.Time (Hour)</th>
            </tr>
          </thead>
          <tbody>
            {state.dataProdTime.map((prod, i) => (
              <tr key={i} className="text-center align-middle">
                <td>{prod.header_shift}</td>
                <td className="text-start">{prod.product_name}</td>
                <td>{prod.mix_start_time}</td>
                <td>{prod.mix_end_time}</td>
                <td>{prod.mix_time}</td>
                <td>{prod.forming_prod_start}</td>
                <td>{prod.forming_prod_stop}</td>
                <td>{prod.forming_tdowntime}</td>
                <td>{prod.forming_time}</td>
                <td>{prod.oven_prod_start}</td>
                <td>{prod.oven_prod_temp}</td>
                <td>{prod.oven_prod_stop}</td>
                <td>{prod.oven_prod_ttime}</td>
                <td>{prod.total_time_prod}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default TableProdTime;
