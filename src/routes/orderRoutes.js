import express from "express";
import { placeOrder, getMyOrders } from "../controllers/order.controller.js";
import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/place", protect, allowRoles("customer"), placeOrder);
router.get("/my", protect, allowRoles("customer"), getMyOrders);

export default router;
