import {
    addInvestorFromDB,
    getAllInvestorsFromDB,
    getAInvestorFromDB,
    investorHoldingsFromDB,
    totalInvestmentOfUserFromDB
} from "../models/investorModels.js";


export const createInvestor = async (req, res) => {

    try {

        const investor = await addInvestorFromDB(req.body);

        return res.status(201).json(investor);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};

export const getAllInvestors = async (req, res) => {

    try {

        const investors = await getAllInvestorsFromDB();

        return res.status(200).json(investors);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};


export const getAInvestor = async (req, res) => {

    try {

        const investor = await getAInvestorFromDB(req.params.id);

        if (!investor) {

            return res.status(404).json({
                message: 'Investor not found'
            });

        }

        return res.status(200).json(investor);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};


export const investorHoldings = async (req, res) => {

    try {

        const holdings = await investorHoldingsFromDB(req.params.id);

        return res.status(200).json(holdings);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};


export const totalInvestmentOfUser = async (req, res) => {

    try {

        const networth = await totalInvestmentOfUserFromDB(req.params.id);

        return res.status(200).json(networth);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};