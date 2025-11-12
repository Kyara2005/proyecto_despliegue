import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        const { connection: dbConnection } = await mongoose.connect(process.env.MONGO_URI_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`✅ Database connected on ${dbConnection.host}:${dbConnection.port}`);
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
    }
};

export default connection;
