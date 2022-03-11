import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';
import './PhoductDetail.css'

const ProductDetails = () => {
    const {productKey} = useParams()
    const product = fakeData.find(pd => pd.key == productKey);
    console.log(product);
    const {name, seller, wholePrice, priceFraction, stock, img} = product;
    return (
        <div className="product-single">
            <h3>Product Details</h3>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;