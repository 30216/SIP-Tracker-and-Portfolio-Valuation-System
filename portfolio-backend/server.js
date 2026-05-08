import express from 'express';
import investorRouter from './routes/investorRoute.js';

const app=express();
app.use(express.json());

app.use('/api/investor',investorRouter);


app.listen(2005,()=>{
    console.log("server started");
})