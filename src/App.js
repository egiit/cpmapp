import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import axios from 'axios';

import Register from './components/page/Register';
import Login from './components/page/Login';
import MainRoute from './components/router/MainRoute';
import Dashboard from './components/page/Dashboard';
import NotFound from './components/page/NotFound';
import Mixing from './components/page/Mixing';
import ProtectedRouter from './components/auth/ProtectedRouter';
import MixingDayReport from './components/page/compMixing/MixingDayReport';
import HeaderForm from './components/page/HeaderForm';
import MixingCheckListFormula from './components/page/MixingCheckListFormula';
import Forming from './components/page/Forming';
import MainMenu from './components/page/MainMenu';
import FormingDayReport from './components/page/compForming/FormingDayReport';
import FormingMap from './components/page/compForming/FormingMap';
import OvenMap from './components/page/compOven/OvenMap';
import Oven from './components/page/Oven';
import OvenDayReport from './components/page/compOven/OvenDayReport';
import Downtime from './components/page/Downtime';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        element={
          <ProtectedRouter>
            <MainRoute />
          </ProtectedRouter>
        }
      >
        <Route path="mainmenu" element={<MainMenu />} />
        <Route path="dashboards" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="downtime" element={<Downtime />} />
        <Route path="mixer" element={<Mixing />} />
        <Route path="mixer/checklist" element={<MixingCheckListFormula />} />
        <Route path="mixer/report" element={<MixingDayReport />} />
        <Route element={<FormingMap />}>
          <Route path="forming" element={<Forming />} />
          <Route path="forming/report" element={<FormingDayReport />} />
        </Route>
        <Route element={<OvenMap />}>
          <Route path="oven" element={<Oven />} />
          <Route path="oven/report" element={<OvenDayReport />} />
        </Route>
        <Route path="headerform" element={<HeaderForm />} />
        <Route path="headerform/edit" element={<HeaderForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
