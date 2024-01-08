import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, username, password, phone, email, jobProfile, address } =
      req.body;

    // Check if username or email is already registered
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = await User.create({
      fullName,
      username,
      password: hashedPassword,
      phone,
      email,
      jobProfile,
      address,
    });

    // Generate tokens

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export { registerUser };
