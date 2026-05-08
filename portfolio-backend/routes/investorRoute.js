import express from 'express';
import investorController from '../controllers/investorController.js';
import { verifyJwt } from '../utility/authManager.js';
import { invalidToken } from '../models/investorModel.js';
const { getInvestor, checkInvestor, investorHoldings, calculateNav,login,logout } = investorController;
const investorRouter=express.Router();

investorRouter.get('/:mobile',(req,res,next)=>{
    const token=req.headers.authorization;
    const cleanToken = token.startsWith("Bearer ")? token.split(" ")[1]: token;
       // console.log(cleanToken);
    try{
        if(invalidToken.includes(cleanToken)){
         return res.send("token expired");
         //return null;
        }
        const payload=verifyJwt(cleanToken);
        if (!payload) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if(payload.role=="user"){
            next();
        }
        else{
            return res.json({message:"Invalid access"});
        }
    }catch(err){
        console.log(err);
    }
}
    ,getInvestor);
investorRouter.get('/check/:mobile',checkInvestor);
investorRouter.get('/:mobile/holdings',investorHoldings);
investorRouter.get('/:mobile/nav',calculateNav);

investorRouter.post('/login',login);
investorRouter.post('/logout',logout);
export default investorRouter;