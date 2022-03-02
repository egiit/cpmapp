import React, { useState, createContext, useEffect } from 'react';
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

  useEffect(() => {
    const refreshToken = async () => {
      return await axios
        .get(`/token`)
        .then((response) => {
          // console.log(response.data.accessToken);
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setActiveId(decoded.userId);
          setActiveUser(decoded.username);
          setExpire(decoded.exp);
        })
        .catch((error) => {
          if (error.response) return navigate('/');
        });
    };
    refreshToken();
    chgangeBg();
  }, [navigate]);

  const value = {
    token: token,
    userId: activeId,
    username: activeUser,
    expire: expire,
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
