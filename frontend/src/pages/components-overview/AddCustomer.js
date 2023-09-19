import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import MainCard from 'components/MainCard';
import { message } from 'antd';


const { Option } = Select;

const AddCustomer = () => {
  const [loadNos, setLoadNos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/load/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLoadNos(data);
      } catch (error) {
        console.error('Error fetching load_no data:', error);
      }
    };
    fetchData();
  }, []);

  const uniqueLoadNos = Array.from(new Set(loadNos.map(load => load.load_no)));

  const key = 'updatable';

  const onFinish = async (values) => {
    try {
      // Fetch the list of existing customer IDs
      const customerResponse = await fetch('http://15.156.146.25:8070/api/customer/all');
      if (!customerResponse.ok) {
        throw new Error('API request for existing customers failed');
      }
      const existingCustomers = await customerResponse.json();
      const existingCustomerIds = existingCustomers.map(customer => customer.customer_id);

      // Check if the entered customer_id already exists
      if (existingCustomerIds.includes(values.customer_id)) {
        console.error(`Customer with ID ${values.customer_id} already exists`);
        message.open({
          top: 100,
          type: 'error',
          content: `Customer with ID ${values.customer_id} already exists`,
          duration: 5,
        });
        message.config({
          top: 100,      // Adjust the top position as needed
          duration: 2,
          maxCount: 3,
          rtl: true,
          prefixCls: 'my-message',
        });
        return; // Stop further processing
      }

      // Continue with your existing API call and success handling logic
      const addResponse = await fetch('http://15.156.146.25:8070/api/customer/add', {
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
      console.log('New customer added:', data);

      // Display success message
      message.open({
        key,
        type: 'loading',
        content: 'Loading',
      });
      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: `${values.name} added successfully`,
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
      console.error('Error adding new customer:', error);
      message.open({
        top: 100,
        type: 'error',
        content: `${values.name} added unsuccessfully`,
        duration: 5,
      });
      message.config({
        top: 100,      // Adjust the top position as needed
        duration: 2,
        maxCount: 3,
        rtl: true,
        prefixCls: 'my-message',
      });
    }
  };


  return (
    <MainCard>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="add-customer-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={{
          required: '${label} is required!',
          types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
          },
          number: {
            range: '${label} must be between ${min} and ${max}',
          },
        }}
      >
        {/* Form fields */}
        <Form.Item name="name" label="Customer Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="customer_id"
          label="Customer Id"
          rules={[
            { required: true, message: 'Customer Id is required' },
            { type: 'integer', message: 'Customer Id must be an integer' },
            {
              validator: async (_, value) => {
                // Fetch the list of existing customer IDs
                const customerResponse = await fetch('http://15.156.146.25:8070/api/customer/all');
                if (!customerResponse.ok) {
                  throw new Error('API request for existing customers failed');
                }
                const existingCustomers = await customerResponse.json();
                const existingCustomerIds = existingCustomers.map(customer => customer.customer_id);

                // Check if the entered customer_id already exists
                if (existingCustomerIds.includes(value)) {
                  return Promise.reject(`Customer with ID ${value} already exists`);
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="billing_address" label="Billing Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="state_province" label="State Province" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="postal_zip" label="Postal Zip" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        {/* Load No selection */}
        <Form.Item name="load_no" label="Load No" rules={[{ required: true }]}>
          <Select
            mode="single"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              String(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: '50%' }}
          >
            {uniqueLoadNos.map(loadNo => (
              <Option key={loadNo} value={loadNo}>
                {loadNo}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Submit button */}
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </MainCard>
  );
};

export default AddCustomer;

