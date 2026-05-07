import {
  createInvestorModel,
  getAllInvestorsModel,
  getInvestorByIdModel,
  deleteInvestorModel,
} from "../models/investorModel.js";

export const createInvestor = async (req, res) => {
  try {
    const result = await createInvestorModel(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllInvestors = async (req, res) => {
  try {
    const data = await getAllInvestorsModel();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInvestorById = async (req, res) => {
  try {
    const data = await getInvestorByIdModel(req.params.id);

    if (!data)
      return res.status(404).json({ message: "Investor not found" });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteInvestor = async (req, res) => {
  try {
    const result = await deleteInvestorModel(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ message: "Investor not found" });

    res.status(200).json({ message: "Investor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};