import {
  AreaChartOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { navigationItems } from '../utils/navigation';

interface SidebarMenuProps {
  collapsed: boolean;
  selectedPath: string;
  onNavigate: (path: string) => void;
}

const iconMap: Record<string, ReactNode> = {
  analytics: <AreaChartOutlined />,
  dashboard: <DashboardOutlined />,
  settings: <SettingOutlined />,
  users: <TeamOutlined />,
};

function SidebarMenu({
  collapsed,
  selectedPath,
  onNavigate,
}: Readonly<SidebarMenuProps>) {
  const selectedKey =
    navigationItems.find((item) => selectedPath.startsWith(item.path))?.key ??
    'dashboard';

  const items: MenuProps['items'] = navigationItems.map((item) => ({
    icon: iconMap[item.key],
    key: item.key,
    label: item.label,
    onClick: () => onNavigate(item.path),
  }));

  return (
    <nav aria-label="Main sidebar navigation">
      <Menu
        inlineCollapsed={collapsed}
        items={items}
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{ borderInlineEnd: 0 }}
      />
    </nav>
  );
}

export default SidebarMenu;
