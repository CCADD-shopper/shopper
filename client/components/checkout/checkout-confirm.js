import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {CartItem} from '../cart';

class CheckoutConfirm extends Component{
    constructor(props){
      super(props)
      this.state = {
            firstName: '',
            lastName: '',
            email: '',
            shipAddress1: '',
            shipAddress2: '',
            shipCity: '',
            shipState: '',
            shipZip: undefined,
            billAddress1: '',
            billAddress2: '',
            billCity: '',
            billState: '',
            billZip: undefined,
            payCreditCard: 'VISA',
            payCcNumber: undefined,
            payCvcCode: undefined,
            payExpiry: undefined,
            payZip: undefined,
        }

        this.findProductById = this.findProductById.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    //   this.handleSubmit = this.handleSubmit.bind(this);


    handleChange(event) {
        const name = event.target.name;
        console.log('name', name);
        this.setState({
          [name]: event.target.value
        })
      }

    findProductById = (productId) => {
        const targetProduct = this.props.productList.find(product => product.id === productId)
        return targetProduct;
      }

    render() {
        console.log(this.state)
        const {cartItems} = this.props
        // const shipTo = this.state.addressShipping;
        // const billTo = this.state.addressBilling;
        // const payFrom = this.state.paymentMethod;
    return (
        <div className="checkout-summary">
            <div>
                <h2> Your Order Summary</h2>
                <h3>Items</h3>
                {cartItems.length ? (cartItems.map(cartItem => {
                 const product = this.findProductById(cartItem.productId)
                    return (
                    <div key={cartItem.productId}>
                    <CartItem product={product} quantity={cartItem.quantity} />
                    </div>)
                })) : <h3>No items</h3>}
            </div>
            <form>
                <div className="checkout-form">
                    <div className="checkout-info">
                    <h4>Personal Info</h4>
                        <label>First Name*</label>
                        <input type="text" name="firstName" id="" value={this.state.firstName} onChange={this.handleChange} size="40" />
                        <label>Last Name</label>
                        <input type="text" name="lastName" id="" value={this.state.lastName} onChange={this.handleChange} size="40" />
                        <label>Email*</label>
                        <input type="text" name="email" id="" value={this.state.email} onChange={this.handleChange} size="40" />
                    </div>
                </div>
                <div className="checkout-form">
                    <div className="checkout-item">
                        <h4>Shipping Address</h4>
                        <label>Address*</label>
                        <input type="text" name="shipAddress1" id="" value={this.state.shipAddress1} size="35" onChange={this.handleChange} />
                        <label>Address 2</label>
                        <input type="text" name="shipAddress2" id="" value={this.state.shipAddress2} onChange={this.handleChange} />
                        <label>City*</label>
                        <input type="text" name="shipCity" id="" value={this.state.shipCity} onChange={this.handleChange} />
                        <label>State*</label>
                        <input type="text" name="shipState" id="" value={this.state.shipState} onChange={this.handleChange} />
                        <label>ZIP/Postal Code*</label>
                        <input type="text" name="shipShipping.zip" id="" value={this.state.shipZip} onChange={this.handleChange} />
                    </div>
                    <div className="checkout-item">

                    <h4>Payment Method</h4>
                        <label>Credit Card Type</label>
                        <select name="payCreditCard" value={this.state.payCreditCard}>
                            <option>VISA</option>
                            <option>Mastercard</option>
                            <option>American Express</option>
                            <option>Big Joe's Credit Hut</option>
                        </select>
                        <label>Credit Card Number*</label>
                        <input type="text" name="payCcNumber" id="" value={this.state.payCcNumber} size="35" onChange={this.handleChange} />
                        <label>CVC Code*</label>
                        <input type="text" name="payCvcCode" id="" value={this.state.payCvcCode} size="5" onChange={this.handleChange} />
                        <label>Expiration(MM/YYYY)*</label>
                        <input type="text" name="payExpiry" id="" value={this.state.payExpiry} size="10" onChange={this.handleChange} />
                        <label>Billing ZIP/Postal Code*</label>
                        <input type="text" name="payZip" id="" value={this.state.payZip} onChange={this.handleChange} />
                    </div>
                    <div className="checkout-item">
                    <h4>Billing Address</h4>
                        <label>Address*</label>
                        <input type="text" name="billAddress1" id="" value={this.state.billAddress1} size="35" onChange={this.handleChange} />
                        <label>Address 2</label>
                        <input type="text" name="billAddress2" id="" value={this.state.billAddress2} onChange={this.handleChange} />
                        <label>City*</label>
                        <input type="text" name="billCity" id="" value={this.state.billCity} onChange={this.handleChange} />
                        <label>State*</label>
                        <input type="text" name="billState" id="" value={this.state.billState} onChange={this.handleChange} />
                        <label>ZIP/Postal Code*</label>
                        <input type="text" name="billZip" id="" value={this.state.billZip} onChange={this.handleChange} />
                    </div>
                    <br />
                </div>
                    <p>* required field</p>
                    <Link to="/confirm-order">
                        <button className="ui green button" onClick={() => this.checkoutHandler}>Rich Boy Selling Crack</button>
                    </Link>
                  </form>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      productList: state.productList,
      cartItems: state.cart,
    }
  }


const mapDispatchToProps = null


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirm);
