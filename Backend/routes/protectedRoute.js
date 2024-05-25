const express = require('express');
const router = express.Router();
const Medicines = require("../modles/Medicines")
const User = require("../modles/User")
const authMiddleware = require('../middlewares/authMiddleware');
const Transaction = require("../modles/Transaction")


router.post('/protected', authMiddleware, (req, res) => {

    res.status(200).json({ message: 'You are authorized to access this route', success: 1, user: req.user });
});

//get profile
router.post("/profile", authMiddleware, (req, res) => {
    console.log(req.user)
    res.status(200).json({ message: 'You are authorized to access this route', success: 1, user: req.user });
})

// get medicines
router.get("/medicines", async (req, res) => {
    let products = await Medicines.find({});
    // console.log("All product Fetched", products);
    // res.send(products);
    // const data = await Medicines.find({})
    // console.log(data)
    res.status(200).json({ message: "Here is all products", data: products })
})


//add new product
router.post('/addproduct', async (req, res) => {
    try {
        let products = await Medicines.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }
        // if (!id || name || image || old_price || new_price || description || stock) {
        //     return res.status(404).json({ message: "Please Fill ALL Fields" })
        // }
        // else {
        if (!req.body.name || !req.body.image || !req.body.old_price || !req.body.new_price || !req.body.description || !req.body.discount || !req.body.stock) {
            return res.status(400).json({ message: 'Please Fill ALl Fields' })
        }
        console.log("req.body", req.body)
        const product = new Medicines({
            id: id,
            name: req.body.name,
            image: req.body.image,
            catagory: req.body.catagory,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
            description: req.body.description,
            discount: req.body.discount,
            stock: req.body.stock
        });

        console.log(product);
        const response = await product.save();
        console.log(response);
        return res.status(200).json({
            success: true,
            name: req.body.name,
        })
    } catch (err) {
        res.status(401).json({ messaage: 'Internal server error' })
    }


})


//add to cart
router.post('/addtocart', authMiddleware, async (req, res) => {
    console.log("Added in to cart", req.body.itemId);

    let userData = await User.findOne({ _id: req.user._id });
    userData.cartData[req.body.itemId] += 1;
    const response = await User.findOneAndUpdate({ _id: req.user._id }, { cartData: userData.cartData });
    console.log("res:  ", response)

    res.status(200).json({ message: "Added in to cart", success: true, id: req.body.itemId });
})


//remove from cart
router.post('/removefromcart', authMiddleware, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user._id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user._id }, { cartData: userData.cartData });

    res.send("Removed")
})

router.post("/getuserdata", authMiddleware, async (req, res) => {
    res.status(200).json({ userData: req.user })
})

//get all items from cart(display)
router.post('/getcart', authMiddleware, async (req, res) => {
    let userData = await User.findOne({ _id: req.user._id });
    res.json({ cart: userData.cartData, user: req.user, message: "Cart Data Found", success: true });
})


router.post('/transaction', authMiddleware, async (req, res) => {
    const { userId, address, price, transactionId, orderDate } = req.body;
    if (!userId || !address || !price || !transactionId || !orderDate) {
        res.status(404).json({ message: "All Data Is Missing" })
    }
    else {
        try {

            const user = await User.findById(userId);


            const transactionDataRes = user.transaction.push({
                userId: user.id,
                address: address,
                price: price,
                transactionId: transactionId,
                orderDate: orderDate
            })
            res.statusCode(200).json({ message: "Transaction successful", transactionDataRes });
        } catch (e) {
            res.status(404).json({ message: "error", err })
        }
    }
})
module.exports = router;