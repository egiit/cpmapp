import React, { useState, createContext, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import axios from '../../axios/axios.js';
import GetDate from '../utilis/GetDate.js';

export const OvenContex = createContext(null);

export const OvenProvider = ({ children }) => {
  const date = GetDate();
  const { value } = useContext(AuthContext);
  const { userId } = value;
  const [ovenProdData, setovenProdData] = useState([]);
  const [batchData, setbatchData] = useState([]);
  const [header, setHeader] = useState({});
  const [prodCheck, setProdCheck] = useState({});

  useEffect(() => {
    getProdCheck(date);
    getHeader(date, userId);
    getProductOven(date);
    getBatchOven(date);
  }, [value, date, userId]);

  const getHeader = async (date, userId) => {
    await axios
      .get(`header/${userId}/${date}`)
      .then((response) => {
        setHeader(response.data);
      })
      .catch((error) => {
        console.log('Wait For Header Info');
      });
  };

  const getProductOven = async (date) => {
    await axios
      .get(`/forming/product/${date}`)
      .then((response) => {
        // console.log(response.data);
        setovenProdData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Produk Oven', error);
      });
  };

  const getBatchOven = async (date) => {
    await axios
      .get(`/oven/batch-list/${date}`)
      .then((response) => {
        // console.log(response.data);
        setbatchData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Batch Oven', error);
      });
  };

  const getProdCheck = async (date) => {
    await axios
      .get(`/oven/product-check/${date}`)
      .then((response) => {
        // console.log(response.data);
        setProdCheck(response.data);
      })
      .catch((error) => console.log(error));
  };

  const valued = {
    prodOven: ovenProdData,
    batchData: batchData,
    header: header,
    userId: userId,
    prodCheck: prodCheck,
    refreshBatch: () => getBatchOven(date),
  };

  return <OvenContex.Provider value={valued}>{children}</OvenContex.Provider>;
};
