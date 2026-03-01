export interface DashboardStats {
  users: number;
  revenue: number;
  activity: number;
}

export interface DashboardMetric {
  key: string;
  metric: string;
  today: number;
  week: number;
  month: number;
}

export interface RecentActivity {
  id: string;
  message: string;
  actor: string;
  timestamp: string;
}

export interface RevenueTrendPoint {
  period: string;
  revenue: number;
  target: number;
}

export interface TrafficTrendPoint {
  day: string;
  visits: number;
  signups: number;
}

export interface ConversionChannelPoint {
  channel: string;
  value: number;
}

export interface DashboardData {
  stats: DashboardStats;
  metrics: DashboardMetric[];
  recentActivities: RecentActivity[];
  revenueTrend: RevenueTrendPoint[];
  trafficTrend: TrafficTrendPoint[];
  conversionByChannel: ConversionChannelPoint[];
}
