export class CreateUserDto {
    username: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    type: 'driver' | 'staff';
    roleId: string;
  }