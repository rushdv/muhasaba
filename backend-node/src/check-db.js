const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');

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
    } catch (err) {
        console.error('DATABASE ERROR:', err);
    } finally {
        await pool.end();
    }
}

checkUsers();
