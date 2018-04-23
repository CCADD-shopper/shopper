import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error, signup} = props

  return (
    <div className="ui center aligned basic segment">
      <form onSubmit={handleSubmit} name={name}>
        {signup &&
          <div>
            <div>
              <label htmlFor="first"><medium>First Name</medium></label>
              <input name="first" type="text" />
            </div>
            <div>
              <label htmlFor="last"><medium>Last Name</medium></label>
              <input name="last" type="text" />
            </div>
          </div>}
        <div>
          <label htmlFor="email"><medium>Email</medium></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><medium>Password</medium></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="ui button" type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>

        <div className="ui horizontal divider">Or</div>

      <button className="ui google plus button">
        <i className= "google icon" />
      <a href="/auth/google">  <div className="googlelink">
         <h2>{displayName} with Google</h2>
    </div>
  </a>
</button>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    signup: true
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      let user;
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      if (formName === 'signup'){
        const firstName = evt.target.first.value
        const lastName = evt.target.last.value
        user = {email, password, firstName, lastName}
      }
      else {
        user = {email, password}
      }
      dispatch(auth(user, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
