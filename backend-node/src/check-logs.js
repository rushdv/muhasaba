const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkLogs() {
    try {
        const res = await pool.query('SELECT * FROM muhasaba_logs ORDER BY created_at DESC LIMIT 10');
        console.log('RECENT MUHASABA LOGS:');
        if (res.rows.length === 0) {
            console.log('NO LOGS FOUND');
        } else {
            res.rows.forEach(log => {
                console.log(`- ID: ${log.id}, Task: ${log.task_name}, Date: ${log.log_date}, UserID: ${log.user_id}`);
            });
        }
    } catch (err) {
        console.error('DATABASE ERROR:', err);
    } finally {
        await pool.end();
    }
}

checkLogs();
