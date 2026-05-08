import {
  addFundFromDB,
  getFundsFromDB,
  updateFundNAVFromDB
} from '../models/fundModel.js';

export const createFund = async (req, res) => {

  try {

    const fund = await addFundFromDB(req.body);

    return res.status(201).json(fund);

  } catch (err) {

    return res.status(500).json(err);

  }

};

export const getFunds = async (req, res) => {

  try {

    const funds = await getFundsFromDB();

    return res.json(funds);

  } catch (err) {

    return res.status(500).json(err);

  }

};

export const updateFundNAV = async (req, res) => {

  try {

    const { fundId } = req.params;

    const { nav } = req.body;

    const result = await updateFundNAVFromDB(fundId, nav);

    return res.json(result);

  } catch (err) {

    return res.status(500).json(err);

  }

};