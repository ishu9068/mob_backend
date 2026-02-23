import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },

    isApproved: { type: Boolean, default: false },

    organization: { type: String, default: "" },

    address: { type: String, default: "" },

    categories: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
