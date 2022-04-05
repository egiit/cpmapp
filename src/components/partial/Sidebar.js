import React from 'react';
import { Nav } from 'react-bootstrap';
import { FcComboChart, FcDeployment, FcHome, FcSettings } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import imgMixer from './iconMixer.ico';
import imgOven from './iconOven.png';

const Sidebar = () => {
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
              <Link to="mainmenu" className="nav-link ">
                <div className="sb-nav-link-icon">
                  <FcHome size={20} />
                </div>
                Main Menu
              </Link>
              <Link to="dashboards" className="nav-link ">
                <div className="sb-nav-link-icon">
                  <FcComboChart size={20} />
                </div>
                Dashboards
              </Link>

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
              <Nav.Link
                onClick={() => parentCollaps('formingColaps')}
                href="#"
                className="nav-link collapsed"
                data-bs-toggle="collapsee"
              >
                <div className="sb-nav-link-icon">
                  <img
                    className="img-fluid"
                    style={{ width: '1.2rem' }}
                    src={imgOven}
                    alt=""
                  />
                </div>
                Forming & Oven
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </Nav.Link>
              <div className="collapse" id="formingColaps">
                <nav className="sb-sidenav-menu-nested ">
                  <Link className="nav-link" to="forming">
                    Check List
                  </Link>
                  {/* <a
                    className="nav-link"
                    href="/productions/sewing/daily-report"
                  >
                    Daily Report
                  </a>
                  <a
                    className="nav-link"
                    href="/productions/sewing/daily-report"
                  >
                    Summary Report
                  </a> */}
                </nav>
              </div>
              <Nav.Link
                onClick={() => parentCollaps('formingColaps')}
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
              <div className="collapse" id="formingColaps">
                <nav className="sb-sidenav-menu-nested ">
                  {/* <Link className="nav-link" to="forming">
                    Check List
                  </Link> */}
                  {/* <a
                    className="nav-link"
                    href="/productions/sewing/daily-report"
                  >
                    Daily Report
                  </a>
                  <a
                    className="nav-link"
                    href="/productions/sewing/daily-report"
                  >
                    Summary Report
                  </a> */}
                </nav>
              </div>

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
            </Nav>
          </div>
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
