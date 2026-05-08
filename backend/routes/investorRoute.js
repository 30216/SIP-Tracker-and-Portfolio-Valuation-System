const express = require('express');
const router = express.Router();

const {
    getInvestors,
    checkInvestorExists,
    getInvestorHoldings,
    calculateNAV
} = require('../controllers/investorController'); 

// Routes
router.get('/mobile', getInvestors);

router.get('/check/mobile', checkInvestorExists);

router.get('/mobile/holdings', getInvestorHoldings);

router.get('/mobile/nav', calculateNAV);

module.exports = router;