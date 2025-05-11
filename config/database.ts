import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

// Ensure environment variables are loaded
dotenv.config();

const logger = new Logger('Database');
logger.log(`DATABASE_PASSWORD value: ${process.env.DATABASE_PASSWORD}`);
logger.log(`DATABASE_PASSWORD type: ${typeof process.env.DATABASE_PASSWORD}`);

const pool = new Pool({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'tms',
  password: String(process.env.DATABASE_PASSWORD) || 'postgres', // This line is causing the issue
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait before timing out when connecting a new client
});

export default pool;