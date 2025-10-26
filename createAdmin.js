const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./Models/userModel");
require("dotenv").config({ path: "./config.env" });

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/libraryProj", {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");

    // Create admin user
    const hashedPassword = await bcrypt.hash("test1234", 10);

    const admin = await User.create({
      name: "Rudraksh",
      email: "khandelwalr207@gmail.com",
      password: hashedPassword,
      role: "admin",
      accountVerified: true,
    });

    console.log("Admin created successfully:");
    console.log("Email: khandelwalr207@gmail.com");
    console.log("Password: test1234");
    console.log("Role: admin");

    process.exit(0);
  } catch (error) {
    if (error.code === 11000) {
      console.log("Admin already exists");
    } else {
      console.error("Error creating admin:", error.message);
    }
    process.exit(1);
  }
}

createAdmin();
