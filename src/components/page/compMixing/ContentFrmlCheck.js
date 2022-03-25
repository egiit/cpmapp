import React, { useContext, useEffect, useState } from 'react';
import { MixingContex } from '../provider/Mixing.provider';
import { Tab, Button, Table } from 'react-bootstrap';
import ModelMixFrmlCheck from './ModelMixFrmlCheck';
import axios from '../../axios/axios';
import { flash } from 'react-universal-flash';

function ContentFrmlCheck({ idProd }) {
  const { mixerData, header, batchData } = useContext(MixingContex);
  const [showModal, setshowModal] = useState(false);
  // const [prodId, setProdId] = useState(idProd);
  const [mixFrmlCheck, setmixFrmlCheck] = useState([]);
  const [mixFrmlCheckVal, setmixFrmlCheckVal] = useState([]);
  const [inputList, setInputList] = useState([]);
  const [lengthBatch, setLengthBatch] = useState(0);

  // const handleShowModal = (id) => {
  //   // setProdId(id);
  //   setshowModal(true);
  // };

  useEffect(() => {
    getFormMixervalue();
    getFormMixerChecklist();
    filterbatchData();
  }, [idProd, header]);

  const getFormMixerChecklist = async () => {
    await axios
      .get(`/mixer/frmla-params/${header.header_id}/${idProd}`)
      .then((response) => {
        // console.log(response);
        setmixFrmlCheck(response.data);
      });
  };

  const getFormMixervalue = async () => {
    await axios //fetch data ke API ambil data value
      .get(`/mixer/frmla-params/value/${header.header_id}/${idProd}`)
      .then((response) => {
        // console.log(response.data);
        // setInputList(response.data);
        setmixFrmlCheckVal(response.data);
      });
  };

  // const getFormMixervalue = async () => {
  //   await axios //fetch data ke API ambil data value
  //     .get(`/mixer/frmla-params/value/${header.header_id}/${idProd}`)
  //     .then((response) => {
  //       const dataBtch = batchData
  //         .filter((plan) => plan.product_id === idProd)
  //         .map((batch) => {
  //           return response.data.filter(
  //             (check) => check.batch_regis_id === batch.batch_regis_id
  //           );
  //         });
  //       console.log(dataBtch);
  //       // setInputList(response.data);
  //       // setmixFrmlCheckVal(response.data);
  //     });
  // };

  const filterbatchData = () => {
    const batch = batchData.filter((plan) => plan.product_id === idProd);
    setLengthBatch(batch);
  };

  const handleInput = (e) => {
    console.log(e.target.checked);
    const lists = [...inputList];
    const { name, checked, id } = e.target;
    const index = lists.findIndex(
      (list) => list.batch_regis_id === name && list.mixer_frml_id === id
    );
    index !== -1
      ? (lists[index] = {
          batch_regis_id: name,
          mixer_frml_value: checked,
          mixer_frml_id: id,
        })
      : lists.push({
          batch_regis_id: name,
          mixer_frml_value: checked,
          mixer_frml_id: id,
        });
    setInputList(lists);
  };

  const handleSubmit = () => {
    try {
      let inputLength = 0;
      inputList.forEach(async (nlist) => {
        const dataInput = {
          mixer_frml_id: nlist.mixer_frml_id,
          batch_regis_id: nlist.batch_regis_id,
          mixer_frml_value: nlist.mixer_frml_value ? 1 : 0,
        };
        // console.log(dataInput);
        await axios.post('/mixer/frmla-params/value', dataInput);
        inputLength++;

        if (inputLength === inputLength.length) {
          flash('Parameter Bahan Baku Updated', 5000, 'success');
          setInputList([]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Tab.Content>
        {/* {JSON.stringify(inputList)} */}

        {mixerData.map((product, index) => (
          <Tab.Pane key={index} eventKey={product.product_id}>
            <Button
              size="sm"
              variant="primary"
              onClick={() => setshowModal(true)}
            >
              Edit Parameter
            </Button>

            <div className="mt-2">
              <Table striped size="sm" bordered responsive hover>
                <thead className="table-info">
                  <tr>
                    <th rowSpan={2}>#</th>
                    <th rowSpan={2}>Bahan Baku</th>
                    <th className="text-center" colSpan={lengthBatch.length}>
                      Batch
                    </th>
                    <th rowSpan={2}>Keterangan</th>
                  </tr>
                  <tr>
                    {lengthBatch.map((batch, index) => (
                      <th key={index}>{index + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mixFrmlCheck.map((list, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {list.standar_form_param}
                        <span> </span>
                        {list.mixer_frml_params}
                      </td>
                      {lengthBatch.map((batch, index) => (
                        <td className="text-center" key={index}>
                          {mixFrmlCheckVal.some(
                            (check) =>
                              check.mixer_frml_id === list.mixer_frml_id &&
                              check.batch_regis_id === batch.batch_regis_id
                          ) ? (
                            mixFrmlCheckVal
                              .filter(
                                (check) =>
                                  check.mixer_frml_id === list.mixer_frml_id &&
                                  check.batch_regis_id === batch.batch_regis_id
                              )
                              .map((data, idx) => (
                                <input
                                  key={idx}
                                  className="form-check-input"
                                  onChange={handleInput}
                                  name={batch.batch_regis_id}
                                  id={list.mixer_frml_id}
                                  disabled={
                                    !list.mixer_frml_params ? true : false
                                  }
                                  defaultChecked={
                                    data.mixer_frml_value === 1 ? true : false
                                  }
                                  type="checkbox"
                                ></input>
                              ))
                          ) : (
                            <input
                              // key={idx}
                              className="form-check-input"
                              onChange={handleInput}
                              name={batch.batch_regis_id}
                              id={list.mixer_frml_id}
                              disabled={!list.mixer_frml_params ? true : false}
                              type="checkbox"
                            ></input>
                          )}
                        </td>
                      ))}
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div>
                <Button variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </Tab.Pane>
        ))}
        {showModal ? (
          <ModelMixFrmlCheck
            showModal={showModal}
            prodId={idProd}
            mixFrmlCheck={mixFrmlCheck}
            getForm={() => getFormMixerChecklist()}
            confirmNext={() => console.log('cdk')}
            cancleModal={() => setshowModal(false)}
          />
        ) : (
          ''
        )}
      </Tab.Content>
    </div>
  );
}

export default ContentFrmlCheck;
