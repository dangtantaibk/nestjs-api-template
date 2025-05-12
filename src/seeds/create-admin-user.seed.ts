import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

export default async function createAdminUser(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  
  // Check if admin user already exists
  const existingAdmin = await userRepository.findOneBy({ email: 'admin@example.com' });
  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }
  
  // Create admin role if doesn't exist
  let adminRole = await roleRepository.findOneBy({ name: 'admin' });
  if (!adminRole) {
    adminRole = roleRepository.create({
      name: 'admin',
      description: 'Administrator role'
    });
    await roleRepository.save(adminRole);
  }
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('AdminPassword123!', 10);
  const adminUser = userRepository.create({
    email: 'admin@example.com',
    password: hashedPassword,
    fullName: 'Admin User',
    roles: [adminRole]
  });
  
  await userRepository.save(adminUser);
  console.log('Admin user created successfully');
}