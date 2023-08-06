import { User } from '@base/interfaces/user.interface';
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document,User {}

const userSchema: Schema<UserDocument> = new Schema<UserDocument>(
  {
    userType: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    firstname: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    dob: { type: String, required: true },
    primary: { type: String, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
