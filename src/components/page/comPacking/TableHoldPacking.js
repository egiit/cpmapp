import React, { useContext } from 'react';
import { PackingContext } from '../provider/Packing.provider';
import { Table } from 'react-bootstrap';

const TableHoldPacking = () => {
  const { state } = useContext(PackingContext);

  return (
    <>
      <Table size="sm align-middle" bordered responsive>
        <thead>
          <tr>
            <th className="table-warning text-center" colSpan={7}>
              Hold
            </th>
          </tr>
          <tr className="text-center align-middle">
            <th>No</th>
            <th>Product</th>
            <th>Packge</th>
            <th>Shift I</th>
            <th>Shift II</th>
            <th>Shift III</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {state.dataHoldProd.map(
            (
              item,
              i //looping semua array Hold
            ) => (
              <tr key={i} className="text-end">
                {i === 0 ||
                item.product_id !== state.dataHoldProd[i - 1].product_id ? ( //logic jika index tdk sma dgn hold atau id tidak sama dgn sblmnya maka print
                  <>
                    <td
                      rowSpan={
                        //tentukan rowspan Number dengan memfilter brdsarkan id
                        state.dataHoldProd.filter(
                          (x) => x.product_id === item.product_id
                        ).length
                      }
                      className="text-center"
                    >
                      {[
                        ...new Map(
                          state.dataHoldProd.map((xitem) => [
                            xitem['product_id'],
                            xitem,
                          ])
                        ).values(), //no urut diambil berdasarkan disticn produk
                      ].findIndex(
                        (indx) => indx.product_id === item.product_id
                      ) + //lalu cari indexnya dan tambah 1
                        1}
                    </td>

                    <td
                      rowSpan={
                        //rowsapan untuk product name dgn cara filter dan ambil lengthnya
                        state.dataHoldProd.filter(
                          (x) => x.product_id === item.product_id
                        ).length
                      }
                      className="text-start"
                    >
                      {item.product_name}
                    </td>
                  </>
                ) : (
                  ''
                )}
                <td>{item.package_desc}</td>
                <td>{item.shift1}</td>
                <td>{item.shift2}</td>
                <td>{item.shift3}</td>
                <td>{item.total}</td>
              </tr>
            )
          )}
          <tr className="table-secondary fw-bold text-end">
            <td colSpan={3} className="text-start">
              Total
            </td>
            <td>
              {state.dataHoldProd
                .map((item) => item.shift1)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataHoldProd
                .map((item) => item.shift2)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataHoldProd
                .map((item) => item.shift3)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
            <td>
              {state.dataHoldProd
                .map((item) => item.total)
                .reduce((prev, curr) => prev + curr, 0)}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default TableHoldPacking;
