import React from 'react';
import { removeFromDatabaseCart } from '../../utilities/databaseManager';


const Reviewitem = (props) => {
    const {name, price, key, img, quantity} = props.product;
    const removeProduct = props.removeProduct;
    return (
        <div>
            <img src={img} alt="" />
            <h3>{name}</h3>
            <h6>Quantity {quantity}</h6>
            <p>Total Price ${price*quantity}</p>
            <button onClick={() => removeProduct(key)} className='btn-revew'>Remove Items</button>
        </div>
    );
};

export default Reviewitem;