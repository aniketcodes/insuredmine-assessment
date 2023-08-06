import mongoose from 'mongoose';

// Connect to MongoDB
async function connectDB(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {});
  
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  export default connectDB;
