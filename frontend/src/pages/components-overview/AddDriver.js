import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { message, Button, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

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

    const onFinish = async (values) => {


        try {
            const addResponse = await fetch('http://localhost:8070/api/driver/', { // Update API endpoint
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
                    name="driver_id" // Change to "driver_id"
                    label="Driver ID" // Change label accordingly
                    rules={[
                        { required: true, message: 'Driver ID is required' },
                        { type: 'integer', message: 'Driver ID must be an integer' },
                        {
                            validator: async (_, value) => {
                                // Fetch the list of existing driver IDs
                                const driverResponse = await fetch('http://15.156.146.25:8070/api/driver/all'); // Change API endpoint
                                if (!driverResponse.ok) {
                                    throw new Error('API request for existing drivers failed');
                                }
                                const existingDrivers = await driverResponse.json();
                                const existingDriverIds = existingDrivers.map(driver => driver.driver_id);

                                // Check if the entered driver_id already exists
                                if (existingDriverIds.includes(value)) {
                                    return Promise.reject(`Driver with ID ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
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

                <Form.Item name="country" label="Country" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name="state_province" label="State Province" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="licences"
                    label="Licences"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="load_no" label="Load No" rules={[
                    {
                        required: true,

                    },
                ]}>
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
