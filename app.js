const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const { swaggerUi, specs } = require('./config/swagger');

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
