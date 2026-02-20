import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function checkUsers() {
    try {
        const res = await pool.query('SELECT * FROM users');
        console.log('USERS IN DATABASE:');
        if (res.rows.length === 0) {
            console.log('NO USERS FOUND');
        } else {
            res.rows.forEach(user => {
                console.log(`- ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Created At: ${user.created_at}`);
            });
        }

        // Also check muhasaba_logs to see if anything else is being recorded
        const logsRes = await pool.query('SELECT COUNT(*) FROM muhasaba_logs');
        console.log(`\nTOTAL MUHASABA LOGS: ${logsRes.rows[0].count}`);

    } catch (err) {
        console.error('DATABASE ERROR:', err);
    } finally {
        await pool.end();
    }
}

checkUsers();
