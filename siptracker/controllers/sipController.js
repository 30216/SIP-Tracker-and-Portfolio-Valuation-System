import {
    createSipFromDB,
    getSipByIdFromDB,
    processSipFromDB,
    getSipTransactionsFromDB
} from '../models/sipModel.js';


export const createSip = async (req, res) => {

    try {

        const data = await createSipFromDB(req.body);

        return res.status(201).json(data);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};



export const oneSipDetails = async (req, res) => {

    try {

        const { sid } = req.params;

        const data = await getSipByIdFromDB(sid);

        return res.status(200).json(data);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};



export const processSip = async (req, res) => {

    try {

        const { sid } = req.params;

        const data = await processSipFromDB(sid);

        return res.status(200).json(data);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};


export const sipTransactions = async (req, res) => {

    try {

        const { sid } = req.params;

        const data = await getSipTransactionsFromDB(sid);

        return res.status(200).json(data);

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

};