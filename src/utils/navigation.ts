export interface NavigationItem {
  key: string;
  label: string;
  path: string;
}

export const navigationItems: NavigationItem[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { key: 'users', label: 'Users', path: '/users' },
  { key: 'analytics', label: 'Analytics', path: '/analytics' },
  { key: 'settings', label: 'Settings', path: '/settings' },
];

export const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/users': 'Users',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
};
