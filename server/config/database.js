const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '../db.json');

// ─── JSON-file DB (always available as fallback) ───────────────────────────
const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { user: [], Bookservice: [], address: [], forgotPasswordLink: [], newsletter: [], faq: [], coupon: [], postalcode: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// ─── PostgreSQL pool (loaded lazily when USE_POSTGRES=true) ───────────────
let pgPool = null;
const getPgPool = () => {
  if (!pgPool) {
    const { Pool } = require('pg');
    pgPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'helperland_db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
    });
  }
  return pgPool;
};

const usePostgres = () => process.env.USE_POSTGRES === 'true';

module.exports = { readDB, writeDB, getPgPool, usePostgres };
