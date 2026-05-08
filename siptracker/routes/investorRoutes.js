import express from "express";

import {

    addInvestorFromDB,
    getAllInvestorsFromDB,
    getAInvestorFromDB

} from "../models/investorModel.js";

const router = express.Router();



// ADD INVESTOR
router.post("/", async (req, res) => {

    try {

        const result = await addInvestorFromDB(req.body);

        res.status(201).json(result);

    } catch (error) {

        console.log("API ERROR:", error);

        res.status(500).json(error);

    }

});




// GET ALL INVESTORS
router.get("/", async (req, res) => {

    try {

        const result = await getAllInvestorsFromDB();

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json(error);

    }

});




// GET SINGLE INVESTOR
router.get("/:id", async (req, res) => {

    try {

        const result = await getAInvestorFromDB(req.params.id);

        if (!result) {

            return res.status(404).json({
                message: "Investor not found"
            });

        }

        res.status(200).json(result);

    } catch (error) {

        res.status(500).json(error);

    }

});

export default router;