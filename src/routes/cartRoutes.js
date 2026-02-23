import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("customer"), getCart);
router.post("/add", protect, allowRoles("customer"), addToCart);
router.post("/remove", protect, allowRoles("customer"), removeFromCart);

export default router;
