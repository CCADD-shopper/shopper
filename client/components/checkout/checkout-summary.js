import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from '../cart';
// import { clearCart } from '../../store/cart'

const CartSummary = (props) => {
    return (
        <div className="checkout summary">
            <p>Success!!! Your order has been placed!</p>
            <ul>
                <li>Total</li>
                <li>Status</li>
                <li>Order #</li>
                <li>Line Items #1</li>
                <li>Line Items #2</li>
                {/* <li></li> */}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        processedOrder: state.userCartOrderId }
    };

const mapDispatchToProps = null


export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
