import React from "react";
import { NavLink } from "react-router-dom";
import './MainNavigation.css';

const MainNavigation = () => {
  return (
    <header>
      <div className="mainContainer">
        <nav className="mainNavigation">
          <NavLink
            exact
            to="/"
            className="mainNavigation_link"
            activeClassName="mainNavigation_activeLink"
          >
            Home
          </NavLink>

          <NavLink
            to="/movies"
            className="mainNavigation_link"
            activeClassName="mainNavigation_activeLink"
          >
            Movies
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default MainNavigation;