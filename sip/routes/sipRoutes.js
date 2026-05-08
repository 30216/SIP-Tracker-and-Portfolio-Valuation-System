import express from "express";
import {
  createSip,
  getAllSips,
  getSipById,
  updateSipStatus,
  deleteSip,
} from "../controllers/sipController.js";

const router = express.Router();

router.post("/", createSip);
router.get("/", getAllSips);
router.get("/:id", getSipById);
router.put("/:id/status", updateSipStatus);
router.delete("/:id", deleteSip);

export default router;