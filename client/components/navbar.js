import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = function () {

  return (
    <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-light bg-faded">
      <div id="navigation" className="col-md-12 thenav">
        <ul>
          <li className="theNav"><NavLink exact to="/" activeClassName="active">HOME</NavLink></li>
          <li className="theNav"><NavLink to="/newBlog" activeClassName="active">NEW</NavLink></li>
          <li className="theNav"><NavLink to="/blogs" activeClassName="active">BLOGS</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar;
