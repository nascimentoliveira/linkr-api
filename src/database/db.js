import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  // connectionString: process.env.DATABASE_URL,
  host: 'localhost',
  port: 5432,
  user:'postgres',
  database:'linkr',
  password:'91Dc001832//'
};

if (process.env.MODE === 'prod') configDatabase.ssl = true;

const db = new Pool(configDatabase);

export default db;