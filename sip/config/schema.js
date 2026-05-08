import db from './db.js';

const createTables = () => {
  db.serialize(() => {

    db.run(`PRAGMA foreign_keys = ON`);

    db.run(`
      CREATE TABLE IF NOT EXISTS investors (
        investor_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        middle_name TEXT,
        last_name TEXT NOT NULL,
        pan_number TEXT UNIQUE NOT NULL,
        aadhaar_number TEXT UNIQUE NOT NULL,
        passport_number TEXT UNIQUE,
        date_of_birth DATE NOT NULL,
        gender TEXT CHECK(gender IN ('MALE','FEMALE','OTHER')),
        occupation TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS investor_contact (
        contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
        investor_id INTEGER NOT NULL,
        contact_type TEXT CHECK(contact_type IN ('PHONE','EMAIL')),
        contact_value TEXT NOT NULL,
        FOREIGN KEY (investor_id)
          REFERENCES investors(investor_id)
          ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS portfolios (
        portfolio_id INTEGER PRIMARY KEY AUTOINCREMENT,
        investor_id INTEGER NOT NULL,
        portfolio_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (investor_id)
          REFERENCES investors(investor_id)
          ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS mutual_funds (
        fund_id INTEGER PRIMARY KEY AUTOINCREMENT,
        fund_name TEXT NOT NULL,
        fund_type TEXT CHECK(fund_type IN ('EQUITY','DEBT','HYBRID','INDEX','ELSS')),
        fund_house TEXT NOT NULL,
        nav REAL NOT NULL
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS sips (
        sip_id INTEGER PRIMARY KEY AUTOINCREMENT,
        portfolio_id INTEGER NOT NULL,
        fund_id INTEGER NOT NULL,
        sip_amount REAL NOT NULL,
        sip_frequency TEXT CHECK(sip_frequency IN ('MONTHLY','QUARTERLY')),
        start_date DATE NOT NULL,
        end_date DATE,
        sip_status TEXT CHECK(sip_status IN ('ACTIVE','PAUSED','CLOSED')),
        FOREIGN KEY (portfolio_id)
          REFERENCES portfolios(portfolio_id)
          ON DELETE CASCADE,
        FOREIGN KEY (fund_id)
          REFERENCES mutual_funds(fund_id)
          ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS transaction_master (
        transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
        payment_mode TEXT,
        transaction_status TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS investment_transactions (
        investment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        transaction_id INTEGER NOT NULL,
        portfolio_id INTEGER NOT NULL,
        fund_id INTEGER NOT NULL,
        transaction_type TEXT CHECK(transaction_type IN ('PURCHASE','REDEEM','SWITCH')),
        amount REAL NOT NULL,
        units_allocated REAL,
        transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (transaction_id)
          REFERENCES transaction_master(transaction_id)
          ON DELETE CASCADE,
        FOREIGN KEY (portfolio_id)
          REFERENCES portfolios(portfolio_id)
          ON DELETE CASCADE,
        FOREIGN KEY (fund_id)
          REFERENCES mutual_funds(fund_id)
          ON DELETE CASCADE
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

  });
};

export default createTables;