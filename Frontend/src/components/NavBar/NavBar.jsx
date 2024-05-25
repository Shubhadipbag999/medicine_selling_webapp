import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import './NavBar.css';
import logo from '../assets/sell_logo.png';
import cart_icon from '../assets/cart_icon.png';
import { ShopContext } from '../../context/ShopContext'
const NavBar = () => {

    const { knowCOunt, userData } = useContext(ShopContext)
    const [user, setUser] = useState(userData)
    useEffect(() => {
        const fetchdata = async () => {
            if (localStorage.getItem('token')) {
                console.log("You Are Authorized", localStorage.getItem('token'))
                const token = localStorage.getItem('token')
                const data = {
                    key1: 'value1',
                    key2: 'value2'
                };

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                await axios.post("http://localhost:5000/api/getcart", data, { headers })

                    .then((res) => {

                        // console.log(res.data.cart)
                        // authinticated = true;
                        setUser(res.data.user)
                        // setCartitem(res.data.cart)
                        console.log("user data Presnt", userData)
                    })

                    .catch((err) => console.log(err))

            }
            else {
                console.log("You Are not Authorized")
            }
        }
        fetchdata()
    }, [])
    const [menu, setMenu] = useState("Home");

    const loginNow = () => {
        console.log("Login")

    }

    const logoutNow = () => {
        console.log("Logout")
        localStorage.removeItem('token')
    }
    return (
        <div className='navbar'>
            <div className='navbar-logo'>
                <img src={logo} alt="logo" />
                <p>PHARMA EASE CARE</p>
            </div>
            <ul className="nav-manu">
                <li onClick={() => setMenu("Home")}>
                    <Link to="/" className='link'>
                        Home{menu == "Home" ? <hr /> : <></>}
                    </Link>
                </li>
                <li onClick={() => setMenu("Medicines")}>
                    <Link to="/medicines" className='link'>
                        Medicines{menu == "Medicines" ? <hr /> : <></>}</Link></li>

                {user.name ? <li onClick={() => setMenu("Profile")}>
                    <Link to="/profile" className='link'>
                        Profile{menu == "Profie" ? <hr /> : <></>}</Link></li> : <></>}
                {user.owner != true ? <>
                    <li onClick={() => setMenu("Parents Care")}>
                        <Link to="/parentscare" className='link'>
                            Parents Care{menu == "Parents Care" ? <hr /> : <></>}</Link></li>
                    <li onClick={() => setMenu("About")}>
                        <Link to="/about" className='link'>
                            About{menu == "About" ? <hr /> : <></>}</Link></li>
                    <li onClick={() => setMenu("Contact")}>
                        <Link to="/contact" className='link'>Contact{menu == "Contact" ? <hr /> : <></>}</Link></li>
                </> : <><li onClick={() => setMenu("Contact")}>
                    <Link to="/admin/addproduct" className='link'>Add New Product{menu == "Addproduct" ? <hr /> : <></>}</Link></li></>}

            </ul>
            <div className='nav-login-cart'>
                {!user.name ?
                    <Link to="/login"><button className='login-button' onClick={loginNow}>Login</button></Link> :
                    <> <Link to="/login"><button className='login-button' onClick={logoutNow}>Logout</button></Link></>

                }
                {
                    !user.owner ? <>
                        <Link to="/cart"><img src={cart_icon} alt="cart-icon" className='cartIcon' /></Link>
                        <Link to="/cart"><div className='cart-count'>{knowCOunt()}</div></Link>
                    </> : <></>

                }



            </div>
        </div>
    )
}

export default NavBar