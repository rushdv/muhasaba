const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function testSignup() {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testUsername = `testuser_${Date.now()}`;
    const testPassword = 'Password123!';

    try {
        console.log(`Attempting to sign up test user: ${testEmail}`);

        const hashedPassword = await bcrypt.hash(testPassword, 10);

        const result = await pool.query(
            "INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING *",
            [testUsername, testEmail, hashedPassword]
        );

        const newUser = result.rows[0];
        console.log('✅ Signup successful!');
        console.log(`New User ID: ${newUser.id}`);
        console.log(`Username: ${newUser.username}`);
        console.log(`Email: ${newUser.email}`);

        // Verify by fetching
        const fetchRes = await pool.query('SELECT * FROM users WHERE email = $1', [testEmail]);
        if (fetchRes.rows.length > 0) {
            console.log('✅ User verified in database');
        } else {
            console.log('❌ User NOT found in database after successful insert! (This would be very strange)');
        }

        // Cleanup
        await pool.query('DELETE FROM users WHERE id = $1', [newUser.id]);
        console.log('✅ Cleanup: Test user deleted.');

    } catch (err) {
        console.error('🔥 SIGNUP FAILED:', err);
    } finally {
        await pool.end();
    }
}

testSignup();
