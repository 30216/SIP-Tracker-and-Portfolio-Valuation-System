import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 6543,
  user: 'postgres.zmywpdgabjditdacoamg',
  password: process.env.PASSWORD, // FIXED (uppercase recommended)
  database: 'postgres',
  maxUses: 4,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;