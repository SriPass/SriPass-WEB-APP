import React from 'react';
import MainCard from 'components/MainCard';
import { message } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    DatePicker,
    TimePicker,
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

const configdate = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select date!',
        },
    ],
};
const configtime = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
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


const AddLoad = () => {
    const key = 'updatable';
    const [form] = Form.useForm();
    const onFinish = async (values) => {


        // Format date and time fields before sending
        values.pickup_date = values.pickup_date.format('YYYY-MM-DD');
        values.delivery_date = values.delivery_date.format('YYYY-MM-DD');
        values.time = values.time.format('HH:mm:ss');

   console.log(values)

        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/load/add', {
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
            console.log('New load added:', data);
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Load no ${values.load_no} Added`,
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
            console.error('Error adding new load:', error);
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
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
            >


                <Form.Item
                    name="load_no"
                    label="Load No"
                    rules={[
                        { required: true, message: 'Load No is required' },
                        { type: 'integer', message: 'Load No must be an integer' },
                        {
                            validator: async (_, value) => {
                                // Fetch the list of existing Load Nos
                                const LoadNoResponse = await fetch('http://15.156.146.25:8070/api/load/all');
                                if (!LoadNoResponse.ok) {
                                    throw new Error('API request for existing load no failed');
                                }
                                const existingLoadNo = await LoadNoResponse.json();
                                const existingLoadNos = existingLoadNo.map(load => load.load_no);

                                // Check if the entered load no already exists
                                if (existingLoadNos.includes(value)) {
                                    return Promise.reject(`Load No ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item name="pickup_date" label="Pickup Date" {...configdate}>
                    <DatePicker />
                </Form.Item>

                <Form.Item name="delivery_date" label="Delivery Date" {...configdate}>
                    <DatePicker />
                </Form.Item>

                <Form.Item name="time" label="Time" {...configtime}>
                    <TimePicker />
                </Form.Item>

                <Form.Item
                    name="notes"
                    label="Notes"
                    rules={[
                        {
                            required: true,
                            message: 'Please input notes',
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>

                <Form.Item
                    name="po_numbers"
                    label="Po Numbers"
                    rules={[
                        {
                            required: true,
                            message: 'Please input po numbers',
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    name="custom_broker"
                    label="Custom Broker"
                    rules={[
                        {
                            required: true,
                            message: 'Please input custom broker',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                        {
                            required: true,
                            message: 'Please select status!',
                        },
                    ]}
                >
                    <Select placeholder="select status">
                        <Option value="Pending">Pending</Option>
                        <Option value="Deliverd">Deliverd</Option>
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
export default AddLoad;