import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from './../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Home.css"
import "./css/Parentscare.css"
import { toast } from 'react-toastify';


const Home = () => {
    const { medicineData, userData } = useContext(ShopContext)
    // console.log("`medicineData", medicineData[0].image)
    // const [data, setData] = useState(null);
    const navigate = useNavigate()
    // const discountClick = () => {
    //     navigate("/medicines")
    // }

    // const morediscountClick = () => {
    //     navigate("/login")
    // }
    const [catagory, seCatagory] = useState("")
    return (
        <div className='homepageMainDiv'>



            <div className="nav-card-layout container">
                <div>
                    <div>
                        <Link to="/medicines/medicineoffer">
                            <img src="https://assets.pharmeasy.in/apothecary/images/medicine_ff.webp?dim=256x0" alt="" /></Link>
                        <h4>Medicines</h4>
                        <p>Upto 25% off</p>
                    </div>
                    <div>
                        <Link to="/medicines/homecare">
                            <img src="https://assets.pharmeasy.in/apothecary/images/healthcare_ff.webp?dim=256x0" alt="" /></Link>
                        <h4>Home Care</h4>
                        <p>Upto 60% off</p>
                    </div>
                    <div>
                        <Link to="/medicines/healthcaredevices">
                            <img src="https://assets.pharmeasy.in/apothecary/images/labtest_ff.webp?dim=256x0" alt="" /></Link>
                        <h4>Self Tests Kit</h4>
                        <p>Upto 50% off</p>
                    </div>


                    <div>
                        <Link to="/medicines/offersforyou">
                            <img src="https://assets.pharmeasy.in/apothecary/images/offers_ff.webp?dim=256x0" alt="" /></Link>
                        <h4>Offers</h4>
                        <p>Upto 50% off</p>
                    </div>

                </div>
            </div>

            {/* offers for you */}
            <div className="new-user-offer container">
                <h1 className="title">offers Just For You</h1>
                <div className="cards-layout">
                    <Link to="/medicines/medicineoffer">
                        <div className='cards-layout-inner'>
                            <img src="https://cms-contents.pharmeasy.in/offer/37c262d84a5-25.jpg?dim=1024x0" alt="" className='cards-layout-img' />
                            <p style={{ textDecoration: "none", marginLeft: "10px" }}>Flat 25% off</p>
                        </div>
                    </Link>
                    <Link to="/medicines">
                        <div className='cards-layout-inner'>
                            <img src="https://cms-contents.pharmeasy.in/offer/81308cc59b5-FLAT_20.jpg?dim=1024x0" alt="" className='cards-layout-img' />
                            <p style={{ marginLeft: "10px" }}   >Test - Flat 20% off + up to Rs.1000 suprise cashback</p>
                        </div>
                    </Link>
                    {!userData.name ? <div className='cards-layout-inner'>
                        <i className="fa-solid fa-lock"></i>
                        <p>Log in to view more offers</p>
                    </div> : <></>

                    }

                </div>
            </div>


            {/* shop by catagory */}

            <div className="shop-categories container">
                <h1 className="title">Shop by categories</h1>
                <div>

                    <div>
                        <Link to="/medicines/personalcare">
                            <img src="https://cdn01.pharmeasy.in/dam/discovery/categoryImages/b4a3a67a59783e0ca738884c9acc8e7b.png?f=png?dim=256x0"
                                alt="" /></Link>
                        <h4>Personal Care</h4>
                    </div>
                    <div>
                        <Link to="/medicines/healthfoodanddrinks">
                            <img src="https://cdn01.pharmeasy.in/dam/discovery/categoryImages/62e6d7551ecf3a5da1d2336c41cc0549.png?f=png?dim=256x0"
                                alt="" /></Link>
                        <h4>Health Food and Drinks</h4>
                    </div>
                    <div>
                        <Link to="/medicines/babycare">
                            <img src="https://allibhavan.com/cdn/shop/collections/baby_care_-_baby_products.jpg?v=1666170648"
                                alt="" className='imgBabyCare' /></Link>
                        <h4>Baby Care</h4>
                    </div>
                    <div>
                        <Link to="/medicines/skincare">
                            <img src="https://cdn01.pharmeasy.in/dam/discovery/categoryImages/ff5aaa03881e3016bf409f85b4e328aa.png?f=png?dim=256x"
                                alt="" /></Link>
                        <h4>Skin Care</h4>
                    </div>
                    <div>
                        <Link to="/medicines/homecare">
                            <img src="https://cdn01.pharmeasy.in/dam/discovery/categoryImages/68ae87e29f4a3abbb8ed69fe7ecf057c.png?f=png?dim=256x"
                                alt="" /></Link>
                        <h4>Home Care</h4>
                    </div>
                    <div>
                        <Link to="/medicines/ayurveda">
                            <img src="https://cdn01.pharmeasy.in/dam/discovery/categoryImages/4209e1d247cd30fca1f619786fa3e9c1.png?f=png?dim=256x"
                                alt="" />
                        </Link>
                        <h4>Ayurvedic</h4>
                    </div>
                </div>
            </div>


            {/* oder with prescription (coming soon) */}

            <div className="order-with-prescription ">
                <div>
                    <img src="https://assets.pharmeasy.in/apothecary/images/rx_upload.svg?dim=1024x0" alt="" />
                    <div>
                        <h3>Order With Prescription(Coming Soon...)</h3>
                        <p>Upload prescription and we will deliver your medicine</p>
                        <button onClick={() => toast.warning("This Features Will Added Soon!")}>
                            <i className="fa-solid fa-paperclip"></i>
                            Upload
                        </button>
                    </div>
                </div>
                <div>
                    <h4>How does this works ?</h4>
                    <div>
                        <div>
                            <h3>1</h3>
                            <p>Upload photo of you prescription</p>
                        </div>
                        <div>
                            <h3>2</h3>
                            <p>Add delivery address and place the order
                            </p>
                        </div>
                        <div>
                            <h3>3</h3>
                            <p>We will call you to confirm the medicines</p>
                        </div>
                        <div>
                            <h3>4</h3>
                            <p>Now, sit back! your medicines will get delivered at your doorstep</p>
                        </div>
                    </div>
                </div>
            </div>

            {/*parentscare*/}
            <div className="become-plus-member" style={{ marginTop: "3vh", fontFamily: 'Gill Sans' }}>
                <div>
                    <h2>Become a Responsible Person</h2>
                    <p>Take Care  of Your Parents</p>
                    <hr />
                </div>
                <div>
                    <p>We care about your responsibility. Please explore this new features</p>
                    <p>Write here your medicine name and timing and get reminder.</p>

                    <button onClick={() => navigate("/parentscare")}>Explore Now <i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div>
                    <img src="https://assets.pharmeasy.in/apothecary/_next/static/media/PlusFamily.22677720.png?dim=1024x0 "
                        alt="" />
                </div>
            </div>

            {/* hot deals */}
            {
                medicineData[0].name ? <div className="deals-of-the-day container">
                    <h1 className="title">Deals of the day <spam className="timer"><i className="fa-regular fa-clock"> 06:00 HOURS LEFT,
                        HURRY!</i></spam><span className="view-all" onClick={() => navigate("/medicines")}>View-All</span></h1>
                    <div className="product-cards2">
                        <div>
                            <Link to={`/medicine/${medicineData[15].id}`} className='linktag'>
                                <img src={medicineData[15].image}
                                    alt="" />
                            </Link>
                            <h6>{medicineData[15].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[15].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[15].new_price}<span className="discountPercent"> ({medicineData[15].discount}% OFF)</span></p>
                        </div>
                        <div>
                            <Link to={`/medicine/${medicineData[1].id}`} className='linktag'>
                                <img src={medicineData[1].image}
                                    alt="" /></Link>
                            <h6>{medicineData[1].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[1].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[1].new_price}<span className="discountPercent"> ({medicineData[1].discount}% OFF)</span></p>
                        </div>
                        <div>
                            <Link to={`/medicine/${medicineData[33].id}`} className='linktag'>
                                <img src={medicineData[33].image}
                                    alt="" /></Link>
                            <h6>{medicineData[33].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[33].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[33].new_price}<span className="discountPercent"> ({medicineData[33].discount}% OFF)</span></p>
                        </div>
                        <div>
                            <Link to={`/medicine/${medicineData[3].id}`} className='linktag'>
                                <img src={medicineData[3].image}
                                    alt="" /></Link>
                            <h6>{medicineData[3].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[3].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[3].new_price}<span className="discountPercent"> ({medicineData[3].discount}% OFF)</span></p>
                        </div>
                        <div>
                            <Link to={`/medicine/${medicineData[4].id}`} className='linktag'>
                                <img src={medicineData[4].image}
                                    alt="" /></Link>
                            <h6>{medicineData[4].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[4].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[4].new_price}<span className="discountPercent"> ({medicineData[4].discount}% OFF)</span></p>
                        </div>
                        <div>
                            <Link to={`/medicine/${medicineData[5].id}`} className='linktag'>
                                <img src={medicineData[5].image}
                                    alt="" /></Link>
                            <h6>{medicineData[5].name}</h6>
                            <p>MRP: ₹<span className="MRP-with-stroke">{medicineData[5].old_price}</span></p>
                            <p className='discountAmount'>₹{medicineData[5].new_price}<span className="discountPercent"> ({medicineData[5].discount}% OFF)</span></p>
                        </div>

                    </div>



                </div> : <></>
            }

            <div className="shop-by-concern container">
                <h1 className="title">Shop by Concern</h1>
                <h3 className="subtitle">Products are handpicked by experts</h3>
                <div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/923a665cc6f-Skin_care.png?dim=128x0"
                            alt="" />
                        <h3>Skin Care</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/18d2e2ee86b-Vitamins.png?dim=128x0"
                            alt="" />
                        <h3>Vitamin & Supplement</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/0af9ac9f350-Diabetes.webp?dim=128x0"
                            alt="" />
                        <h3>Diabetes Care & Sugar Subtitutes</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/24a0d2c733e-Heart.webp?dim=128x0"
                            alt="" />
                        <h3>Cardiac Care</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/68369c9df98-Pregnancy.webp?dim=128x0"
                            alt="" />
                        <h3>Baby & Mom Care</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/16ab65c0826-Covid.webp?dim=128x0"
                            alt="" />
                        <h3>Covid Care</h3>
                    </div>
                    <div>
                        <img src="https://cms-contents.pharmeasy.in/homepage_top_categories_images/26bbd7a9e98-Lifestyle.webp?dim=128x0"
                            alt="" />
                        <h3>Lifestyle Disorders</h3>
                    </div>
                </div>
            </div>

            {/* payment option */}
            <div className="payment-offers container">
                <h1 className="title">Payment Offers</h1>
                <div>
                    <img src="https://cdn01.pharmeasy.in/dam/banner/banner/1412bb76dee-AMAZONPAY.jpg?dim=1440x0" alt="" />
                    <img src="//cdn01.pharmeasy.in/dam/banner/banner/bb9b358232d-PAYTM-02.jpg?dim=1440x0" alt="" />
                    <img src="https://cdn01.pharmeasy.in/dam/banner/banner/2a0795e595e-MOBIKWIK.jpg?dim=1440x0" alt="" />
                    <img src=" https://cdn01.pharmeasy.in/dam/banner/banner/a20dea5ddad-OLA-MONEY-02.jpg?dim=1024x0" alt="" />
                    <img src=" https://cdn01.pharmeasy.in/dam/banner/banner/e1bf5c7dae5-FREECHARGE-02.jpg?dim=1024x0" alt="" />
                    <img src="https://cdn01.pharmeasy.in/dam/banner/banner/7297689b914-AIRTEL.jpg?dim=1024x0" alt="" />
                </div>
            </div>

            {/* what customer shay */}
            <div className="customer-review container">
                <h1 className="title"> What our customer have to say</h1>
                <div className="reviews">
                    <div>
                        <h3>Rajarshi Sarkar</h3>
                        <h4>March 22, 2024</h4>
                        <p>The app is really wonderful. Being a Product Manager myself, I would say that the User experience
                            (UI/UX) of the app is top notch (easy to use, simple and convenient). Coming to services and
                            delivery, I would say Pharmeasy is doing a tremendous job even during this unprecedented
                            pandemic situation.</p>
                    </div>
                    <div>
                        <h3>Darpan Dholakia</h3>
                        <h4>April 23, 2024</h4>
                        <p>Best service and app amongst all available. I have been using it for more than 3 years, and even
                            during the pandemic, they have kept their standards high and are delivering the order within 24
                            hours. Keep up the good work.</p>
                    </div>
                    <div>
                        <h3>Lipi Chaudhuri</h3>
                        <h4>April 15, 2024</h4>
                        <p>This app is a game changer for me. I am unable to go out always to buy medicinal products.
                            Pharmeasy gives me the last liberty to shop essential healthcare products from home. The app is
                            very user friendly and me being an elderly person do not find any difficulty in using it. They
                            deliver well in time. Thanks😊</p>
                    </div>
                </div>
            </div>


            {/* floating button */}
            <div className="floating-button" onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-phone"></i>
            </div>


            {/* foorter */}
            <div className="footer container">
                <div className="footer-top">
                    <div>
                        <ul>
                            <h3>Company</h3>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Blog</li>
                            <li>Partner with Pharma Ease Care</li>
                            <li>Sell at Pharma Ease Care</li>
                        </ul>
                        <ul>
                            <h3>Our Services</h3>
                            <li>Order Medicine</li>
                            <li>Health Care Products</li>
                            <li>Lab Tests</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h3>Featured categories</h3>
                            <li>Covid Essentials</li>
                            <li>Personal Care</li>
                            <li>Health Food and Drinks</li>
                            <li>Beauty</li>
                            <li>Skin Care</li>
                            <li>Home Care</li>
                            <li>Ayurvedic are</li>
                            <li>Sexual Wellness</li>
                            <li>Fitness & Baby Care</li>
                            <li>Mother & Baby Care</li>
                            <li>Health Care Devices</li>
                            <li>Health Condition</li>
                            <li>Diabetic Care</li>
                            <li>Elderly Care</li>
                            <li>Accessories And Wearables</li>
                            <li>Value Store</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h3>Need Help</h3>
                            <li>Browse All Medicines</li>
                            <li>Browse All Molecules</li>
                            <li>Browse All Cities & Areas</li>
                            <li>Browse All Stores</li>
                            <li>FAQ</li>
                        </ul>
                        <ul>
                            <h3>Policy Info</h3>
                            <li>Editorial Policy</li>
                            <li>Privacy Policy</li>
                            <li>Vulnerability Disclosure Policy</li>
                            <li>Terms and Conditions</li>
                            <li>Customer Support Policy</li>
                            <li>Return Policy</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h3>Follow us on</h3>
                            <li><img src="https://assets.pharmeasy.in/apothecary/images/Instagram.svg?dim=32x0" /></li>
                            <li><img src="https://assets.pharmeasy.in/apothecary/images/facebook.svg?dim=32x0" /></li>
                            <li><img src="https://assets.pharmeasy.in/apothecary/images/Youtube.svg?dim=32x0" /></li>
                            <li><img src="https://assets.pharmeasy.in/apothecary/images/Twitter.svg?dim=32x0" /></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <h3>Our Payment Partners</h3>
                    <div>
                        <div>
                            <img src="https://assets.pharmeasy.in/apothecary/images/gpay.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/paytm.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/phonepe.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/amazon.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/mobikwik.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/olamoney.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/maestro.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/mastercard.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/visa.png?dim=1024x0" />
                            <img src="https://assets.pharmeasy.in/apothecary/images/rupay.png?dim=1024x0" />
                        </div>
                    </div>
                </div>


            </div>

        </div >


    )
}

export default Home