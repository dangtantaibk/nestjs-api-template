import { DataSource } from 'typeorm';
import createAdminUser from '../seeds/create-admin-user.seed';
import dataSource from './data-source'; // Import the default export

async function runSeeds() {
  try {
    // Use the imported dataSource directly
    await dataSource.initialize();
    console.log('Database connection established successfully');
    
    await createAdminUser(dataSource);
    await dataSource.destroy(); // Close the connection
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

runSeeds()
  .then(() => console.log('Seeds completed'))
  .catch(error => console.error('Seeds failed', error));