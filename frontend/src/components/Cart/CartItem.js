import React from 'react';

const CartItem = ({_id,image,price,title,deleteFromCart}) => {
    return (
        <div className="cart__product">
            <div className="cart__product__image" style={{backgroundImage:`url(http://localhost:2001/${image})`}}></div>
            <p className="cart__product__title">{title}</p>
            <p className="cart__product__price">{price} $</p>
            <i className="fas fa-times" onClick={deleteFromCart.bind(this,_id)}></i>
        </div>
    )
}

export default CartItem;