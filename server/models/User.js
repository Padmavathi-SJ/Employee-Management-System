import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// User schema definition
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profileImage: { type: String }, // Store the image filename (if uploaded)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// User model
const User = mongoose.model("User", userSchema);
export default User;
