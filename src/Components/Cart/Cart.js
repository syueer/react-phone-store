import React, { useContext } from 'react'
import Title from '../Title'
import CartColumns from './CartColumns'
import EmptyCart from './EmptyCart'
import { ProductContext } from '../../context'
import CartList from './CartList'
import CartTotals from './CartTotals'

const Cart = (props) => {
    const value = useContext(ProductContext);
    const { cart } = value;

    if (cart.length > 0) {
        return (
            <React.Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList />
                <CartTotals history={props.history} />

            </React.Fragment>
        );
    } else {
        return <EmptyCart />
    }

}

export default Cart
