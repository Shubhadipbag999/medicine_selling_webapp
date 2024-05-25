import React, { useState } from 'react'
import "./css/Addproduct.css";
import "./css/LoginSignup.css"
import axios from 'axios';
import { toast } from 'react-toastify';
// import toast from 'toast'
const AddNewProduct = () => {
    const [data, setData] = useState({
        name: "",
        image: "",
        catagory: "",
        old_price: "",
        new_price: "",
        description: "",
        discount: "",
        stock: ""

    })
    const [file, setFile] = useState("")
    const [iamgeData, setimageData] = useState("")


    const uploadImage = () => {
        console.log("image", file)
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "medicine-selling-image")
        data.append("cloud_name", "shubhadip")

        fetch("https://api.cloudinary.com/v1_1/shubhadip/image/upload", {
            method: "post",
            body: data
        }).then((res) => res.json())

            .then((data) => {
                console.log(data.secure_url)
                setimageData(data.secure_url)
                toast.success("Image uploaded successfully")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Error uploading image")
            })
    }
    const AddProduct = async (e) => {
        e.preventDefault();

        const newData = {
            name: data.name,
            image: iamgeData,
            catagory: data.catagory,
            old_price: Number(data.old_price),
            new_price: Number(data.new_price),
            description: data.description,
            discount: Number(data.discount),
            stock: data.stock,
        }

        console.log("form data", newData)
        try {

            const response = await axios.post("http://localhost:5000/api/addproduct", newData, {

            })
            console.log(response)
            toast.success("Product added successfully")
            setData({
                name: "",
                image: "",
                catagory: "",
                old_price: "",
                new_price: "",
                description: "",
                discount: "",
                stock: ""
            })
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.message)
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div className='addNewProduct'>
            <div className='addproductForm'>
                <p className='loginSignupText'>Add New Product</p>
                <input type="text" className="inputBox" name="name" value={data.name}
                    onChange={handleChange}
                    placeholder='Enter Product name' />


                <div className='ImageUploadiv'>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className='inputfile' />
                    <button onClick={uploadImage} className='imageuploadBTN'>Upload Image</button>
                </div>

                <input type="text" className="inputBox"
                    name="catagory" value={data.catagory}
                    onChange={handleChange}
                    placeholder='Enter catagory' />

                <input type="text" className="inputBox"
                    name="old_price" value={data.old_price}
                    onChange={handleChange}
                    placeholder='Enter Old Price' />

                <input type="text" className="inputBoxNumber"
                    name="new_price" value={data.new_price}
                    onChange={handleChange}
                    placeholder='Enter New Price' />

                <input type="text" className="inputBox"
                    name="description" value={data.description}
                    onChange={handleChange}
                    placeholder='Enter Product description' />

                <input type="text" className="inputBox"
                    name="discount" value={data.discount}
                    onChange={handleChange}
                    placeholder='Enter Product discount' />

                <input type="text" className="inputBox"
                    name="stock" value={data.stock}
                    onChange={handleChange}
                    placeholder='Enter Stock Quantity' />

                <button className='addProductBTN' onClick={AddProduct}>Add Product Now</button>
            </div>
        </div>
    )
}

export default AddNewProduct