import React, { createContext, useEffect } from 'react';
// import { AuthContext } from '../../auth/AuthProvider.js';
// import axios from '../../axios/axios.js';
// import GetDate from '../utilis/GetDate.js';

export const PackingContext = createContext(null);

export const PackingProvider = ({ children }) => {
  // const date = GetDate();
  // const { value } = useContext(AuthContext);
  // const { userId } = value;
  // const [ovenProdData, setovenProdData] = useState([]);
  // const [batchData, setbatchData] = useState([]);
  // const [header, setHeader] = useState({});
  // const [prodCheck, setProdCheck] = useState({});

  useEffect(() => {
    // getProdCheck();
    // getHeader();
    // getProductOven();
    // getBatchOven();
  }, []);

  // const getHeader = async () => {
  //   await axios
  //     .get(`header/${userId}/${date}`)
  //     .then((response) => {
  //       setHeader(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('Error Dapatkan Data Shift Header');
  //     });
  // };

  // const getProductPacking = async () => {
  //   await axios
  //     .get(`/forming/product/${date}`)
  //     .then((response) => {
  //       // console.log(response.data);
  //       setovenProdData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error mendapatkan data Produk Oven', error);
  //     });
  // };

  const valued = {
    // prodOven: ovenProdData,
    // batchData: batchData,
    // header: header,
    // userId: userId,
    // prodCheck: prodCheck,
    // refreshBatch: () => getBatchOven(),
  };

  return (
    <PackingContext.Provider value={valued}>{children}</PackingContext.Provider>
  );
};
