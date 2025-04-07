const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'bhabha07@SBI',
  port: 5432,
});

module.exports = pool;
