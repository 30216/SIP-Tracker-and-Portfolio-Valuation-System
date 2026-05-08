import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(
    'C:/Users/india/Desktop/webileapps/training/Database/SIP',

    (err) => {

        if (err) {

            console.log(
                'Database connection failed',
                err.message
            );

        } else {

            console.log(
                'Connected to SQLite database'
            );

        }

    }
);

export default db;