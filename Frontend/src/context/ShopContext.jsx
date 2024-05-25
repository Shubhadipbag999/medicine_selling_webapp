import React, { useState, useEffect, createContext } from "react";
import all_product from "../components/assets/all_product";
import { toast } from "react-toastify";
import axios from 'axios';


export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}



const ShopProvider = (props) => {
    let authinticated = false;
    const [userData, setData] = useState({});
    let defaultValue = 0;
    const [cartItem, setCartitem] = useState(getDefaultCart())
    const [medicineData, setAllMedicineData] = useState([{}])

    useEffect(() => {

        const fetchDate = async () => {

            const data = await axios.get("http://localhost:5000/api/medicines");

            setAllMedicineData(data.data.data);
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

                        console.log(res.data.cart)
                        authinticated = true;
                        setData(res.data.user)
                        setCartitem(res.data.cart)
                    })

                    .catch((err) => console.log(err))

            }
            else {
                console.log("You Are not Authorized")
            }

        }


        fetchDate()
    }, [])




    //add to cart
    const addToCart = async (itemId) => {
        setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('token')) {
            console.log("You Are Authorized", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            const data = {
                itemId: itemId
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            console.log("item id", itemId)
            try {

                const res = await axios.post("http://localhost:5000/api/addtocart", data, { headers })
                console.log(res);
                toast.success("Item added successfully to cart")

            } catch (err) {
                console.log("Something error", err)
            }
        }
        else {
            toast.warning("Login First")
        }


    }


    //remove from cart
    const removeFromCart = async (itemId) => {
        setCartitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem('token')) {
            console.log("You Are Authorized", localStorage.getItem('token'))
            const token = localStorage.getItem('token')
            const data = {
                itemId: itemId
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            console.log("item id", itemId)
            try {

                const res = await axios.post("http://localhost:5000/api/removefromcart", data, { headers })
                console.log(res);
                toast.warning("Item removed from cart")
                return cartItem;

            } catch (err) {
                console.log("Something error", err)
            }
        }
        else {
            toast.warning("Login First")
        }
    }


    //cart item count
    const knowCOunt = () => {
        let totalItem = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                totalItem += cartItem[item];
            }
        }
        return totalItem;
    }

    //total cart amount
    const getTotalamount = () => {
        let sum = 0;
        medicineData.map((item, i) => {
            if (cartItem[item.id] > 0) {

                let singleItemTotalAmount = cartItem[item.id] * item.new_price;
                sum += singleItemTotalAmount;

            }
        })
        return sum.toFixed(2);
    }



    const afterPayment = () => {

        medicineData.map((item, kry) => {
            if (cartItem[item.id] > 0) {
                setCartitem(cartItem[item.id] = 0)
            }
        })

    }



    const contextValue = { medicineData, userData, defaultValue, all_product, cartItem, addToCart, removeFromCart, knowCOunt, getTotalamount, setCartitem, afterPayment };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopProvider;