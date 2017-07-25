import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import NavBar from './navbar'
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const {children, handleClick, isLoggedIn} = props;

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-fixed-top navbar-toggleable-md navbar-light bg-faded">
        <div id="navigation" className="col-md-12 thenav">
          <ul>
          <li className="theNav"><NavLink exact to="/" activeClassName="active">HOME</NavLink></li>
          <li className="theNav"><NavLink to="/blogs" activeClassName="active">BLOGS</NavLink></li>
        {
          isLoggedIn ?
            <div>
              {/* The navbar will show these links after you log in */}
              <li><Link to="/home">Home</Link></li>
              <li className="theNav"><NavLink to="/newBlog" activeClassName="active">NEW</NavLink></li>
              <li><a href="#" onClick={handleClick}>Logout</a></li>
            </div> :
            <div>
              {/* The navbar will show these links before you log in */}
             <li><Link to="/login">Login</Link> </li>
             <li><Link to="/signup">Sign Up</Link> </li>
            </div>
        }
            </ul>
          </div>
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
