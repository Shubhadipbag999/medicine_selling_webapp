import React, { useState, useContext } from 'react'
import "./css/Searchbyname.css";
import { ShopContext } from './../context/ShopContext';
import Items from '../components/Items/Items';
import { toast } from 'react-toastify';

const Searchbyname = () => {
    const { medicineData } = useContext(ShopContext)
    const [medicineSSS, setMedicine] = useState({
        _id: "",
        catagory: "",
        id: 0,
        description: "",
        name: "",
        image: "",
        new_price: 0,
        old_price: 0,
        discount: 0
    })
    const [nameSearch, setName] = useState("")
    const serachNow = async () => {
        const data = await medicineData.find((item) => item.name === nameSearch)
        if (data) {
            toast.success("Search reasult found");
        }
        else {
            toast.error("No Data Found")
        }
        setMedicine({
            _id: data._id,
            catagory: data.catagory,
            id: data.id,
            description: data.description,
            name: data.name,
            image: data.image,
            new_price: data.new_price,
            old_price: data.old_price,
            discount: data.discount
        });
        console.log(data);
    }

    const kmlklmsk = () => {
        console.log("medicine", medicineSSS)
    }

    return (
        <div className='searchMainContainer'>
            <input type="text" className='medicinesearchbox'
                placeholder='Enter Medicine Name' onChange={(e) => setName(e.target.value)}
                value={nameSearch}
            />
            <button className='searchButton' onClick={serachNow}>Search Now</button>

            {
                medicineSSS.name === "" ? <h1 style={{ marginTop: "5vh" }}>No Data Found</h1> :
                    <Items id={medicineSSS.id} image={medicineSSS.image} name={medicineSSS.name} new_price={medicineSSS.new_price} old_price={medicineSSS.old_price} />

            }
        </div>
    )
}

export default Searchbyname