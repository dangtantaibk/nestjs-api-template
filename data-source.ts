import 'dotenv/config'; // Load .env file
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Add DB_HOST to .env or default to localhost if running locally without Docker
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Path to entities
  migrations: [__dirname + '/migrations/*{.ts,.js}'], // Path to migrations
  synchronize: true, // IMPORTANT: Disable synchronize when using migrations
  logging: true, // Optional: Enable logging for debugging
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
