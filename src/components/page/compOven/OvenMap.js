import React from 'react';
import { Outlet } from 'react-router-dom';
import { OvenProvider } from '../provider/Oven.provider';

function OvenMap() {
  return (
    <OvenProvider>
      <Outlet />
    </OvenProvider>
  );
}

export default OvenMap;
