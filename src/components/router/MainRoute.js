import React from 'react';
import { Outlet } from 'react-router-dom';
import { Message } from '../page/Message';
import Navhead from '../partial/Navhead';
import Sidebar from '../partial/Sidebar';
import { Flasher } from 'react-universal-flash';

function MainRoute() {
  const styleContentN = {
    content: '',
    display: 'block',
    position: 'absolute',
    top: '54px',
    left: 0,
    width: '100%',
    height: '100%',
    zindex: 1037,
    transition: 'opacity 0.3s ease-in-out',
  };

  return (
    <>
      <Navhead />
      <div id="layoutSidenav">
        <Sidebar />
        <div className="layoutSidenav_content" style={styleContentN}>
          <Flasher position="bottom_right">
            <Message />
          </Flasher>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainRoute;
