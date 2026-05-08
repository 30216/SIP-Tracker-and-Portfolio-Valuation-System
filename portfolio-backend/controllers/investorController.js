import{ fetchInvestors,calculateTheNav, loginUser, logoutUser, checkInvestorData }from "../models/investorModel.js";
import { signJwt } from "../utility/authManager.js";

const login=(request,response)=>{
    const {email,password}=request.body;
    const user=loginUser(email,password);
    const token=signJwt({email:user.email,role:user.role})
    return response.json({token:token});
}

const logout=(request,response)=>{
    const {email,token}=request.body;
    const result=logoutUser(email,token);
    return response.status(200).json({message:"User logged out"});
}

const getInvestor=async(request,response)=>{
    const {mobile}=request.params;
    const investorProfile=await fetchInvestors(mobile);
    if(investorProfile){
        return response.json({"data":investorProfile});
    }else{
        return response.status(404).json({error:"Investor not found"});
    }
}
/* const checkInvestor=async(request,response)=>{
    const {mobile}=request.params;
    const investorExistance=await checkInvestorData(mobile);
    //console.log(investorExistance);
    if(investorExistance.exists){
        return response.json({"data":investorExistance});
    }else{
        return response.status(404).json({error:"Investor not found"});
    }
} */
const checkInvestor = async (request, response) => {
    try {
        const { mobile } = request.params;
        const investor = await checkInvestorData(mobile);
        console.log(investor);
        if (investor.exists) {
            return response.json({ data: investor.data});
        } else {
            return response.status(404).json({ error: "Investor not found"});
        }
    } catch (err) {
        return response.status(500).json({error: "Server error",details: err.message});
    }
};

const investorHoldings=(request,response)=>{
console.log("holdings")
}
const calculateNav=async(request,response)=>{
    const {mobile}=request.params;
    /* if(mobile.length!=10){
        response.send("Invalid mobilenumber");
    }
    else{ */
        const nav=await calculateTheNav(mobile);
        console.log(nav);
        return response.json({nav});
    
    return response.json({undefined});
}


export default {getInvestor,checkInvestor,investorHoldings,calculateNav,login,logout}
