import db from "../pgManager.js";

export const createInvestorModel = (data) => {
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
      occupation,
    } = data;

    const query = `
      INSERT INTO investors
      (first_name, middle_name, last_name, pan_number,
       aadhaar_number, passport_number, date_of_birth,
       gender, occupation)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        first_name,
        middle_name,
        last_name,
        pan_number,
        aadhaar_number,
        passport_number,
        date_of_birth,
        gender,
        occupation,
      ],
      function (err) {
        if (err) reject(err);
        else resolve({ investor_id: this.lastID });
      }
    );
  });
};

export const getAllInvestorsModel = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM investors`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getInvestorByIdModel = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM investors WHERE investor_id = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const deleteInvestorModel = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM investors WHERE investor_id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};