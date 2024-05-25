const jwt = require('jsonwebtoken');
const User = require('../modles/User')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("hashjdkj", req.headers.authorization.split(' ')[1]);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`decoded token middleware ${decodedToken}`)
        const user = await User.findById(decodedToken.userId);
        console.log(user)
        req.user = user;

        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).json({ message: 'Unauthorized user Please Login' });
    }

};



