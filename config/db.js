const mongoose = require('mongoose');
const connectDB = async () => {
    const connectionString = process.env.MONGO_URI;
    try {
        await mongoose.connect(connectionString, {
        // await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
