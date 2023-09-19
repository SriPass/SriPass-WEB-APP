import React from 'react';
import MainCard from 'components/MainCard';
import { message } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    DatePicker,


} from 'antd';



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

const configdate = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select date!',
        },
    ],
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


const AddSupplier = () => {
    const key = 'updatable';
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        
    
        // Format date fields before sending
        values.date = values.date.format('YYYY-MM-DD');
    
        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/supplier/add', { // Update the API endpoint
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
            console.log('New supplier added:', data);
    
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
    
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Supplier ID ${values.supplier_id} Added`,
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
            console.error('Error adding new supplier:', error);
    
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
    
            setTimeout(() => {
                message.open({
                    key,
                    type: 'error',
                    content: 'Error',
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
                    name="supplier_id"
                    label="Supplier ID"
                    rules={[
                        { required: true, message: 'Supplier ID is required' },
                        { type: 'integer', message: 'Supplier ID must be an integer' },
                        {
                            validator: async (_, value) => {
                                // Fetch the list of existing Supplier IDs
                                const supplierResponse = await fetch('http://15.156.146.25:8070/api/supplier/all'); // Update the API endpoint
                                if (!supplierResponse.ok) {
                                    throw new Error('API request for existing supplier IDs failed');
                                }
                                const existingSuppliers = await supplierResponse.json();
                                const existingSupplierIds = existingSuppliers.map(supplier => supplier.supplier_id);

                                // Check if the entered supplier ID already exists
                                if (existingSupplierIds.includes(value)) {
                                    return Promise.reject(`Supplier ID ${value} already exists`);
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
                    <Input.TextArea showCount maxLength={100} />
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

                <Form.Item
                    name="paid_status"
                    label="Paid Status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="date" label="Date" {...configdate}>
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="contact_name"
                    label="Contact Name"
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
export default AddSupplier;