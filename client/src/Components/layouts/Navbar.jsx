import React, { Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";

import { useDispatch } from "react-redux";

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const history = useHistory();
  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li>
        <NavLink to="/posts">
          <i className="fa fa-bullhorn" aria-hidden="true"></i>{" "}
          <span className="hide-sm">Posts</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/profiles">
          <i className="fas fa-users"></i>{" "}
          <span className="hide-sm">Developers</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </NavLink>
      </li>
    </ul>
  );

  const guestLink = (
    <ul>
      <li>
        <NavLink to="/profiles">
          <i className="fas fa-users"></i>{" "}
          <span className="hide-sm">Developers</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">
          <i className="fas fa-code"></i> DevConnector
        </NavLink>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLink}</Fragment>
      )}
    </nav>
  );
};

export default Navbar;
