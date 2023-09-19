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


const AddCarrier = () => {

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
    const key = 'updatable';
    const onFinish = async (values) => {



        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/carrier/add', {
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
            console.log('New carrier added:', data);
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Carrier no ${values.carrier_id} Added`,
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
            console.error('Error adding new carrier:', error);
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
                    name="carrier_id"
                    label="Carrier Id"
                    rules={[
                        { required: true, message: 'Carrier Id is required' },
                        { type: 'integer', message: 'Carrier Id must be an integer' },
                        {
                            validator: async (_, value) => {
                                const carrierResponse = await fetch('http://15.156.146.25:8070/api/carrier/all');
                                if (!carrierResponse.ok) {
                                    throw new Error('API request for existing carriers failed');
                                }
                                const existingCarriers = await carrierResponse.json();
                                const existingCarrierIds = existingCarriers.map(carrier => carrier.carrier_id);

                                if (existingCarrierIds.includes(value)) {
                                    return Promise.reject(`Carrier with ID ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>


                <Form.Item
                    name="company_name"
                    label="Company Name"
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
export default AddCarrier;