import type { DashboardData } from '../types/dashboard';
import { delay } from '../utils/delay';

const dashboardMock: DashboardData = {
  stats: {
    users: 12450,
    revenue: 428900,
    activity: 392,
  },
  metrics: [
    { key: 'orders', metric: 'Orders Processed', today: 182, week: 1128, month: 4920 },
    { key: 'refunds', metric: 'Refund Requests', today: 8, week: 49, month: 197 },
    { key: 'tickets', metric: 'Support Tickets', today: 36, week: 214, month: 870 },
    { key: 'new-signups', metric: 'New Signups', today: 124, week: 788, month: 3210 },
    { key: 'campaigns', metric: 'Campaign Clicks', today: 652, week: 4280, month: 17590 },
  ],
  recentActivities: [
    {
      id: 'activity-1',
      message: 'Created quarterly analytics report',
      actor: 'Dana Smith',
      timestamp: '10 minutes ago',
    },
    {
      id: 'activity-2',
      message: 'Invited 3 new managers',
      actor: 'Liam Carter',
      timestamp: '22 minutes ago',
    },
    {
      id: 'activity-3',
      message: 'Updated billing thresholds',
      actor: 'Ava Johnson',
      timestamp: '1 hour ago',
    },
    {
      id: 'activity-4',
      message: 'Suspended suspicious user account',
      actor: 'Noah Patel',
      timestamp: '2 hours ago',
    },
  ],
  revenueTrend: [
    { period: 'Sep', revenue: 54000, target: 50000 },
    { period: 'Oct', revenue: 62000, target: 55000 },
    { period: 'Nov', revenue: 68000, target: 62000 },
    { period: 'Dec', revenue: 72000, target: 66000 },
    { period: 'Jan', revenue: 76000, target: 70000 },
    { period: 'Feb', revenue: 80800, target: 75000 },
  ],
  trafficTrend: [
    { day: 'Mon', visits: 9300, signups: 220 },
    { day: 'Tue', visits: 10400, signups: 260 },
    { day: 'Wed', visits: 9800, signups: 240 },
    { day: 'Thu', visits: 11700, signups: 312 },
    { day: 'Fri', visits: 12100, signups: 344 },
    { day: 'Sat', visits: 8700, signups: 201 },
    { day: 'Sun', visits: 7900, signups: 180 },
  ],
  conversionByChannel: [
    { channel: 'Organic', value: 38 },
    { channel: 'Paid Search', value: 26 },
    { channel: 'Direct', value: 21 },
    { channel: 'Referral', value: 15 },
  ],
};

export const dashboardService = {
  async fetchDashboardData(): Promise<DashboardData> {
    await delay(700);
    return dashboardMock;
  },
};
