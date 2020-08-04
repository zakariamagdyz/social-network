import React, { Fragment, useEffect, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/auth";
import { clearAlerts } from "../../../redux/actions/alert";
import { NavBar } from "./Navbar.style";

const navbarVariants = {
  hidden: { y: "-10vh", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" } },
};

const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    if (alert.length > 0) {
      dispatch(clearAlerts());
    }
  }, [location]);

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
    <NavBar variants={navbarVariants} initial="hidden" animate="visible">
      <h1>
        <NavLink to="/">
          <i className="fas fa-code"></i> DevNetwork
        </NavLink>
      </h1>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLink}</Fragment>
      )}
    </NavBar>
  );
};

export default Navbar;
