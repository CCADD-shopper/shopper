import React, { Component } from 'react'
import { connect } from 'react-redux'
import {CartItem} from '../cart';

class CheckoutConfirm extends Component{
    constructor(props){
      super(props)
    this.state = {
        addressShipping: {},
        addressBilling: {},
        paymentMethod: {},

    }
      this.findProductById = this.findProductById.bind(this);
    //   this.checkoutHandler = this.checkoutHandler.bind(this);
    }

    findProductById = (productId) => {
        const targetProduct = this.props.productList.find(product => product.id === productId)
        return targetProduct;
      }

    render() {
        // console.log(this.props)
        const {cartItems} = this.props
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
                <div className="checkout-item">
                    <h4>Shipping Address</h4>
                    <label>Address*</label>
                    <input type="text" name="" id="" value="" size="35" />
                    <label>Address 2</label>
                    <input type="text" name="" id="" value="" />
                    <label>City*</label>
                    <input type="text" name="" id="" value="" />
                    <label>State*</label>
                    <input type="text" name="" id="" value="" />
                    <label>ZIP/Postal Code*</label>
                    <input type="text" name="" id="" value="" />
                </div>
                <div className="checkout-item">
                <h4>Payment Method</h4>
                    <label>Credit Card Type</label>
                    <select>
                        <option>VISA</option>
                        <option>Mastercard</option>
                        <option>American Express</option>
                        <option>Big Joe's Credit Hut</option>
                    </select>
                    <label>Credit Card Number*</label>
                    <input type="text" name="" id="" value="" size="35" />
                    <label>CVC Code*</label>
                    <input type="text" name="" id="" value="" size="5" />
                    <label>Expiration(MM/YYYY)*</label>
                    <input type="text" name="" id="" value="" size="10" />
                    <label>Billing ZIP/Postal Code*</label>
                    <input type="text" name="" id="" value="" />
                </div>
                <div className="checkout-item">
                <h4>Billing Address</h4>
                    <label>Address*</label>
                    <input type="text" name="" id="" value="" size="35" />
                    <label>Address 2</label>
                    <input type="text" name="" id="" value="" />
                    <label>City*</label>
                    <input type="text" name="" id="" value="" />
                    <label>State*</label>
                    <input type="text" name="" id="" value="" />
                    <label>ZIP/Postal Code*</label>
                    <input type="text" name="" id="" value="" />
                    </div>
                    <br />
                </div>
                    <p>* required field</p>
                <button className="ui green button" onClick={() => this.checkoutHandler}>Gimme Da Loot</button>
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
