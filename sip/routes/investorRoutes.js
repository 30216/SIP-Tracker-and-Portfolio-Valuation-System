import express from "express";
import {
  createInvestor,
  getAllInvestors,
  getInvestorById,
  deleteInvestor,
} from "../controllers/investorController.js";

const router = express.Router();

router.post("/", createInvestor);
router.get("/", getAllInvestors);
router.get("/:id", getInvestorById);
router.delete("/:id", deleteInvestor);


router.get("/:investorId/holdings", (req, res) => {
  res.json({
    message: "Holdings API working",
    investorId: req.params.investorId,
  });
});
router.get("/:investorId/networth", (req, res) => {
  res.json({
    investorId: req.params.investorId,
    networth: 0,
    message: "Networth API working (placeholder)"
  });
});
export default router;