import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, default: "" },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    description: { type: String, default: "" },
    category: { type: String, default: "" },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
