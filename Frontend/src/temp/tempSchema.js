const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    cart: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    orders: [{
        items: [{
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }],
        totalPrice: Number,
        orderDate: { type: Date, default: Date.now }
    }]
});

// Define Product Schema (just for reference in cart and orders)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

// Define Models
const UserModel = mongoose.model('User', userSchema);
const ProductModel = mongoose.model('Product', productSchema);

// Example routes for adding items to cart and placing orders
app.post('/add-to-cart', async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Add item to user's cart
        user.cart.push({ item: productId, quantity });
        await user.save();
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/place-order', async (req, res) => {
    try {
        const { userId, items, totalPrice } = req.body;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Create order
        user.orders.push({ items, totalPrice });
        await user.save();
        res.status(200).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




const getDeafaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        // const element=all_product[index];
        cart[index] = 0;
    }
    return cart;
}
// const ShopContextProvider = (props) => {
//     const [all_product, setAll_Product] = useState([]);
//     const [cartItems, setCartItems] = useState(getDeafaultCart());
//     useEffect(() => {
//         fetch('http://localhost:4000/allproduct')
//             .then((response) => response.json())
//             .then((data) => setAll_Product(data))

//         if (localStorage.getItem('auth-token')) {
//             fetch('http://localhost:4000/getcart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/form-data',
//                     'auth-token': ${ localStorage.getItem('auth-token') },
//                 'Content-Type': 'application/json',
//               },
//         body: "",
//           }).then((response) => response.json())
//         .then((data) => setCartItems(data));
// }
//   }, [])

// const addToCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     if (localStorage.getItem('auth-token')) {
//         fetch('http://localhost:4000/addtocart', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'auth-token': ${ localStorage.getItem('auth-token') },
//             'Content-Type': 'application/json',
//               },
//     body: JSON.stringify({ "itemId": itemId }),   
//           })
//           .then((response) => response.json())
//     .then((data) => console.log(data));
//       }
//     }
// const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     if (localStorage.getItem('auth-token')) {
//         fetch('http://localhost:4000/removefromcart', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/form-data',
//                 'auth-token': ${ localStorage.getItem('auth-token') },
//             'Content-Type': 'application/json',
//               },
//     body: JSON.stringify({ "itemId": itemId }),   
//           })
//           .then((response) => response.json())
//     .then((data) => console.log(data));
  
//       }
//     }
// const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//         if (cartItems[item] > 0) {
//             let itemInfo = all_product.find((product) => product.id === Number(item))
//             totalAmount += itemInfo.new_price * cartItems[item];
//         }
//     }
//     return totalAmount;
// }
// const getTotalCartItems = () => {
//     let totalItems = 0;
//     for (const item in cartItems) {
//         if (cartItems[item] > 0) {
//             totalItems += cartItems[item];
//         }
//     }
//     return totalItems;
// }
// const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
// return (
//     <ShopContext.Provider value={contextValue}>
//         {props.children}
//     </ShopContext.Provider>
// )
//   }
// export default ShopContextProvider;
