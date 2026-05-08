import db from "../config/db.js";

export const createUserModel = (name, email, password) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password],
      function (err) {
        if (err) reject(err);
        else resolve({ user_id: this.lastID });
      }
    );
  });
};

export const loginUserModel = (email, password) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
};