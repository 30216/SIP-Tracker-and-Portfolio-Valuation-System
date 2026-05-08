import {
  createSipModel,
  getAllSipsModel,
  getSipByIdModel,
  updateSipStatusModel,
  deleteSipModel,
} from "../models/sipModel.js";

export const createSip = async (req, res) => {
  try {
    const result = await createSipModel(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllSips = async (req, res) => {
  try {
    const data = await getAllSipsModel();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSipById = async (req, res) => {
  try {
    const data = await getSipByIdModel(req.params.id);

    if (!data)
      return res.status(404).json({ message: "SIP not found" });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSipStatus = async (req, res) => {
  try {
    const result = await updateSipStatusModel(
      req.params.id,
      req.body.sip_status
    );

    if (result.changes === 0)
      return res.status(404).json({ message: "SIP not found" });

    res.status(200).json({ message: "SIP status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteSip = async (req, res) => {
  try {
    const result = await deleteSipModel(req.params.id);

    if (result.changes === 0)
      return res.status(404).json({ message: "SIP not found" });

    res.status(200).json({ message: "SIP deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};