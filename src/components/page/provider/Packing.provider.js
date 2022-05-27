import React, { createContext, useEffect, useReducer } from 'react';
// import { AuthContext } from '../../auth/AuthProvider.js';
import axios from '../../axios/axios.js';
import GetDate from '../utilis/GetDate.js';

export const PackingContext = createContext(null);

export const ACTION = {
  CHANGE_DATE: 'changeDate',
  GET_DATA_PRODUKSI: 'getDataProduksi',
  GET_DATA_HOLD: 'getDataHold',
  GET_DATA_REWORK: 'getDataRework',
  GET_DATA_REJECT: 'getDataReject',
};

const intialstate = {
  date: GetDate(),
  dataProd: [],
  dataHoldProd: [],
  dataRework: [],
  dataReject: [],
};

export const PackingProvider = ({ children }) => {
  // const { value } = useContext(AuthContext);
  // const { userId } = value;

  const reducer = (intialstate, action) => {
    switch (action.type) {
      case ACTION.CHANGE_DATE:
        return { ...intialstate, date: action.payload.date };
      case ACTION.GET_DATA_PRODUKSI:
        return { ...intialstate, dataProd: action.payload.data };
      case ACTION.GET_DATA_HOLD:
        return { ...intialstate, dataHoldProd: action.payload.data };
      case ACTION.GET_DATA_REWORK:
        return { ...intialstate, dataRework: action.payload.data };
      case ACTION.GET_DATA_REJECT:
        return { ...intialstate, dataReject: action.payload.data };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, intialstate);

  useEffect(() => {
    getPackingProd(state.date);
    getPackingHold(state.date);
    getPackingRework(state.date);
    getPackingReject(state.date);
  }, [state.date]);

  const getPackingProd = async (date) => {
    await axios
      .get(`/packing/dataproduksi/${date}/PRODUCTION`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_PRODUKSI,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('Error Dapatkan Data Packing', error.message);
      });
  };

  const getPackingHold = async (date) => {
    await axios
      .get(`/packing/holdproduksi/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_HOLD,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('Error Dapatkan Data Packing', error.message);
      });
  };

  const getPackingRework = async (date) => {
    await axios
      .get(`/packing/dataproduksi/${date}/REWORK`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_REWORK,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('Error Dapatkan Data Packing Rework', error.message);
      });
  };

  const getPackingReject = async (date) => {
    await axios
      .get(`/packing/rejectproduksi/${date}/PRODUCTION`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_REJECT,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('Error Dapatkan Data REJECT Packing Rework', error.message);
      });
  };

  return (
    <PackingContext.Provider value={{ state, dispatch }}>
      {children}
    </PackingContext.Provider>
  );
};
