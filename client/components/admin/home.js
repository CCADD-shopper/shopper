import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import store, {
  getOrdersFromServerThunkerator,
  activateAdmin,
  deactivateAdmin,
} from '../../store'
import {
  OrderList,
  AddProduct,
  ProductList,
  UserList,
  Categories,
} from '../../components'


class AdminHome extends React.Component {
  constructor() {
    super()
  }

  componentDidMount () {
    store.dispatch(getOrdersFromServerThunkerator(this.props.user.id))
    store.dispatch(activateAdmin())
  }

  componentWillUnmount () {
    store.dispatch(deactivateAdmin())
  }

  render() {
    return (
      <div className="adminPageWrapper">
        <div className="navLinks">

          <NavLink to="/admin/add-product">Add Product</NavLink>
          <NavLink to="/admin/product-list">Product List</NavLink>
          <NavLink to="/admin/user-list">User List</NavLink>
          <NavLink to="/admin/order-list">Order List</NavLink>
          <NavLink to="/admin/categories">Categories</NavLink>

          <h1>I am the admin page</h1>
          <Switch>
            <Route exact path="/admin/edit-product/:productId" render={() => <AddProduct categories={this.props.selectedCategories} />} />
            <Route exact path="/admin/add-product" render={() => <AddProduct categories={this.props.selectedCategories} />} />
            <Route exact path="/admin/product-list" component={ProductList} />
            <Route exact path="/admin/user-list" component={UserList} />
            <Route exact path="/admin/order-list" component={OrderList} />
            <Route exact path="/admin/categories" component={Categories} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, selectedCategories }) => ({ user, selectedCategories })

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome)
