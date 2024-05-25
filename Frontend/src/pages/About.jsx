import React, { useState } from 'react'
import "./css/About.css"
const About = () => {

    return (
        <div className="wrapper">
            <div className="background-color">
                <div className="bg-1"></div>
                <div className="bg-2"></div>
            </div>
            <div className="about-container">
                <div className="image-container">
                    <img src="https://res.cloudinary.com/shubhadip/image/upload/v1716319309/blbkxksizdpve4otfvbu.jpg" />
                </div>
                <div className="text-container">
                    <h1>About us</h1>
                    <p>Pharma Ease Care is a comprehensive pharmacy service provider, focused on delivering a wide range of
                        healthcare services and products. Their services include NHS and private flu vaccinations, Fit To
                        Fly COVID-19 test certificates, medicine use reviews, and managed dosage systems to help patients
                        remember to take their medications correctly.Their services include NHS and private flu
                        vaccinations, Fit To Fly COVID-19 test certificates, medicine use reviews, and managed dosage
                        systems to help patients remember to take their medications correctly.</p>
                    <a href="">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default About
