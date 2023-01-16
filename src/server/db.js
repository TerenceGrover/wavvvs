import mongoose from 'mongoose';

try {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/wavvvs');
  console.log('Connected to the DB');
} catch (error) {
  console.log('Error connecting to DB');
  console.log({ error });
}

export default mongoose;
