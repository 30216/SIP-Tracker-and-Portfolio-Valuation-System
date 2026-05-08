import db from '../config/db.js';



export function createSipFromDB(data) {

    return new Promise((resolve, reject) => {

        const {
            portfolio_id,
            fund_id,
            sip_amount,
            sip_frequency,
            start_date,
            end_date,
            sip_status
        } = data;

        db.run(

            `
            INSERT INTO sip_registration
            (
                portfolio_id,
                fund_id,
                sip_amount,
                sip_frequency,
                start_date,
                end_date,
                sip_status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,

            [
                portfolio_id,
                fund_id,
                sip_amount,
                sip_frequency,
                start_date,
                end_date,
                sip_status
            ],

            function(err) {

                if(err) {

                    reject(err);

                } else {

                    resolve({
                        message: 'SIP created successfully',
                        sip_id: this.lastID
                    });

                }

            }

        );

    });

}


export function getSipByIdFromDB(sip_id) {

    return new Promise((resolve, reject) => {

        db.get(

            `
            SELECT *
            FROM sip_registration
            WHERE sip_id = ?
            `,

            [sip_id],

            (err, row) => {

                if(err) {

                    reject(err);

                } else {

                    resolve(row);

                }

            }

        );

    });

}


export function processSipFromDB(sip_id) {

    return new Promise((resolve, reject) => {

        db.get(

            `
            SELECT *
            FROM sip_registration
            WHERE sip_id = ?
            `,

            [sip_id],

            (err, sip) => {

                if(err) return reject(err);

                if(!sip) {

                    return reject({
                        message: 'SIP not found'
                    });

                }

                db.get(

                    `
                    SELECT nav
                    FROM mutual_fund
                    WHERE fund_id = ?
                    `,

                    [sip.fund_id],

                    (err2, fund) => {

                        if(err2) return reject(err2);

                        const units = sip.sip_amount / fund.nav;

                        db.run(

                            `
                            INSERT INTO transaction_master
                            (payment_mode, transaction_status)
                            VALUES ('AUTO_DEBIT', 'SUCCESS')
                            `,

                            function(err3) {

                                if(err3) return reject(err3);

                                const transactionId = this.lastID;

                                db.run(

                                    `
                                    INSERT INTO investment_transaction
                                    (
                                        transaction_id,
                                        portfolio_id,
                                        fund_id,
                                        transaction_type,
                                        amount,
                                        units_allocated
                                    )
                                    VALUES (?, ?, ?, ?, ?, ?)
                                    `,

                                    [
                                        transactionId,
                                        sip.portfolio_id,
                                        sip.fund_id,
                                        'PURCHASE',
                                        sip.sip_amount,
                                        units
                                    ],

                                    function(err4) {

                                        if(err4) {

                                            reject(err4);

                                        } else {

                                            resolve({
                                                message: 'SIP processed successfully'
                                            });

                                        }

                                    }

                                );

                            }

                        );

                    }

                );

            }

        );

    });

}


export function getSipTransactionsFromDB(sip_id) {

    return new Promise((resolve, reject) => {

        db.all(

            `
            SELECT
                it.*
            FROM investment_transaction it

            JOIN sip_registration sr
            ON it.portfolio_id = sr.portfolio_id

            WHERE sr.sip_id = ?
            `,

            [sip_id],

            (err, rows) => {

                if(err) {

                    reject(err);

                } else {

                    resolve(rows);

                }

            }

        );

    });

}