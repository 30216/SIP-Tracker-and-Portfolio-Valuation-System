import db from '../config/db.js';

export function addFundFromDB(data) {

  return new Promise((resolve, reject) => {

    const {
      fund_name,
      fund_type,
      fund_house,
      nav
    } = data;

    db.run(

      `INSERT INTO mutual_fund
      (fund_name, fund_type, fund_house, nav)
      VALUES (?, ?, ?, ?)`,

      [fund_name, fund_type, fund_house, nav],

      function (err) {

        if (err) {

          reject({
            error: err.message,
            message: 'Error adding fund'
          });

        } else {

          resolve({
            message: 'Fund added successfully',
            fund_id: this.lastID
          });

        }

      }

    );

  });

}



export function getFundsFromDB() {

  return new Promise((resolve, reject) => {

    db.all(

      `SELECT *
       FROM mutual_fund`,

      [],

      (err, rows) => {

        if (err) {

          reject({
            error: err.message
          });

        } else {

          resolve(rows);

        }

      }

    );

  });

}



export function updateFundNAVFromDB(fundId, nav) {

  return new Promise((resolve, reject) => {

    db.run(

      `UPDATE mutual_fund
       SET nav = ?
       WHERE fund_id = ?`,

      [nav, fundId],

      function (err) {

        if (err) {

          reject({
            error: err.message
          });

        } else {

          resolve({
            message: 'NAV updated successfully'
          });

        }

      }

    );

  });

}