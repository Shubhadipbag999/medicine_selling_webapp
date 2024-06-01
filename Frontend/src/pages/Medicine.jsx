import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom'
import "./css/SingleProduct.css"


const Medicine = () => {
    const { productId } = useParams()

    const { medicineData, addToCart } = useContext(ShopContext)



    console.log("medicineData", medicineData.find((item) => item.id === Number(productId)))
    const data = medicineData.find((item) => item.id === Number(productId))

    const addToCartNow = () => {
        addToCart(productId)
    }
    console.log(data)
    return (
        <div className='medicineSinglContainer'>
            <img src={data.image} alt="productImage" className='singleProductImage' />
            <div className="nameDescriptionContainer">
                <span className='productName'>{data.name}</span>
                <span className='description'>{data.description}</span>
                <h3 style={{ marginTop: "2vh" }}>Discount: {data.discount}%</h3>
                <h2 className='productName'>Old Price : {data.old_price}</h2>
                <span className='productNewPrice'>RS. {data.new_price}</span>

                <button className='addToCartButton' onClick={addToCartNow}>Add To Cart</button>
            </div>


        </div>

    )
}

export default Medicine