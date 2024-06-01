import { useState, useContext } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

import Items from '../components/Items/Items';
import "./css/Medicines.css"
import { ShopContext } from './../context/ShopContext';


const Medicines = () => {
    const { all_product, addToCart, medicineData } = useContext(ShopContext)


    const [catagory, setCatagory] = useState("all");
    const navigate = useNavigate()
    return (
        <div className='allMedicineComponentMain'>
            {/* <div className='medicineByFilter'>
                <button className='filterNow' onClick={() => setCatagory("all")}>All</button>
                <button className='filterNow' onClick={() => setCatagory("men")}>Men</button>
                <button className='filterNow' onClick={() => setCatagory("women")}>Women</button>
                <button className='filterNow' onClick={() => setCatagory("kid")}>Kids</button>
            </div> */}


            <div className='allMedicineOnlyDiv'>
                {

                    medicineData ? medicineData.map((item, i) => {


                        return <Items key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />

                    }) : <h1>Data Not Found</h1>
                }

            </div>
            <div className="floating-button" onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone"></i>
            </div>
        </div>
    )
}

export default Medicines