import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {user} = props

  return (
    <div className="mainContent">
      <div className="homeGreet">
        <h1 className="homeItem ">Welcome to TopShop {user.firstName}</h1>
        <a  className="homeItem" href="/products"><p>View Our Products</p></a>
        <a  className="homeItem" href="/users/my-profile"><p>View My profile</p></a>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
