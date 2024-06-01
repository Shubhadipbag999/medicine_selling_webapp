
import { useState, useContext } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";

import Items from '../components/Items/Items';
import "./css/Medicines.css"
// import "./css/Medicines.css"
import { ShopContext } from '../context/ShopContext';

const Offerforyou = () => {

    const { medicineData } = useContext(ShopContext)
    const navigate = useNavigate()
    // const { catagoryData } = useParams()
    console.log(medicineData[1].discount)
    return (
        <div>
            <div className='allMedicineOnlyDiv'>
                {

                    medicineData ? medicineData.map((item, i) => {
                        if (item.discount > 20 && item.catagory != "healthcaredevices") {

                            return <Items key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price} old_price={item.old_price} />
                        }
                    }) : <h1>No Data Found</h1>
                }

            </div>
            {/* <h1>gudhjddj</h1> */}
            <div className="floating-button" onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone"></i>
            </div></div>)

}

export default Offerforyou