const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoute');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes)
mongoose.connect("mongodb+srv://shubhadipcse:4cYEW89opCkOGYYd@cluster0.wdvti0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });