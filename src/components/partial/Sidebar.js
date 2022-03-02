import { Nav } from 'react-bootstrap';
import { FcComboChart, FcDeployment } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const parentCollaps = function (i) {
    let childColl = document.getElementById(i);
    let arrowLink = childColl.previousElementSibling;

    childColl.classList.toggle('show');
    arrowLink.classList.toggle('collapsed');
  };

  return (
    <div id="layoutSidenav_nav">
      <Nav
        defaultActiveKey="/home"
        className="flex-column sb-sidenav accordion shadow-sm"
        id="sidenavAccordion"
        style={{ backgroundColor: 'white' }}
      >
        <div className="sb-sidenav-menu">
          <Nav className="nav mt-4">
            <Link to="dashboards" className="nav-link ">
              <div className="sb-nav-link-icon">
                <FcComboChart size={20} />
              </div>
              Dashboards
            </Link>
            <div></div>
            <Nav.Link
              onClick={() => parentCollaps('mixingColaps')}
              href="#"
              className="nav-link collapsed"
              data-bs-toggle="collapsee"
            >
              <div className="sb-nav-link-icon">
                <FcDeployment size={20} />
              </div>
              Mixing
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Nav.Link>
            <div className="collapse" id="mixingColaps">
              <nav className="sb-sidenav-menu-nested ">
                <Link className="nav-link" to="mixing">
                  Ceheck List
                </Link>
                <Link className="nav-link" to="mixing/report">
                  Daily Report
                </Link>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Summary Report
                </a>
              </nav>
            </div>
            <Nav.Link
              onClick={() => parentCollaps('formingColaps')}
              href="#"
              className="nav-link collapsed"
              data-bs-toggle="collapsee"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Forming
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Nav.Link>
            <div className="collapse" id="formingColaps">
              <nav className="sb-sidenav-menu-nested ">
                <a className="nav-link" href="/productions/sewing/output">
                  Output
                </a>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Daily Report
                </a>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Summary Report
                </a>
              </nav>
            </div>
            <Nav.Link
              onClick={() => parentCollaps('ovenColaps')}
              href="#"
              className="nav-link collapsed"
              data-bs-toggle="collapsee"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
              </div>
              Oven
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down"></i>
              </div>
            </Nav.Link>
            <div className="collapse" id="ovenColaps">
              <nav className="sb-sidenav-menu-nested ">
                <a className="nav-link" href="/productions/sewing/output">
                  Output
                </a>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Daily Report
                </a>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Summary Report
                </a>
              </nav>
            </div>
            <Nav.Link
              onClick={() => parentCollaps('setupColaps')}
              href="#"
              className="nav-link collapsed"
              data-bs-toggle="collapsee"
            >
              <div className="sb-nav-link-icon">
                <i className="fas fa-columns"></i>
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
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Daily Report
                </a>
                <a className="nav-link" href="/productions/sewing/daily-report">
                  Summary Report
                </a>
              </nav>
            </div>
          </Nav>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
