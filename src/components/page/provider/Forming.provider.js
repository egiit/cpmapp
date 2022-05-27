import React, { useState, createContext, useEffect, useContext } from 'react';
import { AuthContext } from '../../auth/AuthProvider.js';
import axios from '../../axios/axios.js';
import GetDate from '../utilis/GetDate.js';

export const FormingContex = createContext(null);

export const FormingProvider = ({ children }) => {
  const date = GetDate();
  const { value } = useContext(AuthContext);
  const { userId } = value;
  const [formingProdData, setformingProdData] = useState([]);
  const [batchData, setbatchData] = useState([]);
  const [header, setHeader] = useState({});
  const [prodCheck, setProdCheck] = useState({});

  useEffect(() => {
    getProdCheck(date);
    getHeader(date, userId);
    getProductForming(date);
    getBatchForming(date);
  }, [value, userId, date]);

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

  const getProductForming = async (date) => {
    await axios
      .get(`/forming/product/${date}`)
      .then((response) => {
        // console.log(response.data);
        setformingProdData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Produk Forming', error);
      });
  };

  const getBatchForming = async (date) => {
    await axios
      .get(`/forming/batch/${date}`)
      .then((response) => {
        // console.log(response.data);
        setbatchData(response.data);
      })
      .catch((error) => {
        console.log('error mendapatkan data Batch Forming', error);
      });
  };

  const getProdCheck = async (date) => {
    await axios
      .get(`/forming/product-check/${date}`)
      .then((response) => {
        // console.log(response.data);
        setProdCheck(response.data);
      })
      .catch((error) => console.log(error));
  };

  const valued = {
    prodForming: formingProdData,
    batchData: batchData,
    header: header,
    userId: userId,
    prodCheck: prodCheck,
    getProdCheck: getProdCheck,
  };

  return (
    <FormingContex.Provider value={valued}>{children}</FormingContex.Provider>
  );
};
