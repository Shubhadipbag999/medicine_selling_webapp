import React, { useState, useContext, useEffect, useReducer } from 'react'
import "./css/Parentscare.css"
import { ShopContext } from './../context/ShopContext';
import axios from 'axios';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import { toast } from 'react-toastify';
const ParentsCare = () => {
    const { userData } = useContext(ShopContext)

    const [data, setData] = useState({
        medicinename: "",
        time: "",
        relationType: "",
        phone: ""

    })


    const [parentsTask, setParentstask] = useState()
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const fetchdata = async () => {
            const customerid = userData._id
            console.log(customerid)
            try {
                const res = await axios.post("http://localhost:5000/api/parentscaredata", { customerid })
                console.log(res.data.data)
                setParentstask(res.data.data)
            } catch (err) {
                console.log(err.message)
                toast.error("Internal Server Error")
            }
        }
        fetchdata()
    }, [ignored])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    console.log("parentsTask", parentsTask)

    const addNewTask = async () => {
        let task = {
            userId: userData._id,
            medicinename: data.medicinename,
            time: data.time,
            relationType: data.relationType,
            phone: Number(data.phone)
        }
        try {
            const res = await axios.post("http://localhost:5000/api/addparentscare", task)
            console.log(res)

            toast.success(res.data.message)
            forceUpdate()
            setData({
                medicinename: "",
                time: "",
                relationType: "",
                phone: ""
            })
        } catch (err) {
            console.log(err.message)
            toast.error("Internal Server Error")
        }


    }

    const addAlart = () => {
        toast.success("You Add A Alart")
    }

    // const fetchTask = async () => {
    //     const customerid = userData._id
    //     console.log(customerid)
    //     try {
    //         const res = await axios.post("http://localhost:5000/api/parentscaredata", { customerid })
    //         console.log(res)

    //     } catch (err) {
    //         console.log(err.message)
    //         toast.error("Internal Server Error")
    //     }
    // }

    return (
        <div className='parentscarediv'>
            <div className='parentscareFormdiv' >
                <input type="text" placeholder='Write medicine name' className='inputParents' onChange={handleChange} name="medicinename" value={data.medicinename} />
                <input type="time" placeholder='Write medicine timing' className='inputParents' onChange={handleChange} name="time" value={data.time} />
                <input type="text" placeholder='Write your parents phone number' className='inputParents' onChange={handleChange} name="phone" value={data.phone} />
                <input type="text" placeholder='Write relation type' className='inputParents' onChange={handleChange} name="relationType" value={data.relationType} />
                <button type="button" className='addBTN' onClick={addNewTask}>Add Medicine Reminder</button>

            </div>

            <div className='allTask'>
                {

                    parentsTask ? parentsTask.map((item, i) => {


                        return <>
                            <div className='parentscareData' key={i}>
                                <div className='information'>
                                    <span className='parentscareDataName'>Medicine Name: {item.medicineName}</span>
                                    <span className='parentscareDataTime'>Time To Taken: {item.time}</span>
                                    <span className='parentscareDataRelationTypeName'>Relation Type: {item.relationType}</span>
                                </div>
                                <div className='alertDiv' onClick={addAlart}>

                                    <AddAlertIcon onClick={addAlart} />
                                </div>
                            </div>
                        </>

                    }) : <h1>Data Not Found</h1>
                }
            </div>

        </div>
    )
}

export default ParentsCare