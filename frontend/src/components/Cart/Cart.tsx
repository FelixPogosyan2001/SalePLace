import React from 'react';
import CartItem from './CartItem';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../redux/actions/cart';
import { AppState } from '../../redux/reducers';
import { Product } from '../../additional/interfaces';

interface LinkState {
    productsCart: Array<Partial<Product>>
}

interface LinkDispatchesToProps {
    deleteFromCart: Function
} 

type CartProps = LinkState & LinkDispatchesToProps

const Cart: React.FC<CartProps> = ({ productsCart, deleteFromCart }) => {
    return (
        <div className="cart">
            <h1 className="cart__header">Shopping Cart</h1>
            <div className="cart__body">
                <section className="cart__body__products">
                    {productsCart.map(productCart => <CartItem key={productCart._id} deleteFromCart={deleteFromCart} {...productCart}/>)}
                </section>
                <aside className="cart__body__total">
                    <div>
                        <h2>Your cart</h2>
                        <p>Products : {productsCart.length}</p>
                    </div>
                    <div>
                        <h2>Total <span>{productsCart.reduce((total,{price}) => total + price,0)} $</span></h2>
                    </div>
                </aside>
            </div>
        </div>

    )
}

const mapStateToProps = (state: AppState): LinkState => ({
    productsCart : state.cart
});

export default connect(mapStateToProps,{ deleteFromCart } as LinkDispatchesToProps)(Cart);