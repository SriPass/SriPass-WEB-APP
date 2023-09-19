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


const AddCustomerRate = () => {

    const [form] = Form.useForm();
    const [carrierRateIds, setCarrierRateIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/carrierrate/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setCarrierRateIds(data);
            } catch (error) {
                console.error('Error fetching carrier_rate_id data:', error);
            }
        };
        fetchData();
    }, []);

    const uniqueCarrierRateIds = Array.from(new Set(carrierRateIds.map(rate => rate.carrier_rate_id)));

    const key = 'updatable';
    const onFinish = async (values) => {

        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/customerrate/add', {
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
            console.log('New customer rate added:', data);

            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });

            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Customer Rate no ${values.customer_rate_id} Added`,
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
            console.error('Error adding new customer rate:', error);

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
                    name="customer_rate_id"
                    label="Customer Rate Id"
                    rules={[
                        { required: true, message: 'Customer Rate Id is required' },
                        { type: 'integer', message: 'Customer Rate Id must be an integer' },
                        {
                            validator: async (_, value) => {
                                const customerRateResponse = await fetch('http://15.156.146.25:8070/api/customerrate/all');
                                if (!customerRateResponse.ok) {
                                    throw new Error('API request for existing customer rates failed');
                                }
                                const existingCustomerRates = await customerRateResponse.json();
                                const existingCustomerRateIds = existingCustomerRates.map(customerRate => customerRate.customer_rate_id);

                                if (existingCustomerRateIds.includes(value)) {
                                    return Promise.reject(`Customer Rate with ID ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>


                <Form.Item
                    name="customer_rate"
                    label="Customer Rate"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="other_chargers"
                    label="Other Chargers"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="chargers_advances"
                    label="Chargers Advances"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="carrier_rate_id"
                    label="Carrier Rate ID"
                    rules={[
                        {
                            required: true,
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
                        {uniqueCarrierRateIds.map(carrierRateId => (
                            <Option key={carrierRateId} value={carrierRateId}>
                                {carrierRateId}
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
export default AddCustomerRate;