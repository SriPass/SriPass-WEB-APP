import React, { useEffect, useState } from 'react';
import MainCard from 'components/MainCard';
import { message, Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';

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


const AddExpenses = () => {
    const key = 'updatable';
    const [form] = Form.useForm();

    //supplier_id
    const [supplierData, setSupplierData] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/supplier/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setSupplierData(data); // Change variable name
            } catch (error) {
                console.error('Error fetching supplier data:', error);
            }
        };
        fetchData();
    }, []);

    const uniqueSupplierIds = Array.from(new Set(supplierData.map(supplier => supplier.supplier_id))); // Update variable name

    // truck_no
    const [truckData, setTruckData] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/truck/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setTruckData(data); // Change variable name
            } catch (error) {
                console.error('Error fetching truck data:', error);
            }
        };
        fetchData();
    }, []);

    const uniqueTruckNos = Array.from(new Set(truckData.map(truck => truck.truck_no))); // Update variable name

    // trailer_no
    const [trailerData, setTrailerData] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/trailer/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setTrailerData(data); // Change variable name
            } catch (error) {
                console.error('Error fetching trailer data:', error);
            }
        };
        fetchData();
    }, []);

    const uniqueTrailerNos = Array.from(new Set(trailerData.map(trailer => trailer.trailer_no))); // Update variable name

    const onFinish = async (values) => {
        // Format date fields before sending
        values.date = values.date.format('YYYY-MM-DD');

        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/expenses/add', { // Update the API endpoint
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
            console.log('New expenses added:', data);

            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });

            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Expenses ID ${values.expenses_id} Added`,
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
            console.error('Error adding new expenses:', error);

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
                    name="expenses_id" // Change to "expenses_id"
                    label="Expenses ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Expenses ID is required',
                        },
                        {
                            type: 'integer',
                            message: 'Expenses ID must be an integer',
                        },
                        {
                            validator: async (_, value) => {
                                try {
                                    const response = await fetch('http://15.156.146.25:8070/api/expenses/all'); // Update the API endpoint
                                    if (!response.ok) {
                                        throw new Error('API request for existing expenses IDs failed');
                                    }
                                    const existingExpenses = await response.json();
                                    const existingExpensesIds = existingExpenses.map(expense => expense.expenses_id);

                                    // Check if the entered expenses ID already exists
                                    if (existingExpensesIds.includes(value)) {
                                        return Promise.reject(`Expenses ID ${value} already exists`);
                                    }

                                    return Promise.resolve();
                                } catch (error) {
                                    console.error('Error fetching expenses data:', error);
                                    return Promise.reject('Error fetching expenses data');
                                }
                            },
                        },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    name="truck_no" // Change to "truck_no"
                    label="Truck No" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Truck No is required',
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
                        {uniqueTruckNos.map(truckNo => ( // Update variable name
                            <Option key={truckNo} value={truckNo}>
                                {truckNo}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="trailer_no" // Change to "trailer_no"
                    label="Trailer No" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Trailer No is required',
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
                        {uniqueTrailerNos.map(trailerNo => ( // Update variable name
                            <Option key={trailerNo} value={trailerNo}>
                                {trailerNo}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>



                <Form.Item
                    name="lease"
                    label="Lease"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="insurance"
                    label="Insurance"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="fuel_total"
                    label="Fuel Total"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="fuel_per_truck"
                    label="Fuel Per Truck"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item name="date" label="Date" {...configdate}>
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="currency"
                    label="Currency"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="gross"
                    label="Gross"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="net"
                    label="Net"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="tax"
                    label="Tax"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>


                <Form.Item name="state_province" label="State Province" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name="name" label="Name" rules={[
                    {
                        required: true,

                    },
                ]}>
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

                <Form.Item name="postal_zip" label="Postal Zip" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[
                    {
                        required: true,

                    },
                ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="supplier_id" // Change to "supplier_id"
                    label="Supplier ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Supplier ID is required',
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
                        {uniqueSupplierIds.map(supplierId => ( // Update variable name
                            <Option key={supplierId} value={supplierId}>
                                {supplierId}
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
export default AddExpenses;