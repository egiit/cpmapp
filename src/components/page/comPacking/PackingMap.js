import React from 'react';
import { Outlet } from 'react-router-dom';
import { PackingProvider } from '../provider/Packing.provider';

function PackingMap() {
  return (
    <PackingProvider>
      <Outlet />
    </PackingProvider>
  );
}

export default PackingMap;
