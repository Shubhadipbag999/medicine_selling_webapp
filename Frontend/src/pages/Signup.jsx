import React, { useState } from 'react'
import axios from 'axios'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./css/LoginSignup.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate()

    const [data, setData] = useState({
        name: "",
        age: "",
        email: "",
        phone: "",
        password: "",


    })

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const SubmitSignup = async (e) => {
        e.preventDefault();

        const newData = {
            name: data.name,
            age: Number(data.age),
            email: data.email,
            phone: Number(data.phone),
            address: data.address,
            password: data.password
        }
        console.log(newData)
        try {

            const response = await axios.post("http://localhost:5000/api/auth/signup", newData)
            console.log(response)
            toast.success("user added successfully")
            setData({
                name: "",
                age: "",
                email: "",
                phone: "",
                address: "",
                password: "",
            })
            navigate("/login")
        } catch (err) {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    return (
        <div className="loginMainDiv">
            <div className="background-color">
                <div className="bg-1"></div>
                <div className="bg-2"></div>
            </div>
            <div className="loginContainer">
                <p className='loginSignupText'>Sign Up</p>
                <input type="text" className="inputBox" name="name" value={data.name}
                    onChange={handleChange}
                    placeholder='Enter your name' />

                <input type="text" className="inputBoxNumber"
                    name="age" value={data.age}
                    onChange={handleChange} placeholder='Enter your age' />

                <input type="email" className="inputBox"
                    name="email" value={data.email}
                    onChange={handleChange}
                    placeholder='Enter your email' />

                <input type="text" className="inputBoxNumber"
                    name="phone" value={data.phone}
                    onChange={handleChange}
                    placeholder='Enter your phone number' />

                <input type="text" className="inputBoxNumber"
                    name="address" value={data.address}
                    onChange={handleChange}
                    placeholder='Enter your address' />

                <div className='passwordDiv'>
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        className="inputBoxPass"
                        placeholder='Enter your password'
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />
                    {/* <i className={passwordVisible ? 'fa-eye-slash' : 'fa-eye'} onClick={togglePasswordVisibility}></i> */}
                    {passwordVisible ? <RemoveRedEyeIcon onClick={togglePasswordVisibility} className='eyeIcon' /> : <VisibilityOffIcon onClick={togglePasswordVisibility} className='eyeIcon' />}
                </div>

                <button className='loginSignupBTN' onClick={SubmitSignup}>Signup Now</button>

                <div className='already'>
                    <p>Already Have An Account</p>
                    <Link to="/login"> <u>Login</u></Link>
                </div>
            </div>
        </div>
    )
}

export default Signup