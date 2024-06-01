const express = require('express');

const router = express.Router();
const Razorpay = require('razorpay');
const Medicines = require("../modles/Medicines")
const User = require("../modles/User")
const crypto = require('crypto');
const authMiddleware = require('../middlewares/authMiddleware');
const Transaction = require("../modles/Transaction")
const ParentsCare = require("../modles/ParentsCare")

const razorpay = new Razorpay({
    key_id: 'rzp_test_b3CFvAy9NYhkgt',
    key_secret: 'd7ycsY5LMmn3YXzsvWDDiNfC',
});

router.post('/create-order', async (req, res) => {
    const { amount, currency, receipt } = req.body;

    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const generated_signature = crypto
        .createHmac('sha256', 'YOUR_KEY_SECRET')
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

    if (generated_signature === razorpay_signature) {
        res.status(200).json({ status: 'success' });
    } else {
        res.status(400).json({ status: 'failure' });
    }
});

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


//add parents care
router.post("/addparentscare", async (req, res) => {
    const { medicinename, userId, time, relationType, phone } = req.body;
    console.log("medicine name", userId)
    const parentsTodoData = new ParentsCare({
        userId: userId,
        medicineName: medicinename,
        time: time,
        relationType: relationType,
        mobileNumber: phone
    });
    try {
        const newTodo = await parentsTodoData.save();
        res.status(201).json({ success: true, message: "Task Will Added To database", newTodo });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }

})

//get parents care data
router.post("/parentscaredata", async (req, res) => {
    console.log("backend", req.body)
    const data = await ParentsCare.find({ userId: req.body.customerid });
    console.log(data)
    res.status(200).json({ message: "get all  parents care data", data })

})

//get all items from cart(display)
router.post('/getcart', authMiddleware, async (req, res) => {
    let userData = await User.findOne({ _id: req.user._id });
    res.json({ cart: userData.cartData, user: req.user, message: "Cart Data Found", success: true });
})


router.get("/getalluser", async (req, res) => {
    let userData = await User.find()
    res.json({ message: "Get All User", userData })
})
module.exports = router;