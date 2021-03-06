import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import store, {
  me,
  getProductsFromServerThunkerator,
  getReviewsFromServerThunkerator,
  addProductToCart,
} from './store'
import {
  Login,
  Signup,
  UserHome,
  ProductList,
  ViewProduct,
  OrderList,
  UserView,
  Cart,
  CheckoutSummary,
  CheckoutConfirm,
  AdminHome,
  ChangePassword,
} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    store.dispatch(getProductsFromServerThunkerator())
    this.handleLocalStorage()
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
        <Route exact path="/products" component={ProductList} />
        <Route exact path="/products/:productId" component={ViewProduct} />
        <Route exact path="/checkout" component={CheckoutConfirm} />
        <Route exact path="/confirm-order" component={CheckoutSummary} />
        {
          isLoggedIn &&
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/users/my-profile" render={MyUserPage} />
              <Route path="/admin" component={AdminHome} />
              <Route exact path="/orders" component={OrderList} />
              <Route path="/change-password" component={ChangePassword} />
            </Switch>
          }
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
      </Switch>
        </div>
    )
  }

  handleLocalStorage = () => {
    if (localStorage.getItem('cart')) {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.map(item => {
        store.dispatch(addProductToCart(item))
      })
    }
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
    user: state.user,
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
