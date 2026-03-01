import type { User, UserFormData } from '../types/user';
import { delay } from '../utils/delay';

let usersDb: User[] = [
  {
    id: 'user-1',
    name: 'Sophia Turner',
    email: 'sophia.turner@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2025-08-11',
    lastLogin: '2026-02-28',
  },
  {
    id: 'user-2',
    name: 'Jackson Reed',
    email: 'jackson.reed@example.com',
    role: 'manager',
    status: 'active',
    createdAt: '2025-10-03',
    lastLogin: '2026-02-27',
  },
  {
    id: 'user-3',
    name: 'Olivia Hayes',
    email: 'olivia.hayes@example.com',
    role: 'analyst',
    status: 'invited',
    createdAt: '2026-01-09',
    lastLogin: 'Never',
  },
  {
    id: 'user-4',
    name: 'Ethan Brooks',
    email: 'ethan.brooks@example.com',
    role: 'manager',
    status: 'suspended',
    createdAt: '2025-07-14',
    lastLogin: '2026-01-20',
  },
  {
    id: 'user-5',
    name: 'Mia Foster',
    email: 'mia.foster@example.com',
    role: 'analyst',
    status: 'active',
    createdAt: '2025-12-21',
    lastLogin: '2026-02-26',
  },
];

const createMockId = (): string =>
  `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const userService = {
  async fetchUsers(): Promise<User[]> {
    await delay(650);
    return [...usersDb];
  },

  async createUser(user: UserFormData): Promise<User> {
    await delay(500);
    const newUser: User = {
      id: createMockId(),
      ...user,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
    };

    usersDb = [newUser, ...usersDb];
    return newUser;
  },

  async updateUser(id: string, user: UserFormData): Promise<User> {
    await delay(500);
    const currentUser = usersDb.find((record) => record.id === id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    const updatedUser: User = {
      ...currentUser,
      ...user,
    };

    usersDb = usersDb.map((record) => (record.id === id ? updatedUser : record));
    return updatedUser;
  },
};
