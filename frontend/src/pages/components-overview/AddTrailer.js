import React from 'react';
import MainCard from 'components/MainCard';
import { message } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
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


const AddTrailer = () => {

    const key = 'updatable';
    const onFinish = async (values) => {
       
        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/trailer/add', { // Update the API endpoint
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
            console.log('New trailer added:', data);
    
            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });
    
            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Trailer No ${values.trailer_no} Added`,
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
            console.error('Error adding new trailer:', error);
    
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
                    name="trailer_no"
                    label="Trailer No"
                    rules={[
                        { required: true, message: 'Trailer No is required' },
                        {
                            validator: async (_, value) => {
                                const trailerResponse = await fetch('http://15.156.146.25:8070/api/trailer/all'); // Update the API endpoint
                                if (!trailerResponse.ok) {
                                    throw new Error('API request for existing trailers failed');
                                }
                                const existingTrailers = await trailerResponse.json();
                                const existingTrailerNos = existingTrailers.map(trailer => trailer.trailer_no);

                                if (existingTrailerNos.includes(value)) {
                                    return Promise.reject(`Trailer with No ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>




                <Form.Item
                    name="van_reefer"
                    label="Van Reefer"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="assets"
                    label="Assets"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="license_plate"
                    label="License Plate"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="plate_expiry"
                    label="Plate Expiry"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="annual_safety_expiry"
                    label="Annual Safety Expiry"
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
export default AddTrailer;