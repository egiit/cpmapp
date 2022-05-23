import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardProvider } from '../provider/Dashboard.provider';

function DashboardMap() {
  return (
    <DashboardProvider>
      <Outlet />
    </DashboardProvider>
  );
}

export default DashboardMap;
