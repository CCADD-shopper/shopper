import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {CartItem} from '../cart';
import { getCartOrderIdThunkerator, addLineItemThunkerator, createTempUserThunkerator, getAllItemsThunkerator, updateOrderStatusThunkerator, createOrderDetailThunkerator } from '../../store'
import { FormErrors } from './form-errors'
import axios from 'axios'

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
            shipZip: '',
            billAddress1: '',
            billAddress2: '',
            billCity: '',
            billState: '',
            billZip: '',
            payCreditCard: 'VISA',
            payCcNumber: '',
            payCvcCode: '',
            payExpiry: '',
            payZip: '',
            formErrors: {firstName: '',
                lastName: '',
                email: '',
                shipAddress1: '',
                shipCity: '',
                shipZip: '',
                billAddress1: '',
                billCity: '',
                billState: '',
                billZip: '',
                payCreditCard: '',
                payCcNumber: '',
                payCvcCode: '',
                payExpiry: '',
                payZip: '' },
            // firstNameValid: false,
            // lastNameValid: false,
            emailValid: false,
            // shipAddressValid: false,
            // billAddressValid: false,
            formValid: false,
            fieldsFilled: false,
        }

        this.findProductById = this.findProductById.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkoutHandler = this.checkoutHandler.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;

        switch (fieldName) {
            case 'email' :
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            default:
                fieldValidationErrors[fieldName] = value.length > 0 ? '' : ' is required'

        }

    this.setState({formErrors: fieldValidationErrors, emailValid: emailValid}, this.validateForm)
    }

    async validateForm() {

        await this.setState({fieldsFilled: this.state.firstName.length > 0 &&
        this.state.lastName.length > 0 &&
        this.state.shipAddress1.length > 0 &&
        this.state.shipCity.length > 0 &&
        this.state.shipState.length > 0 &&
        this.state.shipZip.length > 0 &&
        this.state.billAddress1.length > 0 &&
        this.state.billCity.length > 0 &&
        this.state.billState.length > 0 &&
        this.state.billZip.length > 0 &&
        this.state.payCreditCard.length > 0 &&
        this.state.payCcNumber.length > 0 &&
        this.state.payExpiry.length > 0 &&
        this.state.payZip.length > 0})

        this.setState({formValid: this.state.emailValid && this.state.fieldsFilled})
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
          [name]: value
        }, () => { this.validateField(name, value)})
      }

    findProductById = (productId) => {
        const targetProduct = this.props.productList.find(product => product.id === productId)
        return targetProduct;
      }

    checkoutHandler = async(event) => {
        event.stopPropagation();
        const details = {
            orderId: this.props.orderId,
            shipAddress1: this.state.shipAddress1,
            shipAddress2: this.state.shipAddress2,
            shipCity: this.state.shipCity,
            shipState: this.state.shipState,
            shipZip: this.state.shipZip,
            billAddress1: this.state.billAddress1,
            billAddress2: this.state.billAddress2,
            billCity: this.state.billCity,
            billState: this.state.billState,
            billZip: this.state.billZip,
            payCreditCard: this.state.payCreditCard,
            payCcNumber: this.state.payCcNumber,
            payCvcNumber: this.state.payCvcCode,
            payExpiry: this.state.payExpiry,
            payZip: this.state.payZip,
        }
        if (!this.props.isLoggedIn) {
            const userToBe = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email}
            const cartToBe = this.props.cartItems.slice();
            await this.props.createTempUserThunkerator(userToBe, cartToBe, details);
    }
        else {
            await this.props.updateOrderStatusThunkerator(this.props.orderId, 'processing')
            await this.props.createOrderDetailThunkerator(this.props.orderId, details)
        }
    }

    render() {
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
                    <div className="checkout-info">
                    <h4>Personal Info</h4>
                        <label>First Name*</label>
                        <input type="text" name="firstName" id="" value={this.state.firstName} onChange={this.handleChange} size="40" required />
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
                        <input type="text" name="shipZip" id="" value={this.state.shipZip} onChange={this.handleChange} />
                    </div>
                    <div className="checkout-item">

                    <h4>Payment Method</h4>
                        <label>Credit Card Type</label>
                        <select name="payCreditCard" value={this.state.payCreditCard} onChange={this.handleChange} >
                            <option>VISA</option>
                            <option>Mastercard</option>
                            <option>American Express</option>
                            <option>Big Joes Credit Hut</option>
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
                <div>
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                    <p>* required field</p>
                    {/* <Link to="/confirm-order">
                        <button className="ui green button" onClick={this.checkoutHandler} disabled={!this.state.formValid}>Complete Checkout</button>
                    </Link> */}

                        <button type="submit" className="ui green button" onClick={this.checkoutHandler} disabled={!this.state.formValid}>
                            <Link to="/confirm-order"> <span>Complete Checkout </span> </Link>
                        </button>


                  </form>
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
      isLoggedIn: !!state.user.id,
      productList: state.productList,
      cartItems: state.cart,
      orderId: state.userCartOrderId
    }
  }


const mapDispatchToProps = { createTempUserThunkerator, addLineItemThunkerator, getCartOrderIdThunkerator, getAllItemsThunkerator, updateOrderStatusThunkerator, createOrderDetailThunkerator }


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirm);
