import React, { useContext } from 'react'
import "../Items/Items.css";
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext';
const Items = (props) => {
    const { addToCart } = useContext(ShopContext)
    const addToCartNow = () => {
        // addToCart(productId)
        console.log(productId)
        addToCart(productId)
    }
    const productId = props.id;
    return (
        <div className='ItemComponent'>
            <Link to={`/medicine/${productId}`}> <img src={props.image} alt="item image" className='itemimage' /></Link>
            <p className='itemName'>{props.name}</p>
            <div className='itemPrice'>
                <div className='cross'>{props.old_price}</div>
                <div className='itemNewPrice'>RS. {props.new_price}</div>
            </div>

            <button className='addToCartBTN' onClick={addToCartNow}>Add To Cart</button>
        </div>
    )
}

export default Items;