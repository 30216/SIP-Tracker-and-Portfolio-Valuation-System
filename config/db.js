import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbPath = process.env.DB_PATH;

if (!dbPath) {
    console.error("DB_PATH is not defined in .env file");
    process.exit(1);
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.log('Database connection failed:', err.message);
    } else {
        console.log("Database connected successfully to SQLite");
    }
});

export default db;