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
import MixingDayReport from './components/page/reports/MixingDayReport';
import HeaderForm from './components/page/HeaderForm';
import MixingCheckListFormula from './components/page/MixingCheckListFormula';
// import { useAuth } from './components/auth/AuthProvider';
// export const AuthContext = createContext(null);

function App() {
  // const { userId } = useAuth();
  // const [menus, setMenus] = useState([]);
  // const [linkElemen, setLinkElemen] = useState([])

  // useEffect(() => {
  //   const menuAccessView = async () => {
  //     await axios
  //       .get(`http://localhost:3001/useraccess/menuview/${userId}`)
  //       .then((response) => setMenus(response.data))
  //       .then(() => {
  //         const linkMenu = []
  //         menus.map(menu => linkMenu.push[`<${menu.MENU_FORM} />`] )
  //         setLinkElemen(linkMenu)
  //       })
  //       .catch((error) => {
  //         if (error.response) return error.response.data.message;
  //       });
  //   };
  //   menuAccessView();
  // }, [setMenus, userId, setLinkElemen]);

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
        <Route path="dashboards" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="mixer" element={<Mixing />} />
        <Route path="mixer/checklist" element={<MixingCheckListFormula />} />
        <Route path="mixer/report" element={<MixingDayReport />} />
        <Route path="headerform" element={<HeaderForm />} />
        <Route path="headerform/edit" element={<HeaderForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
