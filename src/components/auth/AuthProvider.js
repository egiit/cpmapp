import React, { useState, createContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import jwt_decode from 'jwt-decode';
import axios from '../axios/axios.js';
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState('');
  const [activeId, setActiveId] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [userDept, setuserDept] = useState('');
  const [userLevel, setuserLevel] = useState('');

  const refreshToken = async () => {
    return await axios
      .get(`/token`)
      .then((response) => {
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setActiveId(decoded.userId);
        setActiveUser(decoded.username);
        setExpire(decoded.exp);
        setuserDept(decoded.userDept);
        setuserLevel(decoded.userLevel);
        // console.log(decoded);
      })
      .catch((error) => {
        if (error.response) return navigate('/');
      });
  };

  useEffect(() => {
    refreshToken();
    chgangeBg();
  }, [navigate]);

  const value = {
    token: token,
    userId: activeId,
    username: activeUser,
    expire: expire,
    userDept: userDept,
    userLevel: userLevel,
  };

  const chgangeBg = () => {
    const checkParams = window.location.pathname;
    const bgBody = document.body.classList;
    if (checkParams === '/' && bgBody.contains('bg-light')) {
      bgBody.remove('bg-light');
      bgBody.add('bg-primary');
    } else if (checkParams !== '/' && bgBody.contains('bg-primary')) {
      bgBody.remove('bg-primary');
      bgBody.add('bg-light');
    }
  };

  const initialState = { spin: false };
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LAUNCH_LOADING':
        return { spin: action.payload };
      default:
        return state;
    }
  };

  const [loading, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ value, loading, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useLoading = () => {
//   return React.useContext(AuthContext);
// };
