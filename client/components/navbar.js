import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, clearCart} from '../store'
import SearchBar from './searchbar';

const Navbar = ({ handleClick, isLoggedIn, cartCount, user }) => (
  <div className="navBar">
      <Link to="/home">
        <div className="logo">
          <img src="/images/TopShop-logo-white.png" />
        </div>
      </Link>
      <div className="allProds">
        <Link to="/products">All Products</Link>
      </div>


    <nav className="navLinks">
    <SearchBar />
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
            {
              user.isAdmin
                ? <Link to="/admin">Admin Panel</Link>
                : ''
            }
              <Link to="/users/my-profile">Account</Link>
              <a href="#" onClick={handleClick}>Logout</a>
              <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cartCount: state.cart.length,
    user: state.user,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
