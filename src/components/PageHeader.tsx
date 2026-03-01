import { Space, Typography } from 'antd';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
}

function PageHeader({ title, subtitle, extra }: PageHeaderProps) {
  return (
    <header
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 24,
      }}
    >
      <Space direction="vertical" size={2}>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
        {subtitle ? (
          <Typography.Text type="secondary">{subtitle}</Typography.Text>
        ) : null}
      </Space>
      {extra}
    </header>
  );
}

export default PageHeader;
