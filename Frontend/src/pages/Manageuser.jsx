import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import "./css/Manageuser.css"

const Manageuser = () => {
    console.log("manage user")
    const [userDatas, setUserDatas] = useState()
    const { userData } = useContext(ShopContext)
    useEffect(() => {

        const fetchData = async () => {

            const data = await axios.get("http://localhost:5000/api/getalluser")
            setUserDatas(data.data.userData)
        }
        fetchData()
    }, [])
    console.log(userData)
    return (
        <div className='ManageAllUsersDiv'>
            {
                userDatas ? userDatas.map((item, i) => {

                    {/* if (item._id !=) {

                    } */}
                    return <div className='ManageAllUsersSingleDiv'>
                        <div className='basicDetails'>
                            <span>Name: {item.name}</span>
                            {
                                item.authority ? <></> :
                                    <span>Age: {item.age}</span>
                            }
                            <span>Address: {item.address}</span>
                        </div>
                        <div className='contactDetails'>
                            <span>Email: {item.email}</span>
                            <span>Phone: {item.phone}</span>
                        </div>

                        {item.authority == false ? <div className='type'><div className='orenge' disabled><p>User</p></div></div> : <div className='type'><div className="green">Company</div></div>}

                    </div>
                }) : <h1>No User</h1>
            }

        </div>
    )
}

export default Manageuser