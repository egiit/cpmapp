import React, { useContext } from 'react';
import { Nav } from 'react-bootstrap';
import {
  FcComboChart,
  FcDeployment,
  FcHome,
  FcServices,
  FcSettings,
} from 'react-icons/fc';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import imgMixer from './iconMixer.ico';
import imgOven from './iconOven.png';
import { AuthContext } from '../auth/AuthProvider';

const Sidebar = () => {
  const { value } = useContext(AuthContext);
  const { userLevel, userDept } = value;

  const parentCollaps = function(i) {
    let childColl = document.getElementById(i);
    let arrowLink = childColl.previousElementSibling;

    childColl.classList.toggle('show');
    arrowLink.classList.toggle('collapsed');
  };

  return (
    <>
      <div id="layoutSidenav_nav">
        <Nav
          defaultActiveKey="/home"
          className="flex-column sb-sidenav accordion shadow "
          id="sidenavAccordion"
          style={{ backgroundColor: '#0052D4' }}
        >
          <div className="sb-sidenav-menu">
            <Nav className="nav mt-4">
              {userLevel === 'admin' || userLevel === 'spv' ? (
                <Link to="mainmenu" className="nav-link ">
                  <div className="sb-nav-link-icon">
                    <FcHome size={20} />
                  </div>
                  Main Menu
                </Link>
              ) : (
                ''
              )}
              <Link to="dashboards" className="nav-link ">
                <div className="sb-nav-link-icon">
                  <FcComboChart size={20} />
                </div>
                Dashboards
              </Link>

              {userLevel === 'admin' ||
              userLevel === 'spv' ||
              userDept === 1 ? (
                <div>
                  <Nav.Link
                    onClick={() => parentCollaps('mixingColaps')}
                    href="#"
                    className="nav-link collapsed"
                    data-bs-toggle="collapsee"
                  >
                    <div className="sb-nav-link-icon">
                      <img
                        className="img-fluid"
                        style={{ width: '1.2rem' }}
                        src={imgMixer}
                        alt=""
                      />
                    </div>
                    Mixer
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Nav.Link>
                  <div className="collapse" id="mixingColaps">
                    <nav className="sb-sidenav-menu-nested ">
                      <Link className="nav-link" to="mixer">
                        Check List
                      </Link>
                      {/* <Link className="nav-link" to="mixer/checklist">
                    Check List Formula
                  </Link> */}
                      <Link className="nav-link" to="mixer/report">
                        Daily Report
                      </Link>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}

              {userLevel === 'admin' ||
              userLevel === 'spv' ||
              userDept === 3 ? (
                <div>
                  <Nav.Link
                    onClick={() => parentCollaps('formingColaps')}
                    href="#"
                    className="nav-link collapsed"
                    data-bs-toggle="collapsee"
                  >
                    <div className="sb-nav-link-icon">
                      <FcServices size={20} />
                    </div>
                    Forming
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Nav.Link>
                  <div className="collapse" id="formingColaps">
                    <nav className="sb-sidenav-menu-nested ">
                      {userLevel === 'admin' || userLevel === 'ADM' ? (
                        <Link className="nav-link" to="forming">
                          Check List
                        </Link>
                      ) : (
                        ''
                      )}
                      <Link className="nav-link" to="forming/report">
                        Daily Report
                      </Link>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}

              {userLevel === 'admin' ||
              userLevel === 'spv' ||
              userDept === 2 ? (
                <div>
                  <Nav.Link
                    onClick={() => parentCollaps('ovenColapse')}
                    href="#"
                    className="nav-link collapsed"
                    data-bs-toggle="collapsee"
                  >
                    <div className="sb-nav-link-icon">
                      <img
                        className="img-fluid"
                        style={{ width: '1.3rem' }}
                        src={imgOven}
                        alt=""
                      />
                    </div>
                    Oven
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Nav.Link>
                  <div className="collapse" id="ovenColapse">
                    <nav className="sb-sidenav-menu-nested ">
                      {userLevel === 'admin' || userLevel === 'ADM' ? (
                        <Link className="nav-link" to="oven">
                          Check List
                        </Link>
                      ) : (
                        ''
                      )}
                      <Link className="nav-link" to="oven/report">
                        Daily Report
                      </Link>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}

              {userLevel === 'admin' ||
              userLevel === 'spv' ||
              userDept === 4 ? (
                <div>
                  <Nav.Link
                    onClick={() => parentCollaps('packingColaps')}
                    href="#"
                    className="nav-link collapsed"
                    data-bs-toggle="collapsee"
                  >
                    <div className="sb-nav-link-icon">
                      <FcDeployment size={20} />
                    </div>
                    Packing
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Nav.Link>
                  <div className="collapse" id="packingColaps">
                    <nav className="sb-sidenav-menu-nested ">
                      {userLevel === 'admin' || userLevel === 'ADM' ? (
                        <Link className="nav-link" to="packing">
                          Check List
                        </Link>
                      ) : (
                        ''
                      )}
                      <Link className="nav-link" to="packing/report">
                        Daily Report
                      </Link>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}

              <Link to="downtime" className="nav-link ">
                <div className="sb-nav-link-icon">
                  <RiAlarmWarningFill color="red" size={20} />
                </div>
                Downtime List
              </Link>

              {userLevel === 'admin' ? (
                <div>
                  <Nav.Link
                    onClick={() => parentCollaps('setupColaps')}
                    href="#"
                    className="nav-link collapsed"
                    data-bs-toggle="collapsee"
                  >
                    <div className="sb-nav-link-icon">
                      <FcSettings size={20} />
                    </div>
                    Setup
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </Nav.Link>
                  <div className="collapse" id="setupColaps">
                    <nav className="sb-sidenav-menu-nested ">
                      <Link className="nav-link" to="register">
                        Setup Users
                      </Link>
                    </nav>
                  </div>
                </div>
              ) : (
                ''
              )}
            </Nav>
          </div>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
