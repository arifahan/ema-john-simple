import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;   
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    } 

    let shippingCost = 0;
    if(total > 40) {
        shippingCost = 1.99;
    }
    else if (total > 15){
        shippingCost = 2.99;
    }
    else if (total > 0){
        shippingCost = 4.99;
    }
    const tax = total/10;

    function formatNumber(num){
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const toralBefoteTax = total + shippingCost;
    const grandTotal = total + tax + shippingCost;
    return (
        <div className='cart-summery'>
            <h3>Order Summary</h3>
            <p><small>items: <strong>{cart.length}</strong></small></p>
            <p><small>Shipping & Handling: <strong>{shippingCost}</strong></small></p>
            <p><small>Total Before tax: <strong>{formatNumber(toralBefoteTax)}</strong></small></p>
            <p><small>Estimated tax: <strong>{formatNumber(tax)}</strong></small></p>
            <p>Order total: <strong>{formatNumber(grandTotal)}</strong></p>
            <button className='btn-revew'>Review Your Order</button>
        </div>
    );
};

export default Cart;