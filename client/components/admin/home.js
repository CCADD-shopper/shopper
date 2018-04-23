import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import store, {
  getOrdersFromServerThunkerator,
} from '../../store'
import {
  OrderList,
  OrderItem,
  ViewProduct,
  AddProduct,
  ProductList,
  UserList
} from '../../components'


class AdminHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount () {
    store.dispatch(getOrdersFromServerThunkerator(this.props.user.id))
  }

  render() {
    return (
      <div className="adminPageWrapper">
        <div className="navLinks">

          <NavLink to="/admin/add-product">Add Product</NavLink>
          <NavLink to="/admin/product-list">Product List</NavLink>
          <NavLink to="/admin/user-list">User List</NavLink>
          <NavLink to="/admin/order-list">Order List</NavLink>

          <h1>I am the admin page</h1>
          <Switch>
            <Route exact path="/admin/add-product" component={AddProduct} />
            <Route exact path="/admin/product-list" component={ProductList} />
            <Route exact path="/admin/user-list" component={UserList} />
            <Route exact path="/admin/order-list" component={OrderList} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
