import db from "../config/db.js";

export const createFundModel = (fund_name, fund_type, fund_house, nav) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO mutual_funds (fund_name, fund_type, fund_house, nav)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [fund_name, fund_type, fund_house, nav], function (err) {
      if (err) reject(err);
      else resolve({ fund_id: this.lastID });
    });
  });
};

export const getAllFundsModel = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM mutual_funds`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getFundByIdModel = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM mutual_funds WHERE fund_id = ?`,
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};

export const updateFundNavModel = (id, nav) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE mutual_funds SET nav = ?, updated_at = CURRENT_TIMESTAMP WHERE fund_id = ?`,
      [nav, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

export const deleteFundModel = (id) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM mutual_funds WHERE fund_id = ?`,
      [id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};