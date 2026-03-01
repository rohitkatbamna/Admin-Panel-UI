import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Layout, Space, Typography } from 'antd';
import { useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import { routeTitles } from '../utils/navigation';

const { Content, Header, Sider } = Layout;

const getBreadcrumbItems = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const title = routeTitles[path];

    return {
      title: title ?? segment,
    };
  });

  return breadcrumbs.length > 0 ? breadcrumbs : [{ title: 'Dashboard' }];
};

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(location.pathname),
    [location.pathname],
  );

  return (
    <Layout className="app-layout">
      <Sider
        breakpoint="lg"
        collapsed={collapsed}
        collapsedWidth={72}
        onBreakpoint={(broken) => setCollapsed(broken)}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        trigger={null}
      >
        <div
          style={{
            display: 'grid',
            fontSize: 16,
            fontWeight: 700,
            height: 64,
            letterSpacing: 0.2,
            placeItems: 'center',
          }}
        >
          {collapsed ? 'AP' : 'Admin Panel'}
        </div>
        <SidebarMenu
          collapsed={collapsed}
          onNavigate={navigate}
          selectedPath={location.pathname}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: 20,
          }}
        >
          <Space align="center" size={12}>
            <Button
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed((prev) => !prev)}
              type="text"
            />
            <Breadcrumb items={breadcrumbItems} />
          </Space>

          <Space align="center" size={16}>
            <Button aria-label="Notifications" icon={<BellOutlined />} type="text" />
            <Avatar icon={<UserOutlined />} />
            <Typography.Text strong>Admin</Typography.Text>
          </Space>
        </Header>
        <Content className="app-main" role="main">
          <div className="app-content-shell">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
