import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import "../cart Item/CartItem.css"

const CartItem = (item) => {
    const { cartItem, removeFromCart } = useContext(ShopContext)

    return (
        <div className='cartItemSingleDiv'>
            <img src={item.item.image} alt="cart item image" className='cartItemImage' />
            <span className='cartItemName'>{item.item.name}</span>
            <span className='cartItemPrice'>{item.item.new_price}</span>
            <div className="cartItemQuantity">{cartItem[item.item.id]}</div>
            <span className='totalPrice'>{item.item.new_price * cartItem[item.item.id]}</span>
            <button className="removeFromCart" onClick={() => removeFromCart(item.item.id)}>Remove</button>
        </div>
    )
}

export default CartItem