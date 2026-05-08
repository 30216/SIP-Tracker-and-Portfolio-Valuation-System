import express from "express";
import {
  createFund,
  getAllFunds,
  getFundById,
  updateFundNav,
  deleteFund,
} from "../controllers/fundController.js";

const router = express.Router();

router.post("/", createFund);
router.get("/", getAllFunds);
router.get("/:id", getFundById);
router.put("/:id/nav", updateFundNav);
router.delete("/:id", deleteFund);

export default router;