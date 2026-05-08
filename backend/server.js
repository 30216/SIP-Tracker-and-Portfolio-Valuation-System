const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/investors', require('./routes/investorRoute'));




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});