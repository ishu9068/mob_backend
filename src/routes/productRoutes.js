import express from "express";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/product.controller.js";

import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Seller
router.post("/", protect, allowRoles("seller"), createProduct);
router.get("/my", protect, allowRoles("seller"), getSellerProducts);
router.put("/:id", protect, allowRoles("seller"), updateProduct);
router.delete("/:id", protect, allowRoles("seller"), deleteProduct);

export default router;
