const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function migrate() {
    try {
        console.log('Starting record migration...');

        // 1. Add created_at to users
        console.log('Updating users table...');
        await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

        // 2. Add created_at to muhasaba_logs
        console.log('Updating muhasaba_logs table...');
        await pool.query(`
      ALTER TABLE muhasaba_logs 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

        // 3. Add created_at to ramadan_reports
        console.log('Updating ramadan_reports table...');
        await pool.query(`
      ALTER TABLE ramadan_reports 
      ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    `);

        console.log('✅ Migration completed successfully!');

    } catch (err) {
        console.error('🔥 MIGRATION FAILED:', err);
    } finally {
        await pool.end();
    }
}

migrate();
