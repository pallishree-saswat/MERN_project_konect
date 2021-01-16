import React from 'react';
import './SideDrawer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


function SideDrawer({ show }) {

    const links = () => (
<div>
      <ul>
        <Link to='/cart'>
          <li>Cart</li>
        </Link>
        <Link to='/orders'>
          <li>Orders</li>
        </Link>
        <Link to='/signup'>
          <li>SignUp</li>
        </Link>
        <Link to='/login'>
          <li>Login</li>
        </Link>
      </ul>


      <ul>
        <Link to='/cart'>
          <li>Cart</li>
        </Link>
        <Link to='/orders'>
          <li>Orders</li>
        </Link>
        <Link to='/' >
          <li>Logout</li>
        </Link>
      </ul>
      </div>
    )

  let drawerClasses = 'sideDrawer';
  if (show) {
    drawerClasses = 'sideDrawer open';
  }
  return <nav className={drawerClasses}>{links}</nav>;
}

/* const mapStateToProps = (state) => ({
  auth: state.auth,
}); */
export default SideDrawer;