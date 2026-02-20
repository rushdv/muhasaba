const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkRamadanSchema() {
    try {
        const res = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'ramadan_reports'
    `);
        if (res.rows.length === 0) {
            console.log('TABLE ramadan_reports DOES NOT EXIST');
        } else {
            console.log('COLUMNS IN ramadan_reports TABLE:');
            res.rows.forEach(col => {
                console.log(`- ${col.column_name} (${col.data_type})`);
            });
        }
    } catch (err) {
        console.error('DATABASE ERROR:', err);
    } finally {
        await pool.end();
    }
}

checkRamadanSchema();
