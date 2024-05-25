import React, { useState, useContext } from 'react';
import { ShopContext } from './../context/ShopContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import "./css/Profile.css"

const Profile = () => {

    const { userData } = useContext(ShopContext)
    const navigate = useNavigate()
    const logoutNow = () => {
        console.log("Logout")
        localStorage.removeItem('token')
        toast.success("User logged out Successfully")
        navigate("/medicines")
    }
    console.log(userData)
    // console.log("user Data", data.user)
    return (
        <div className='profileMainDiv'>
            <img src="https://res.cloudinary.com/shubhadip/image/upload/v1716231251/dgyvapyww9khjxpumrun.png" alt="profile image"
                className='profileImage' />
            <span className='ownerName'>Name: {userData.name} {userData.owner ? <span>(Admin)</span> : <></>}</span>
            <span className='remainingData'>Age: {userData.age}</span>
            <span className='remainingData'>email: {userData.email}</span>
            <span className='remainingData'>Phone: {userData.phone}</span>
            <span className='remainingData'>Address: {userData.address}</span>
            <button className="logoutNow" onClick={logoutNow}>Logout Now</button>
            <div className="floating-button" onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone"></i>
            </div>
        </div>
    )
}

export default Profile