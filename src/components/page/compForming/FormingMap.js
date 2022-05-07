import React from 'react';
import { Outlet } from 'react-router-dom';
import { FormingProvider } from '../provider/Forming.provider';

function FormingMap() {
  return (
    <FormingProvider>
      <Outlet />
    </FormingProvider>
  );
}

export default FormingMap;
