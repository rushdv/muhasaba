const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'muhasaba_logs'
    `);
        console.log('COLUMNS IN muhasaba_logs TABLE:');
        res.rows.forEach(col => {
            console.log(`- ${col.column_name} (${col.data_type})`);
        });
    } catch (err) {
        console.error('DATABASE ERROR:', err);
    } finally {
        await pool.end();
    }
}

checkSchema();
