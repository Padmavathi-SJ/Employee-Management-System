import User from './models/User.js';
import bcrypt from 'bcrypt';
import connectToDatabase from './db/db.js';

const userRegister = async () => {
    await connectToDatabase();
    try {
        const hashPassword = await bcrypt.hash("admin", 10);

        // Create a new user
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        });

        // Save the new user to the database
        await newUser.save();
    } catch (error) {
       console.log(error);
    }
};

// Call the function to register the user
userRegister();
