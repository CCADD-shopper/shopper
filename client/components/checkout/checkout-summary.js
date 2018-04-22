import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartItem from '../cart';
// import { clearCart } from '../../store/cart'

const CartSummary = (props) => {

    return (
        <div className="checkout summary">
            <p>what's up</p>
        </div>
    )
}

const mapStateToProps = null;

const mapDispatchToProps = null


export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
