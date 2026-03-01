import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  Typography,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import type { TableColumnsType } from 'antd';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addUser, editUser, fetchUsers } from '../store/slices/userSlice';
import type { User, UserFormData, UserRole, UserStatus } from '../types/user';
import { toTitleCase } from '../utils/formatters';

const roleOptions: UserRole[] = ['admin', 'manager', 'analyst'];
const statusOptions: UserStatus[] = ['active', 'invited', 'suspended'];

const statusColors: Record<UserStatus, string> = {
  active: 'green',
  invited: 'blue',
  suspended: 'red',
};

function UsersPage() {
  const dispatch = useAppDispatch();
  const { status, users } = useAppSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm<UserFormData>();

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchTerm, selectedRole, selectedStatus, users]);

  const openCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue({
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSubmit = async (values: UserFormData) => {
    if (editingUser) {
      await dispatch(
        editUser({
          data: values,
          id: editingUser.id,
        }),
      ).unwrap();
    } else {
      await dispatch(addUser(values)).unwrap();
    }

    closeModal();
  };

  const columns: TableColumnsType<User> = [
    {
      dataIndex: 'name',
      key: 'name',
      title: 'Name',
    },
    {
      dataIndex: 'email',
      key: 'email',
      title: 'Email',
    },
    {
      dataIndex: 'role',
      key: 'role',
      render: (value: UserRole) => toTitleCase(value),
      title: 'Role',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (value: UserStatus) => (
        <Tag color={statusColors[value]}>{toTitleCase(value)}</Tag>
      ),
      title: 'Status',
    },
    {
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      title: 'Last Login',
    },
    {
      key: 'actions',
      render: (_, record) => (
        <Button aria-label={`Edit user ${record.name}`} onClick={() => openEditModal(record)}>
          Edit
        </Button>
      ),
      title: 'Actions',
    },
  ];

  return (
    <section aria-label="Users management">
      <PageHeader
        subtitle="Search, filter, and manage platform users."
        title="Users"
        extra={
          <Button icon={<PlusOutlined />} onClick={openCreateModal} type="primary">
            Add User
          </Button>
        }
      />

      <Card>
        <div className="filters-row">
          <Input.Search
            allowClear
            aria-label="Search users by name or email"
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search users..."
            value={searchTerm}
          />
          <Select<UserRole>
            allowClear
            aria-label="Filter users by role"
            onChange={(value) => setSelectedRole(value)}
            options={roleOptions.map((role) => ({
              label: toTitleCase(role),
              value: role,
            }))}
            placeholder="Filter by role"
            value={selectedRole}
          />
          <Select<UserStatus>
            allowClear
            aria-label="Filter users by status"
            onChange={(value) => setSelectedStatus(value)}
            options={statusOptions.map((statusOption) => ({
              label: toTitleCase(statusOption),
              value: statusOption,
            }))}
            placeholder="Filter by status"
            value={selectedStatus}
          />
        </div>

        <DataTable<User>
          ariaLabel="Users table"
          columns={columns}
          dataSource={filteredUsers}
          loading={status === 'loading'}
          pagination={{ pageSize: 6, showSizeChanger: false }}
          rowKey="id"
        />
      </Card>

      <Modal
        destroyOnHidden
        footer={null}
        onCancel={closeModal}
        open={isModalOpen}
        title={editingUser ? 'Edit User' : 'Add User'}
      >
        <Form<UserFormData>
          form={form}
          layout="vertical"
          onFinish={(values) => {
            void handleSubmit(values);
          }}
          preserve={false}
        >
          <Form.Item<UserFormData>
            label="Name"
            name="name"
            rules={[{ message: 'Please enter a name', required: true }]}
          >
            <Input aria-label="User name" placeholder="Enter name" />
          </Form.Item>
          <Form.Item<UserFormData>
            label="Email"
            name="email"
            rules={[
              { message: 'Please enter an email', required: true },
              { message: 'Please enter a valid email address', type: 'email' },
            ]}
          >
            <Input aria-label="User email" placeholder="Enter email address" />
          </Form.Item>
          <Form.Item<UserFormData>
            label="Role"
            name="role"
            rules={[{ message: 'Please select a role', required: true }]}
          >
            <Select
              aria-label="User role"
              options={roleOptions.map((role) => ({
                label: toTitleCase(role),
                value: role,
              }))}
              placeholder="Select role"
            />
          </Form.Item>
          <Form.Item<UserFormData>
            label="Status"
            name="status"
            rules={[{ message: 'Please select a status', required: true }]}
          >
            <Select
              aria-label="User status"
              options={statusOptions.map((statusOption) => ({
                label: toTitleCase(statusOption),
                value: statusOption,
              }))}
              placeholder="Select status"
            />
          </Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button htmlType="submit" type="primary">
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </Space>
        </Form>
      </Modal>

      <Typography.Paragraph style={{ marginTop: 12 }} type="secondary">
        Showing {filteredUsers.length} of {users.length} total users.
      </Typography.Paragraph>
    </section>
  );
}

export default UsersPage;
