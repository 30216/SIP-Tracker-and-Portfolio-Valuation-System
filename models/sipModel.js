import db from "../config/db.js";

export const createSipModel = (data) => {
  return new Promise((resolve, reject) => {
    const {
      portfolio_id,
      fund_id,
      sip_amount,
      sip_frequency,
      start_date,
      end_date,
      sip_status,
    } = data;

    const query = `
      INSERT INTO sips
      (portfolio_id, fund_id, sip_amount,
       sip_frequency, start_date, end_date, sip_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      query,
      [
        portfolio_id,
        fund_id,
        sip_amount,
        sip_frequency,
        start_date,
        end_date,
        sip_status,
      ],
      function (err) {
        if (err) reject(err);
        else resolve({ sip_id: this.lastID });
      }
    );
  });
};

export const getAllSipsModel = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM sips`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const getSipByIdModel = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM sips WHERE sip_id = ?`, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const updateSipStatusModel = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE sips SET sip_status = ? WHERE sip_id = ?`,
      [status, id],
      function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

export const deleteSipModel = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM sips WHERE sip_id = ?`, [id], function (err) {
      if (err) reject(err);
      else resolve({ changes: this.changes });
    });
  });
};