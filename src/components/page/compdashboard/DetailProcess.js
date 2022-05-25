import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { DashboardContex } from '../provider/Dashboard.provider';
import Moment from 'react-moment';

const DetailProcess = () => {
  const { state } = useContext(DashboardContex);

  return (
    <>
      <div className="table-responsive">
        <Table size="sm" bordered responsive hover>
          <thead>
            <tr className="align-middle text-center">
              <th rowSpan={2}>#</th>
              <th rowSpan={2}>Product</th>
              <th colSpan={5}>Mixer</th>
              <th colSpan={3}>Forming</th>
              <th>Oven</th>
              <th rowSpan={2}>Target Time</th>
              <th rowSpan={2}>Batch Time</th>
              <th rowSpan={2}>Var Time</th>
              <th rowSpan={2}>Eff</th>
            </tr>
            <tr>
              <th>Shift</th>
              <th>Start</th>
              <th>End</th>
              <th>T.Time</th>
              <th>Transfer</th>
              <th>Start</th>
              <th>Finish</th>
              <th>T.Time</th>
              <th>Baking Time</th>
            </tr>
          </thead>
          <tbody>
            {state.allBatchTrack
              .filter((btch) => btch.batch_regis_start_time !== null)
              .map((batch, i) => (
                <tr key={i} className="text-center align-middle">
                  <td>{i + 1}</td>
                  <td className="text-start">{batch.product_name}</td>
                  <td>{batch.mix_shift}</td>
                  <td>
                    {batch.batch_regis_start_time ? (
                      <Moment format="hh:mm">
                        {batch.batch_regis_start_time}
                      </Moment>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {batch.batch_regis_end_time ? (
                      <Moment format="hh:mm">
                        {batch.batch_regis_end_time}
                      </Moment>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{parseInt(batch.ttime) ? parseInt(batch.ttime) : ''}</td>
                  <td>
                    {batch.batch_regis_transfer_time ? (
                      <Moment format="hh:mm">
                        {batch.batch_regis_transfer_time}
                      </Moment>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{batch.forming_start}</td>
                  <td>{batch.forming_finish}</td>
                  <td>
                    {parseInt(batch.forming_total)
                      ? parseInt(batch.forming_total)
                      : ''}
                  </td>
                  <td>{batch.oven_backing}</td>
                  <td>{parseInt(batch.target_time)}</td>
                  <td>{parseInt(batch.batch_time)}</td>
                  <td
                    className={
                      parseInt(batch.target_time) - parseInt(batch.batch_time) <
                      0
                        ? 'text-danger'
                        : 'text-green'
                    }
                  >
                    {batch.oven_backing
                      ? parseInt(batch.target_time) - parseInt(batch.batch_time)
                      : ''}
                  </td>
                  <td
                    className={
                      parseInt(batch.target_time) - parseInt(batch.batch_time) <
                      0
                        ? 'text-danger'
                        : 'text-green'
                    }
                  >
                    {batch.oven_backing
                      ? `${(
                          (parseInt(batch.target_time) /
                            parseInt(batch.batch_time)) *
                          100
                        ).toFixed(1)}%`
                      : ''}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DetailProcess;
