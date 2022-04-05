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
  // const [batchData, setbatchData] = useState([]);
  const [header, setHeader] = useState({});

  useEffect(() => {
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
        .get(`/forming/product/${date}`)
        .then((response) => {
          console.log(response.data);
          setformingProdData(response.data);
        })
        .catch((error) => {
          console.log('error mendapatkan data Produk Forming', error);
        });
    };

    getHeader();
    getProductMixer();
  }, []);

  const valued = {
    prodForming: formingProdData,
    // batchData: batchData,
    header: header,
    // refreshBatc: refreshBatch,
  };

  return (
    <FormingContex.Provider value={valued}>{children}</FormingContex.Provider>
  );
};
