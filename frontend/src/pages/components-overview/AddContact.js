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


const AddContact = () => {

    const key = 'updatable';

    //load_no
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

    //customer_id

    const [customerIds, setCustomerIds] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/customer/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setCustomerIds(data); // Change variable name
            } catch (error) {
                console.error('Error fetching customer_id data:', error); // Update error message
            }
        };
        fetchData();
    }, []);

    const uniqueCustomerIds = Array.from(new Set(customerIds.map(customer => customer.customer_id))); // Update variable name

    //shipper_id


    const [shipperIds, setShipperIds] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/shipper/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setShipperIds(data); // Change variable name
            } catch (error) {
                console.error('Error fetching shipper_id data:', error); // Update error message
            }
        };
        fetchData();
    }, []);

    const uniqueShipperIds = Array.from(new Set(shipperIds.map(shipper => shipper.shipper_id))); // Update variable name

    //consigne_id

    const [consigneeIds, setConsigneeIds] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/consigne/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setConsigneeIds(data); // Change variable name
            } catch (error) {
                console.error('Error fetching consigne_id data:', error); // Update error message
            }
        };
        fetchData();
    }, []);

    const uniqueConsigneeIds = Array.from(new Set(consigneeIds.map(consigne => consigne.consigne_id))); // Update variable name

    //carrier_id
    const [carrierIds, setCarrierIds] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/carrier/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setCarrierIds(data); // Change variable name
            } catch (error) {
                console.error('Error fetching carrier_id data:', error); // Update error message
            }
        };
        fetchData();
    }, []);

    const uniqueCarrierIds = Array.from(new Set(carrierIds.map(carrier => carrier.carrier_id))); // Update variable name

    //expense_id

    const [expensesData, setExpensesData] = useState([]); // Change variable name

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://15.156.146.25:8070/api/expenses/all'); // Update the API endpoint
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setExpensesData(data); // Change variable name
            } catch (error) {
                console.error('Error fetching expenses data:', error);
            }
        };
        fetchData();
    }, []);

    const uniqueExpensesIds = Array.from(new Set(expensesData.map(expense => expense.expenses_id))); // Update variable name




    const onFinish = async (values) => {


        try {
            const addResponse = await fetch('http://15.156.146.25:8070/api/contact/add', { // Update API endpoint
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
            console.log('New contact added:', data);

            message.open({
                key,
                type: 'loading',
                content: 'Loading...',
            });

            setTimeout(() => {
                message.open({
                    key,
                    type: 'success',
                    content: `Contact with ID ${values.contact_id} Added`, // Update success message
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
            console.error('Error adding new contact:', error);

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
                name="Submit"
                form={form}
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
                    name="contact_id" // Change to "contact_id"
                    label="Contact ID" // Change label accordingly
                    rules={[
                        { required: true, message: 'Contact ID is required' },
                        {
                            validator: async (_, value) => {
                                const contactResponse = await fetch('http://15.156.146.25:8070/api/contact/all'); // Update the API endpoint
                                if (!contactResponse.ok) {
                                    throw new Error('API request for existing contacts failed');
                                }
                                const existingContacts = await contactResponse.json();
                                const existingContactIds = existingContacts.map(contact => contact.contact_id);

                                if (existingContactIds.includes(value)) {
                                    return Promise.reject(`Contact with ID ${value} already exists`);
                                }

                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>


                <Form.Item
                    name="contact"
                    label="Contact"
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
                    name="ext"
                    label="Ext"
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
                    name="payment_terms"
                    label="Payment Terms"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="mc"
                    label="MC"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="d_o_t"
                    label="D.O.T"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="customer_id" // Change to "customer_id"
                    label="Customer ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Customer ID is required',
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
                        {uniqueCustomerIds.map(customerId => ( // Update variable name
                            <Option key={customerId} value={customerId}>
                                {customerId}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="shipper_id" // Change to "shipper_id"
                    label="Shipper ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Shipper ID is required',
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
                        {uniqueShipperIds.map(shipperId => ( // Update variable name
                            <Option key={shipperId} value={shipperId}>
                                {shipperId}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="consigne_id" // Change to "consigne_id"
                    label="Consignee ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Consignee ID is required',
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
                        {uniqueConsigneeIds.map(consigneId => ( // Update variable name
                            <Option key={consigneId} value={consigneId}>
                                {consigneId}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="carrier_id" // Change to "carrier_id"
                    label="Carrier ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Carrier ID is required',
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
                        {uniqueCarrierIds.map(carrierId => ( // Update variable name
                            <Option key={carrierId} value={carrierId}>
                                {carrierId}
                            </Option>
                        ))}
                    </Select>
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

                <Form.Item
                    name="expenses_id" // Change to "expenses_id"
                    label="Expenses ID" // Change label accordingly
                    rules={[
                        {
                            required: true,
                            message: 'Expenses ID is required',
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
                        {uniqueExpensesIds.map(expensesId => ( // Update variable name
                            <Option key={expensesId} value={expensesId}>
                                {expensesId}
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
export default AddContact;