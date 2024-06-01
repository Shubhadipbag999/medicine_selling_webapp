import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { customAlphabet } from 'nanoid/non-secure'
import "./css/Cart.css"
import { toast } from 'react-toastify';
import CartItem from './../components/cart Item/CartItem';
import axios from 'axios';
// import Razorpay from 'razorpay'


const Cart = () => {

    const { getTotalamount, afterPayment, medicineData, removeFromCart, cartItem, knowCOunt, userData } = useContext(ShopContext)

    const totalAmount = getTotalamount()


    const loadRazorpay = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            handlePayment();
        };
        script.onerror = () => {
            alert('Razorpay SDK failed to load.');
        };
        document.body.appendChild(script);
    };

    const removeAllProductFromCart = async () => {
        await medicineData.map((item, i) => {
            if (cartItem[item.id] > 0) {
                removeFromCart(item.id)
            }
        })
    }

    const handlePayment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/create-order', {
                amount: totalAmount,
                currency: 'INR',
                receipt: 'receipt#1',
                // Amount in paisa
            });
            // const order = response.data;
            console.log(response.data.order);
            const { id: order_id, amount: order_amount, currency } = response.data;

            const options = {
                key: 'rzp_test_b3CFvAy9NYhkgt',
                amount: order_amount,
                currency: currency,
                name: 'PHARMA EASE CARE',
                description: 'Medicine Selling Application',
                image: "https://res.cloudinary.com/shubhadip/image/upload/v1717195510/u2o8aq9djw2mk6tq0cjj.png",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const result = await axios.post('http://localhost:5000/api/verify-payment', data);
                    alert(result.data.status);
                },
                prefill: {
                    name: userData.name,
                    email: userData.email,
                    contact: userData.phone,
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            // Redirect or handle the payment order as needed
            await removeAllProductFromCart()
        } catch (error) {
            console.error('Error creating order:', error);
        }
        afterPayment()
    };

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
                <button className='PayNowBtn' onClick={handlePayment}>Pay Now</button>

            </div>
            <div className='paymentDiv'>
                <span>Delivary Address: {userData.address}</span>
            </div>
        </div>
    )
}

export default Cart;