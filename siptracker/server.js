import express from 'express';

import investorRoute from './routes/investorRoutes.js';
import mutualRoute from './routes/mutualFundsRoutes.js';
import sipRoute from './routes/sipInstallmentRoutes.js';

const app = express();

app.use(express.json());

app.use('/api/investor', investorRoute);

app.use('/api/mutual', mutualRoute);

app.use('/api/sip', sipRoute);

app.listen(3000, () => {

    console.log("Server is running on port 3000");

});