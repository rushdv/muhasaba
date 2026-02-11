// @ts-ignore
import { Pool } from 'pg';
import { config } from '../config';

const pool = new Pool({
  connectionString: config.database.url,
  ssl: config.database.url.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

// Test connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err: any) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

export const getClient = async () => {
  const client = await pool.connect();
  return client;
};

// Initialize database tables
export const initDatabase = async () => {
  try {
    // Create users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        hashed_password VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create muhasaba_logs table
    await query(`
      CREATE TABLE IF NOT EXISTS muhasaba_logs (
        id SERIAL PRIMARY KEY,
        task_name VARCHAR(255) NOT NULL,
        is_completed BOOLEAN DEFAULT false,
        log_date DATE DEFAULT CURRENT_DATE,
        note TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create ramadan_reports table
    await query(`
      CREATE TABLE IF NOT EXISTS ramadan_reports (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        day_number INTEGER NOT NULL,
        log_date DATE DEFAULT CURRENT_DATE,
        
        -- Core Ibadah
        is_fasting BOOLEAN DEFAULT false,
        salah_fajr BOOLEAN DEFAULT false,
        salah_dhuhr BOOLEAN DEFAULT false,
        salah_asr BOOLEAN DEFAULT false,
        salah_maghrib BOOLEAN DEFAULT false,
        salah_isha BOOLEAN DEFAULT false,
        taraweeh BOOLEAN DEFAULT false,
        tahajjud BOOLEAN DEFAULT false,
        duha BOOLEAN DEFAULT false,
        tahiyatul_masjid BOOLEAN DEFAULT false,
        tahiyatul_wudu BOOLEAN DEFAULT false,
        
        -- Sunnat/Nawafil
        sunnat_fajr BOOLEAN DEFAULT false,
        sunnat_dhuhr BOOLEAN DEFAULT false,
        sunnat_asr BOOLEAN DEFAULT false,
        sunnat_maghrib BOOLEAN DEFAULT false,
        sunnat_isha BOOLEAN DEFAULT false,
        
        -- Quran Tracker
        quran_para INTEGER,
        quran_page INTEGER,
        quran_ayat INTEGER,
        quran_progress VARCHAR(255),
        
        -- Daily Checklist
        sokal_er_zikr BOOLEAN DEFAULT false,
        shondha_er_zikr BOOLEAN DEFAULT false,
        had_sadaqah BOOLEAN DEFAULT false,
        daily_task BOOLEAN DEFAULT false,
        jamaat_salat BOOLEAN DEFAULT false,
        istighfar_70 BOOLEAN DEFAULT false,
        quran_translation BOOLEAN DEFAULT false,
        allahur_naam_shikkha BOOLEAN DEFAULT false,
        diner_ayat_shikkha BOOLEAN DEFAULT false,
        diner_hadith_shikkha BOOLEAN DEFAULT false,
        miswak BOOLEAN DEFAULT false,
        calling_relative BOOLEAN DEFAULT false,
        learning_new BOOLEAN DEFAULT false,
        
        -- Metrics
        spiritual_energy INTEGER DEFAULT 5 CHECK (spiritual_energy >= 1 AND spiritual_energy <= 10),
        reflection_note TEXT,
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, day_number)
      )
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

export default pool;
