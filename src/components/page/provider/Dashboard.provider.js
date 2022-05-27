import React, { createContext, useEffect, useReducer } from 'react';
// import { AuthContext } from '../../auth/AuthProvider.js';
import axios from '../../axios/axios.js';
import GetDate from '../utilis/GetDate.js';

export const DashboardContex = createContext(null);

export const ACTION = {
  CHANGE_DATE: 'changeDate',
  GET_PRODUCT_PLAN: 'getProductByPlan',
  GET_BATCH_PLAN: 'getBacthByPlan',
  GET_ACTUAL_BATCH: 'getActualBatch',
  GET_ALL_BATCH: 'getAllBatch',
  GET_DATA_CHART_FG: 'getDataChartFG',
  GET_DATA_PLAN_FG: 'getPlanFG',
  GET_DATA_TOTAL_PLAN_FG: 'getTotalPlanFG',
  GET_DATA_CHART_BATCH: 'getChartBatch',
  GET_CHART_FG_REWORK: 'getChartFgRework',
  GET_PROD_FG_REWORK: 'getProdFgRework',
  GET_TOT_TARGET_BATCH: 'getTargetBatch',
  GET_DATA_TOTAL_REJECT: 'getDataTotalReject',
  GET_ACTUAL_QTY_BATCH: 'getActualQtyBatch',
  FUNC_AUTO_REFRESH: 'refreshActive',
  GET_REJECT_BATCH: 'getRejectPerBatch',
};

const intialstate = {
  date: GetDate(),
  countRefresh: 0,
  productByplan: [],
  batchByplan: [],
  actualBatch: [],
  actualQtyBatch: 0,
  allBatchTrack: [],
  dataChartFG: [],
  dataPlanFG: [],
  dataTotalPlanFG: [],
  dataChartBatch: [],
  dataChartFgRework: [],
  dataProductFgRework: [],
  datTotalReject: {
    dataDough: [],
    dataKeping: [],
    rejectKeping: 0,
    rejectDough: 0,
    totalReject: 0,
  },
  dataRejectPerBatch: [],
  datTotTargetBatch: 0,
};

export const DashboardProvider = ({ children }) => {
  // const changeDate = (newDate) =>{
  //   dispatch({type: ACTION.CHANGE_DATE, payload: {date : newDate} })

  const reducer = (intialstate, action) => {
    switch (action.type) {
      case ACTION.CHANGE_DATE:
        return { ...intialstate, date: action.payload.date };
      case ACTION.GET_PRODUCT_PLAN:
        return {
          ...intialstate,
          productByplan: action.payload.data,
        };
      case ACTION.GET_BATCH_PLAN:
        return {
          ...intialstate,
          batchByplan: action.payload.data,
        };
      case ACTION.GET_ACTUAL_BATCH:
        return {
          ...intialstate,
          actualBatch: action.payload.data,
        };
      case ACTION.GET_ALL_BATCH:
        return {
          ...intialstate,
          allBatchTrack: action.payload.data,
        };
      case ACTION.GET_DATA_CHART_FG:
        return {
          ...intialstate,
          dataChartFG: action.payload.data,
        };
      case ACTION.GET_DATA_PLAN_FG:
        return {
          ...intialstate,
          dataPlanFG: action.payload.data,
        };
      case ACTION.GET_DATA_CHART_BATCH:
        return {
          ...intialstate,
          dataChartBatch: action.payload.data,
        };
      case ACTION.GET_CHART_FG_REWORK:
        return {
          ...intialstate,
          dataChartFgRework: action.payload.data,
        };
      case ACTION.GET_PROD_FG_REWORK:
        return {
          ...intialstate,
          dataProductFgRework: action.payload.data,
        };
      case ACTION.GET_DATA_TOTAL_REJECT:
        return {
          ...intialstate,
          datTotalReject: action.payload.data,
        };
      case ACTION.GET_DATA_TOTAL_PLAN_FG:
        return {
          ...intialstate,
          dataTotalPlanFG: action.payload.data,
        };
      case ACTION.GET_TOT_TARGET_BATCH:
        return {
          ...intialstate,
          datTotTargetBatch: action.payload.data,
        };
      case ACTION.GET_ACTUAL_QTY_BATCH:
        return {
          ...intialstate,
          actualQtyBatch: action.payload.data,
        };
      case ACTION.FUNC_AUTO_REFRESH:
        return {
          ...intialstate,
          countRefresh: action.payload.count,
        };
      case ACTION.GET_REJECT_BATCH:
        return {
          ...intialstate,
          dataRejectPerBatch: action.payload.data,
        };
      default:
        return state;
    }
  };

  const getProductByPlan = async (date) => {
    try {
      const dataProd = await axios
        .get(`/mixer/product/${date}`)
        .then((response) => response.data);
      return dispatch({
        type: ACTION.GET_PRODUCT_PLAN,
        payload: { data: dataProd },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBatchByPublish = async (date) => {
    await axios
      .get(`/mixer/batch/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_BATCH_PLAN,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Actual Batch', error);
      });
  };

  const getActBatch = async (date) => {
    await axios
      .get(`/dashboards/actualbatch/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_ACTUAL_BATCH,
          payload: { data: response.data.actual },
        });
        dispatch({
          type: ACTION.GET_ALL_BATCH,
          payload: { data: response.data.all },
        });
        dispatch({
          type: ACTION.GET_ACTUAL_QTY_BATCH,
          payload: { data: response.data.totActualBatch },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Batch', error);
      });
  };

  const getChartFG = async (date) => {
    await axios
      .get(`/dashboards/chartFG/${date}/PRODUCTION`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_CHART_FG,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Chart FG', error);
      });
  };

  const getChartFgReworks = async (date) => {
    await axios
      .get(`/dashboards/chartFG/${date}/REWORK`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_CHART_FG_REWORK,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Chart FG', error);
      });
  };

  const getProductsFgReworks = async (date) => {
    await axios
      .get(`/dashboards/prodFG/${date}/REWORK`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_PROD_FG_REWORK,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data PROD Rework FG', error);
      });
  };

  const getPlanFG = async (date) => {
    await axios
      .get(`/dashboards/planFG/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_PLAN_FG,
          payload: { data: response.data.dataTarget },
        });
        dispatch({
          type: ACTION.GET_DATA_TOTAL_PLAN_FG,
          payload: { data: response.data.planTarget },
        });
        dispatch({
          type: ACTION.GET_TOT_TARGET_BATCH,
          payload: { data: response.data.planBatch },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Chart FG', error);
      });
  };

  const getDataChartBatch = async (date) => {
    await axios
      .get(`/dashboards/chartBatch/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_CHART_BATCH,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log('error mendapatkan data Chart FG', error);
      });
  };

  const getTotalReject = async (date) => {
    await axios
      .get(`/dashboards/totReject/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_DATA_TOTAL_REJECT,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getRejectBatch = async (date) => {
    await axios
      .get(`/dashboards/rejectPerBatch/${date}`)
      .then((response) => {
        dispatch({
          type: ACTION.GET_REJECT_BATCH,
          payload: { data: response.data },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [state, dispatch] = useReducer(reducer, intialstate);

  useEffect(() => {
    getProductByPlan(state.date);
    getBatchByPublish(state.date);
    getActBatch(state.date);
    getChartFG(state.date);
    getPlanFG(state.date);
    getDataChartBatch(state.date);
    getChartFgReworks(state.date);
    getProductsFgReworks(state.date);
    getTotalReject(state.date);
    getRejectBatch(state.date);
  }, [state.date, state.countRefresh]);

  return (
    <DashboardContex.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContex.Provider>
  );
};
