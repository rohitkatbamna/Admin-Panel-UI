export type UserRole = 'admin' | 'manager' | 'analyst';
export type UserStatus = 'active' | 'invited' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
