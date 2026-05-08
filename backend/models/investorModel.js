// Dummy in-memory data (acts like a database)
const investors = [
    { mobile: '9876543210', name: 'Ujwala', holdings: 50000 },
    { mobile: '9123456780', name: 'Rahul', holdings: 75000 }
];

// Get all investors
const getAllInvestors = () => {
    return investors;
};

// Get investor by mobile
const getInvestorByMobile = (mobile) => {
    return investors.find(inv => inv.mobile === mobile);
};

// Check if investor exists
const checkInvestorExists = (mobile) => {
    return investors.some(inv => inv.mobile === mobile);
};

// Get holdings
const getInvestorHoldings = (mobile) => {
    const investor = getInvestorByMobile(mobile);
    return investor ? investor.holdings : null;
};

// Calculate NAV
const calculateNAV = (mobile) => {
    const investor = getInvestorByMobile(mobile);
    if (!investor) return null;

    return investor.holdings * 1.1; // same logic as controller
};

module.exports = {
    getAllInvestors,
    getInvestorByMobile,
    checkInvestorExists,
    getInvestorHoldings,
    calculateNAV
};