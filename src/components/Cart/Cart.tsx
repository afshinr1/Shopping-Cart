import React, { ReactElement } from 'react'
import { Wrapper } from './Cart.styles'
import {CartItemType} from '../../App';
import CartItem from '../CartItem/CartItem';

interface Props {
    cartItems : CartItemType[],
    addToCart : (clickedItem : CartItemType) => void,
    removeFromCart : (id : number) => void,


}

function Cart({cartItems, addToCart, removeFromCart}: Props): ReactElement {

    const calculateTotal = (items : CartItemType[]) => (
            items.reduce((acc: number, item) => acc + item.amount * item.price, 0)
    )

    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems?.map(item => (
                <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total : ${calculateTotal(cartItems)}</h2>
        </Wrapper>
    )
}

export default Cart
