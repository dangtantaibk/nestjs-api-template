// Define an interface for the validated user object (excluding password)
export interface ValidatedUser {
  id: number;
  username: string;
  role: string;
  // Add other relevant fields from User entity except passwordHash
}

// Define an interface for the JWT payload
export interface JwtPayload {
  username: string;
  sub: number; // Standard JWT field for subject (user ID)
  role: string;
}
