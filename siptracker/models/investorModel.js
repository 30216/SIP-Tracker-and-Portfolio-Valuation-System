import db from "../config/db.js";



// ADD INVESTOR
export function addInvestorFromDB(data) {

    return new Promise((resolve, reject) => {

        const {

            first_name,
            middle_name,
            last_name,
            pan_number,
            aadhaar_number,
            passport_number,
            date_of_birth,
            gender,
            occupation

        } = data;

        db.run(

            `
            INSERT INTO investor
            (
                first_name,
                middle_name,
                last_name,
                pan_number,
                aadhaar_number,
                passport_number,
                date_of_birth,
                gender,
                occupation
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,

            [
                first_name,
                middle_name,
                last_name,
                pan_number,
                aadhaar_number,
                passport_number,
                date_of_birth,
                gender,
                occupation
            ],

            function(err) {

                if(err) {

                    console.log(err);

reject({
    message: err.message,
    error: err
});

                } else {

                    resolve({
                        message: "Investor Added",
                        investor_id: this.lastID
                    });

                }

            }

        );

    });

}





// GET ALL INVESTORS
export function getAllInvestorsFromDB() {

    return new Promise((resolve, reject) => {

        db.all(

            `
            SELECT *
            FROM investor
            `,

            [],

            (err, rows) => {

                if(err) {

                    console.log(err);

reject({
    message: err.message,
    error: err
});

                } else {

                    resolve(rows);

                }

            }

        );

    });

}





// GET SINGLE INVESTOR
export function getAInvestorFromDB(id) {

    return new Promise((resolve, reject) => {

        db.get(

            `
            SELECT *
            FROM investor
            WHERE investor_id = ?
            `,

            [id],

            (err, row) => {

                if(err) {

                    console.log(err);

reject({
    message: err.message,
    error: err
});

                } else {

                    resolve(row);

                }

            }

        );

    });

}