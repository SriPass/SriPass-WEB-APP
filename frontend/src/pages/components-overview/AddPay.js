import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { message } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select
} from 'antd';

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


const AddPay = () => {

    const [form] = Form.useForm();
    const [driverIds, setDriverIds] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/driver/all'); // Update the API endpoint to fetch driver data
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setDriverIds(data); // Change variable name
            } catch (error) {
                console.error('Error fetching driver_id data:', error); // Update error message
            }
        };
        fetchData();
    }, []);

    const uniqueDriverIds = Array.from(new Set(driverIds.map(driver => driver.driver_id))); // Update variable name


    const key = 'updatable';
    const onFinish = async (values) => {

        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/pay/add', { // Update API endpoint
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
            console.log('New payment added:', data);

            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });

            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Payment with ID ${values.pay_id} Added`, // Update success message
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
            console.error('Error adding new payment:', error);

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
                    name="pay_id" // Change to "pay_id"
                    label="Pay ID" // Change label accordingly
                    rules={[
                        { required: true, message: 'Pay ID is required' },
                        { type: 'integer', message: 'Pay ID must be an integer' },
                        {
                            validator: async (_, value) => {
                                const paymentResponse = await fetch('http://15.156.146.25:8070/api/pay/all'); // Change API URL
                                if (!paymentResponse.ok) {
                                    throw new Error('API request for existing payments failed');
                                }
                                const existingPayments = await paymentResponse.json();
                                const existingPayIds = existingPayments.map(payment => payment.pay_id); // Change field name

                                if (existingPayIds.includes(value)) {
                                    return Promise.reject(`Payment with ID ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>



                <Form.Item
                    name="pay"
                    label="Pay"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="pay_pick_up"
                    label="Pay Pick Up"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="pay_drop"
                    label="Pay Drop"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="driver_id" // Change to "driver_id"
                    label="Driver ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Driver ID is required',
                        },
                    ]}
                >
                    <Select
                        mode="single"
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{ width: '50%' }}
                    >
                        {uniqueDriverIds.map(driverId => ( // Update variable name
                            <Option key={driverId} value={driverId}>
                                {driverId}
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
export default AddPay;