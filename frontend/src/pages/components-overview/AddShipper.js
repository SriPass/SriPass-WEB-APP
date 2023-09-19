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

const AddShipper = () => {
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
        console.log(values);

        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/shipper/add', { // Assuming '/api/shipper/add' is the correct endpoint
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
            console.log('New shipper added:', data);
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Shipper ${values.shipper_id} Added`,
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
            console.error('Error adding new shipper:', error);
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            setTimeout(() => {
                message.open({
                    key,
                    type: 'error',
                    content: `Error`,
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
                    name="shipper_id"
                    label="Shipper Id"
                    rules={[
                        { required: true, message: 'Shipper Id is required' },
                        { type: 'integer', message: 'Shipper Id must be an integer' },
                        {
                            validator: async (_, value) => {
                                // Fetch the list of existing shipper IDs
                                const shipperResponse = await fetch('http://15.156.146.25:8070/api/shipper/all');
                                if (!shipperResponse.ok) {
                                    throw new Error('API request for existing shippers failed');
                                }
                                const existingShippers = await shipperResponse.json();
                                const existingShipperIds = existingShippers.map(shipper => shipper.shipper_id);

                                // Check if the entered shipper_id already exists
                                if (existingShipperIds.includes(value)) {
                                    return Promise.reject(`Shipper with ID ${value} already exists`);
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

                <Form.Item name="postal_zip" label="Postal Zip" rules={[
                    {
                        required: true,
                        
                    },
                ]}>
                    <InputNumber min={0} />
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

export default AddShipper;
