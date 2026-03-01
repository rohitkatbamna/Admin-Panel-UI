import { DollarOutlined, TeamOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, List, Row, Typography } from 'antd';
import { useEffect } from 'react';
import type { TableColumnsType } from 'antd';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchDashboard } from '../store/slices/dashboardSlice';
import type { DashboardMetric } from '../types/dashboard';
import { formatCurrency } from '../utils/formatters';

const metricColumns: TableColumnsType<DashboardMetric> = [
  {
    dataIndex: 'metric',
    key: 'metric',
    title: 'Metric',
  },
  {
    dataIndex: 'today',
    key: 'today',
    title: 'Today',
  },
  {
    dataIndex: 'week',
    key: 'week',
    title: 'This Week',
  },
  {
    dataIndex: 'month',
    key: 'month',
    title: 'This Month',
  },
];

function DashboardPage() {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchDashboard());
    }
  }, [dispatch, status]);

  return (
    <section aria-label="Dashboard overview">
      <PageHeader
        subtitle="Key metrics and operational updates at a glance."
        title="Dashboard"
      />

      <Row gutter={[16, 16]}>
        <Col lg={8} md={12} span={24}>
          <StatCard
            loading={status === 'loading'}
            prefix={<TeamOutlined />}
            title="Total Users"
            value={data?.stats.users ?? 0}
          />
        </Col>
        <Col lg={8} md={12} span={24}>
          <StatCard
            loading={status === 'loading'}
            prefix={<DollarOutlined />}
            title="Revenue"
            value={data?.stats.revenue ?? 0}
          />
        </Col>
        <Col lg={8} md={12} span={24}>
          <StatCard
            loading={status === 'loading'}
            prefix={<ThunderboltOutlined />}
            title="Daily Activity"
            value={data?.stats.activity ?? 0}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xl={15} span={24}>
          <Card title="Operational Metrics">
            <DataTable<DashboardMetric>
              ariaLabel="Operational metrics table"
              columns={metricColumns}
              dataSource={data?.metrics ?? []}
              loading={status === 'loading'}
              pagination={{ pageSize: 5 }}
              rowKey="key"
            />
          </Card>
        </Col>
        <Col xl={9} span={24}>
          <Card title="Revenue Trend">
            <div
              aria-label="Revenue trend chart"
              role="img"
              style={{ height: 280, width: '100%' }}
            >
              <ResponsiveContainer>
                <AreaChart
                  data={data?.revenueTrend ?? []}
                  margin={{ left: 12, right: 12 }}
                >
                  <defs>
                    <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0f766e" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    dataKey="revenue"
                    fill="url(#revenueFill)"
                    name="Revenue"
                    stroke="#0f766e"
                    type="monotone"
                  />
                  <Area
                    dataKey="target"
                    fillOpacity={0}
                    name="Target"
                    stroke="#6366f1"
                    type="monotone"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="Recent Activity">
        <List
          dataSource={data?.recentActivities ?? []}
          loading={status === 'loading'}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                description={
                  <Typography.Text type="secondary">
                    {item.actor} | {item.timestamp}
                  </Typography.Text>
                }
                title={item.message}
              />
            </List.Item>
          )}
        />
      </Card>

      <Typography.Paragraph style={{ marginTop: 12 }} type="secondary">
        Current revenue: {formatCurrency(data?.stats.revenue ?? 0)}
      </Typography.Paragraph>
    </section>
  );
}

export default DashboardPage;
