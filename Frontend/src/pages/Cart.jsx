import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { customAlphabet } from 'nanoid/non-secure'
import "./css/Cart.css"
import { toast } from 'react-toastify';
import CartItem from './../components/cart Item/CartItem';
import axios from 'axios';


const Cart = () => {

    const { getTotalamount, afterPayment, medicineData, removeFromCart, cartItem, knowCOunt, userData } = useContext(ShopContext)
    const tapToPayment = async () => {
        const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
        const transcettionId = await nanoid()
        const data = {
            userId: userData._id,
            address: userData.address,
            price: getTotalamount(),
            transactionId: transcettionId,

        }
        try {
            console.log(data)
            const token = localStorage.getItem('token')

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const response = await axios.post("http://localhost:5000/api/transaction", data, { headers })
        } catch (e) {
            console.log(e)
        }
        toast.success(`Payment Successfully, Your Transaction Id:${transcettionId} `)
        afterPayment()
    }
    return (

        <div className='mainCartDiv'>
            <div className='cartoutlineDeclaration'>
                <span>Image</span>
                <span>Name</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Remove</span>
            </div>
            <div className='onlyCartItem'>


                {knowCOunt() > 0 ?
                    medicineData.map((item, i) => {
                        if (cartItem[item.id] > 0) {

                            return (

                                <div div className='cartItemSingleDiv' key={i} >
                                    <img src={item.image} alt="cart item image" className='cartItemImage' />
                                    <span className='cartItemName'>{item.name}</span>
                                    <span className='cartItemPrice'>{item.new_price}</span>
                                    <div className="cartItemQuantity">{cartItem[item.id]}</div>
                                    <span className='totalPrice'>{(item.new_price * cartItem[item.id]).toFixed(2)}</span>
                                    <button className="removeFromCart" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            )

                        }
                    }) : <h1>Cart Is Empty</h1>

                }


            </div>
            <div className='paymentDiv'>
                <p>Total Amount: {
                    getTotalamount()
                }</p>
                <button className='PayNowBtn' onClick={tapToPayment}>Pay Now</button>

            </div>
            <div className='paymentDiv'>
                <span>Delivary Address: {userData.address}</span>
            </div>
        </div>
    )
}

export default Cart