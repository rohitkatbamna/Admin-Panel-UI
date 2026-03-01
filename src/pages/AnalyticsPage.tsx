import { Card, Col, Empty, Row, Typography } from 'antd';
import { useEffect } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchDashboard } from '../store/slices/dashboardSlice';

const pieColors = ['#0f766e', '#0ea5e9', '#6366f1', '#f59e0b'];

function AnalyticsPage() {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchDashboard());
    }
  }, [dispatch, status]);

  return (
    <section aria-label="Analytics page">
      <PageHeader
        subtitle="Performance insights and conversion trends."
        title="Analytics"
      />
      <Row gutter={[16, 16]}>
        <Col md={16} span={24}>
          <Card title="Traffic Overview">
            {data ? (
              <div aria-label="Traffic overview chart" role="img" style={{ height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={data.trafficTrend} margin={{ left: 12, right: 12 }}>
                    <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      dataKey="visits"
                      name="Visits"
                      stroke="#0f766e"
                      strokeWidth={2}
                      type="monotone"
                    />
                    <Line
                      dataKey="signups"
                      name="Signups"
                      stroke="#6366f1"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Empty description={status === 'loading' ? 'Loading chart...' : 'No data'} />
            )}
          </Card>
        </Col>
        <Col md={8} span={24}>
          <Card title="Conversion Snapshot">
            {data ? (
              <div aria-label="Conversion breakdown chart" role="img" style={{ height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={data.conversionByChannel}
                      dataKey="value"
                      label
                      nameKey="channel"
                      outerRadius={90}
                    >
                      {data.conversionByChannel.map((entry, index) => (
                        <Cell
                          fill={pieColors[index % pieColors.length]}
                          key={`${entry.channel}-${entry.value}`}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Empty description={status === 'loading' ? 'Loading chart...' : 'No data'} />
            )}
          </Card>
        </Col>
      </Row>
      <Typography.Paragraph style={{ marginTop: 12 }} type="secondary">
        Recharts is now used for analytics visualizations with responsive containers.
      </Typography.Paragraph>
    </section>
  );
}

export default AnalyticsPage;
