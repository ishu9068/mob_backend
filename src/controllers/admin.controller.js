import User from "../models/user.model.js";

// GET all sellers
export const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.json({ sellers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve seller
export const approveSeller = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);

    if (!seller) return res.status(404).json({ message: "Seller not found " });

    if (seller.role !== "seller") {
      return res.status(400).json({ message: "User is not a seller " });
    }

    seller.isApproved = true;
    await seller.save();

    res.json({ message: "Seller approved ", seller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject seller
export const rejectSeller = async (req, res) => {
  try {
    const seller = await User.findById(req.params.id);

    if (!seller) return res.status(404).json({ message: "Seller not found " });

    if (seller.role !== "seller") {
      return res.status(400).json({ message: "User is not a seller " });
    }

    seller.isApproved = false;
    await seller.save();

    res.json({ message: "Seller rejected ", seller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
