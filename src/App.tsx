import React, { useState } from 'react';
import './App.scss';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faRocket } from '@fortawesome/free-solid-svg-icons';

import CustomLink from './HOCs/CustomLink';
import useAuth from './hooks/useAuth';
import { AUTH_LOGIN_PATH } from './utils/constants';

function App(): React.ReactElement {
  const [expand, setEexpand] = useState(false);
  const navigate = useNavigate();
  const { signout } = useAuth();

  const handleToggleNav = () => {
    setEexpand(!expand);
  };

  const handleSignout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // To do singout app
    // await call api signout
    signout(() => {
      navigate(AUTH_LOGIN_PATH, { replace: true });
    });
  };

  return (
    <div id="dashboard">
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" to="/dashboard">
          101 Digital
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded={expand}
          aria-label="Toggle navigation"
          onClick={handleToggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav d-none d-sm-none d-md-block">
          <div className="nav-item text-nowrap">
            <button type="button" className="btn btn-outline-danger mx-3" onClick={(e) => handleSignout(e)}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className={`col-md-3 col-lg-2 d-md-block bg-light sidebar collapse ${expand ? 'show' : null}`}
          >
            <div className="position-sticky sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <CustomLink to="/dashboard">
                    <i className="iconNav">
                      <FontAwesomeIcon icon={faEarthAsia} />
                    </i>
                    Dashboard
                  </CustomLink>
                </li>
                <li className="nav-item">
                  <CustomLink to="/invoice/create">
                    <i className="iconNav">
                      <FontAwesomeIcon icon={faRocket} />
                    </i>
                    Create Invoice
                  </CustomLink>
                </li>
              </ul>
              <button
                type="button"
                className="btn btn-outline-danger mx-3 d-sm-block d-md-none"
                onClick={(e) => handleSignout(e)}
              >
                Sign out
              </button>
            </div>
          </nav>

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
