import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from '../../axios/axios';
import ModalMixingReport from './ModalMixingReport';

const MixingBatchReport = ({ batchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [dataBatch, setDataBatch] = useState([]);
  const [prossestime1, setprossestime1] = useState([]);
  const [prossestime2, setprossestime2] = useState([]);
  const [prossestime3, setprossestime3] = useState([]);
  const [prodName, setprodName] = useState('');
  const [batchNo, setbatchNo] = useState('');

  const showDetail = async (bRegId, prodname, btchNom) => {
    setprodName(prodname);
    setbatchNo(btchNom);
    await axios
      .get(`/mixer/batch/MIXER/${bRegId}`)
      .then((response) => {
        // console.log(response.data);
        axios
          .get(`/mixer/report/time/${bRegId}/5/6`)
          .then((datatpros1) => setprossestime1(datatpros1.data));
        axios
          .get(`/mixer/report/time/${bRegId}/9/10`)
          .then((datatpros1) => setprossestime2(datatpros1.data));
        axios
          .get(`/mixer/report/time/${bRegId}/19/20`)
          .then((datatpros1) => setprossestime3(datatpros1.data));
        setDataBatch(response.data);
      })
      .then(() => setShowModal(true))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* {JSON.stringify(batchData)} */}

      <Table size="sm" responsive hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Shift</th>
            <th>Product</th>
            <th>Batch</th>
            <th>Batch Sequence</th>
            <th>Start Time</th>
            <th>Finish Time</th>
            <th>T.Time (mnt)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batchData.map((batchData, index) => (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td className="text-center">{batchData.mixer_proc_chek_shift}</td>
              <td>{batchData.product_name}</td>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{batchData.batch_regis_sequen}</td>
              <td>{batchData.start_time}</td>
              <td>{batchData.finish_time}</td>
              <td>{batchData.Ttime}</td>
              <td>
                {
                  <Button
                    size="sm"
                    variant="info"
                    disabled={batchData.mixer_proc_chek_id ? false : true}
                    onClick={() =>
                      showDetail(
                        batchData.batch_regis_id,
                        batchData.product_name,
                        index + 1
                      )
                    }
                  >
                    Detail
                  </Button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal ? (
        <ModalMixingReport
          dataBatch={dataBatch}
          showModal={showModal}
          prodName={prodName}
          batchNo={batchNo}
          prossestime1={prossestime1}
          prossestime2={prossestime2}
          prossestime3={prossestime3}
          closedModal={() => setShowModal(false)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MixingBatchReport;
