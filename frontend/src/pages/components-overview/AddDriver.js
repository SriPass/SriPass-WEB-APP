
import React from 'react';
import MainCard from 'components/MainCard';
import { message, Button, Form, Input, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const AddDriver = () => {
  const key = 'updatable';
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const addResponse = await fetch('http://localhost:8070/api/driver/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!addResponse.ok) {
        throw new Error('API request failed');
      }

      const data = await addResponse.json();
      console.log('New driver added:', data);

      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: `Driver ${values.driver_id} Added`, // Update success message
          duration: 2,
        });
      }, 1000);

      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });
    } catch (error) {
      console.error('Error adding new driver:', error);

      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'error',
          content: 'Error', // Update error message
          duration: 2,
        });
      }, 1000);

      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });
    }
  };

  return (
    <MainCard>
      <Form
        {...formItemLayout}
        form={form}
        name="Submit"
        onFinish={onFinish}
        validateMessages={{
          required: '${label} is required!',
        }}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="driver_id"
          label="Driver ID"
          rules={[
            { required: true, message: 'Driver ID is required' },
            { type: 'integer', message: 'Driver ID must be an integer' },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tel"
          label="Tel"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="assignedRoute"
          label="Assigned Route"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="assignedVehicle"
          label="Assigned Vehicle"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </MainCard>
  );
};

export default AddDriver;
