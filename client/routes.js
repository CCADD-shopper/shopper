import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import store, {
  me,
  getProductsFromServerThunkerator,
  getOrdersFromServerThunkerator,
} from './store'
import { Login, Signup, UserHome, ProductList, ViewProduct, OrderList, UserView, Cart } from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    store.dispatch(getProductsFromServerThunkerator());
    store.dispatch(getOrdersFromServerThunkerator());
  }

  render() {
    const { isLoggedIn, user } = this.props

    const MyUserPage = (props) => {
      return (
        <UserView
          user={user}
          {...props} />
      )
    }
    return (
      <div className="mainContent">
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products/:productId" component={ViewProduct} />
        <Route exact path="/products" component={ProductList} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/users/my-profile" render={MyUserPage} />
              <Route exact path="/orders" component={OrderList} />
            </Switch>
          }
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
      </Switch>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
