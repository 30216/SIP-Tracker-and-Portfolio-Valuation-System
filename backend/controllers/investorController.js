const {
    getAllInvestors,
    getInvestorByMobile,
    checkInvestorExists,
    getInvestorHoldings,
    calculateNAV
} = require('../models/investorModel');

// GET single investor
const getInvestor = (req, res) => {
    const { mobile } = req.params;

    if (!mobile || mobile.length !== 10) {
        return res.status(400).json({ error: 'Invalid Mobile No.' });
    }

    const investor = getInvestorByMobile(mobile);

    if (!investor) {
        return res.status(404).json({ error: 'Investor not found' });
    }

    res.json(investor);
};

// GET all investors
const getInvestors = (req, res) => {
    res.json(getAllInvestors());
};

// CHECK investor exists
const checkInvestor = (req, res) => {
    const { mobile } = req.params;
    res.json({ exists: checkInvestorExists(mobile) });
};

// GET holdings
const investorHoldings = (req, res) => {
    const { mobile } = req.params;

    const holdings = getInvestorHoldings(mobile);

    if (holdings === null) {
        return res.status(404).json({ error: 'Investor not found' });
    }

    res.json({ holdings });
};

// CALCULATE NAV
const calculateNav = (req, res) => {
    const { mobile } = req.params;

    const nav = calculateNAV(mobile);

    if (nav === null) {
        return res.status(404).json({ error: 'Investor not found' });
    }

    res.json({ nav });
};

module.exports = {
    getInvestor,
    getInvestors,
    checkInvestor,
    investorHoldings,
    calculateNav
};