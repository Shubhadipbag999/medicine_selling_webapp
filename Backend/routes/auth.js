const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modles/User');
const Medicines = require("../modles/Medicines")
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware")


router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You are authorized to access this route' });
});


router.post('/signup', async (req, res) => {
    try {
        const { name, age, email, phone, password, address, authority } = req.body;
        if (!name || !age || !email || !password || !phone || !address) {
            return res.status(404).json({ message: 'Please Fill All Required Fields' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        const user = new User({ name, age, email, phone, address, password: hashedPassword, authority, cartData: cart });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/addmedicine', async (req, res) => {
    try {
        const { image, name, price, description } = req.body;
        const product = new Medicines({ name, price, description, image });
        await product.save();
        res.status(201).json({ message: 'Product saved successfully' })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: 'Please Fill All Required Fields' })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User Not Found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, userId: user._id, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get("/", authMiddleware, (req, res) => {

    res.status(200).json({ token: "welcome", user: req.user });
})



router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});


module.exports = router;