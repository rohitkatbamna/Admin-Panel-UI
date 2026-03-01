import { Button, Card, Form, Input, Switch, Typography } from 'antd';
import PageHeader from '../components/PageHeader';

interface SettingsFormValues {
  companyName: string;
  supportEmail: string;
  twoFactorRequired: boolean;
}

function SettingsPage() {
  const [form] = Form.useForm<SettingsFormValues>();

  return (
    <section aria-label="Settings page">
      <PageHeader
        subtitle="Manage organization and security preferences."
        title="Settings"
      />
      <Card>
        <Form<SettingsFormValues>
          form={form}
          initialValues={{
            companyName: 'Acme Corporation',
            supportEmail: 'support@acme.com',
            twoFactorRequired: true,
          }}
          layout="vertical"
        >
          <Form.Item<SettingsFormValues>
            label="Company Name"
            name="companyName"
            rules={[{ message: 'Please provide a company name', required: true }]}
          >
            <Input aria-label="Company name" />
          </Form.Item>
          <Form.Item<SettingsFormValues>
            label="Support Email"
            name="supportEmail"
            rules={[
              { message: 'Please provide a support email', required: true },
              { message: 'Email is not valid', type: 'email' },
            ]}
          >
            <Input aria-label="Support email" />
          </Form.Item>
          <Form.Item<SettingsFormValues>
            label="Require two-factor authentication"
            name="twoFactorRequired"
            valuePropName="checked"
          >
            <Switch aria-label="Require two-factor authentication" />
          </Form.Item>
          <Button type="primary">Save Settings</Button>
        </Form>
      </Card>
      <Typography.Paragraph style={{ marginTop: 12 }} type="secondary">
        This section is intentionally lightweight and can be extended by settings
        modules as needed.
      </Typography.Paragraph>
    </section>
  );
}

export default SettingsPage;
