import React, { useContext } from 'react'
import CartItem from './CartItem'
import { ProductContext } from '../../context'

const CartList = () => {
    const value = useContext(ProductContext);

    const { cart } = value;

    return (
        <div className="container-fluid">
            {cart.map(item => {
                return <CartItem key={item.id} item={item} />
            })}
        </div>
    )
}

export default CartList
