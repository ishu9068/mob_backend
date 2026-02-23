import express from "express";
import {
  getAllSellers,
  approveSeller,
  rejectSeller,
} from "../controllers/admin.controller.js";

import { protect, allowRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/sellers", protect, allowRoles("admin"), getAllSellers);
router.put("/approve/:id", protect, allowRoles("admin"), approveSeller);
router.put("/reject/:id", protect, allowRoles("admin"), rejectSeller);

export default router;
