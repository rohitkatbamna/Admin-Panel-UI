import { Card, Statistic } from 'antd';
import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: ReactNode;
  suffix?: string;
  precision?: number;
  loading?: boolean;
}

function StatCard({
  title,
  value,
  prefix,
  suffix,
  precision,
  loading = false,
}: Readonly<StatCardProps>) {
  return (
    <Card aria-label={title} variant="borderless">
      <Statistic
        loading={loading}
        precision={precision}
        prefix={prefix}
        suffix={suffix}
        title={title}
        value={value}
      />
    </Card>
  );
}

export default StatCard;
