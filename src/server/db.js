import mongoose from "mongoose";

try {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
} catch (error) {
  console.log('Error connecting to DB');
  console.log(error)
}

export default mongoose;