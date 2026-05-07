import {
  createFundModel,
  getAllFundsModel,
  getFundByIdModel,
  updateFundNavModel,
  deleteFundModel,
} from "../models/fundModel.js";

export const createFund = async (req, res) => {
  try {
    const { fund_name, fund_type, fund_house, nav } = req.body;
    const result = await createFundModel(fund_name, fund_type, fund_house, nav);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllFunds = async (req, res) => {
  try {
    const data = await getAllFundsModel();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFundById = async (req, res) => {
  try {
    const data = await getFundByIdModel(req.params.id);

    if (!data) return res.status(404).json({ message: "Fund not found" });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateFundNav = async (req, res) => {
  try {
    const result = await updateFundNavModel(req.params.id, req.body.nav);

    if (result.changes === 0)
      return res.status(404).json({ message: "Fund not found" });

    res.status(200).json({ message: "NAV updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFund = async (req, res) => {
  try {
    const result = await deleteFundModel(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ message: "Fund not found" });

    res.status(200).json({ message: "Fund deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};