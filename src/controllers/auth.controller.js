import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, organization, address, categories } =
      req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "name, email, password, role required ",
      });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists " });

    const hashed = await bcrypt.hash(password, 10);

    // customer auto approved, seller pending, admin manual only
    let isApproved = false;

    if (role.toLowerCase() === "customer") isApproved = true;
    if (role.toLowerCase() === "seller") isApproved = false;
    if (role.toLowerCase() === "admin") isApproved = true;

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      isApproved,
      organization: organization || "",
      address: address || "",
      categories: categories || [],
    });

    res.status(201).json({
      message: "Signup successful ",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error ", error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & Password required " });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials " });

    // seller approval check
    if (user.role === "seller" && user.isApproved === false) {
      return res
        .status(403)
        .json({ message: "Seller not approved by admin yet " });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials " });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful ", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error ", error: err.message });
  }
};
