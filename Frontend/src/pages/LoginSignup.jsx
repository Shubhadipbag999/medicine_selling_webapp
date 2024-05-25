import React, { useState } from 'react'
import "./css/LoginSignup.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const LoginSignup = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [data, setData] = useState({

        email: "",
        password: "",

    })

    const SubmitLogin = async (e) => {
        e.preventDefault();
        const newData = {
            email: data.email[0],
            password: data.password[0]
        }

        console.log(data);
        console.log(newData);
        try {

            const response = await axios.post("http://localhost:5000/api/auth/login", newData)
            console.log(response.data.token)
            localStorage.setItem("token", response.data.token)
            toast.success("user logged in successfully")
            setData({

                email: "",
                password: "",
            })
            navigate("/")
        } catch (err) {
            console.log(err.response.data.message)
            toast.error(err.response.data.message)
        }
    }
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: [e.target.value] })
    }
    return (
        <div className="loginMainDiv">
            <div className="background-color">
                <div className="bg-1"></div>
                <div className="bg-2"></div>
            </div>
            <div className="loginContainer">
                <p className='loginSignupText'>Login</p>

                <input type="email" className="inputBox" placeholder='Enter your email'
                    onChange={handleChange}
                    name="email" value={data.email} />

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


                {/* <input type="password" className="inputBox"
                    onChange={handleChange} placeholder='Enter your password' name="password" value={data.password} /> */}
                <button className='loginSignupBTN' onClick={SubmitLogin}>Login Now</button>
                <div className='already'>
                    <p>Already Have An Account</p>
                    <Link to="/signup"><u>Signup</u></Link>
                </div>
            </div>


        </div>
    )
}

export default LoginSignup