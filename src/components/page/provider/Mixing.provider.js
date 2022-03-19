import React, { useState, createContext, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import axios from '../../axios/axios.js';
// import jwt_decode from 'jwt-decode';
// import axios from '../axios/axios.js';
import GetDate from '../utilis/GetDate.js';

export const MixingContex = createContext(null);

export const MixingProvider = ({ children }) => {
  const { value } = useContext(AuthContext);
  const { userId } = value;
  const [mixerData, setmixerData] = useState([]);
  const [batchData, setbatchData] = useState([]);
  // const [formMixer, setformMixer] = useState([]);
  const [header, setHeader] = useState({});

  const date = GetDate();
  // const date = '2022-03-16';

  useEffect(() => {
    getProductMixer();
    getBatchMixer();
    getHeader();
  }, [date, value]);
  const getHeader = async () => {
    await axios
      .get(`header/${userId}/${date}`)
      .then((response) => {
        setHeader(response.data);
      })
      .catch((error) => {
        console.log('Error Dapatkan Data Shift Header');
      });
  };

  const getProductMixer = async () => {
    await axios
      .get(`/mixer/product/2022-03-09`)
      .then((response) => {
        // console.log(response);
        setmixerData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Produk Mixer', error);
      });
  };

  const getBatchMixer = async () => {
    await axios
      .get(`/mixer/batch/2022-03-09`)
      .then((response) => {
        // console.log(response);
        setbatchData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Batch Mixer', error);
      });
  };

  const refreshBatch = async () => {
    return getBatchMixer();
  };

  // const getFormMixer = async () => {
  //   await axios.get(`/getform/MIXER`).then((response) => {
  //     // console.log(response);
  //     setformMixer(response.data);
  //   });
  // };

  const valued = {
    mixerData: mixerData,
    batchData: batchData,
    header: header,
    refreshBatc: refreshBatch,
  };

  return (
    <MixingContex.Provider value={valued}>{children}</MixingContex.Provider>
  );
};
