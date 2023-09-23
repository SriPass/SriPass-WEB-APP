

// import React, { useState } from 'react';
// import { Button, Form, Input, InputNumber } from 'antd';
// import MainCard from 'components/MainCard';
// import { message } from 'antd';

// const key = 'updatable';

// const AddCustomer = () => {
//   const onFinish = async (values) => {
//     try {
//       // Continue with your existing API call and success handling logic
//       const addResponse = await fetch('http://15.156.146.25:8070/api/localPassengers/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (!addResponse.ok) {
//         throw new Error('API request failed');
//       }

//       const data = await addResponse.json();
//       console.log('New local passenger added:', data);

//       // Display success message
//       message.open({
//         key,
//         type: 'loading',
//         content: 'Loading',
//       });
//       setTimeout(() => {
//         message.open({
//           key,
//           type: 'success',
//           content: `${values.firstName} ${values.lastName} added successfully`,
//           duration: 2,
//         });
//       }, 1000);
//       message.config({
//         top: 100,
//         duration: 2,
//         maxCount: 4,
//         rtl: true,
//         prefixCls: 'my-message',
//       });
//     } catch (error) {
//       console.error('Error adding new local passenger:', error);
//       message.open({
//         top: 100,
//         type: 'error',
//         content: `${values.firstName} ${values.lastName} added unsuccessfully`,
//         duration: 5,
//       });
//       message.config({
//         top: 100, // Adjust the top position as needed
//         duration: 2,
//         maxCount: 3,
//         rtl: true,
//         prefixCls: 'my-message',
//       });
//     }
//   };

//   return (
//     <MainCard>
//       <Form
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         name="add-customer-form"
//         onFinish={onFinish}
//         style={{ maxWidth: 600 }}
//         validateMessages={{
//           required: '${label} is required!',
//           types: {
//             email: '${label} is not a valid email!',
//             number: '${label} is not a valid number!',
//           },
//           number: {
//             range: '${label} must be between ${min} and ${max}',
//           },
//         }}
//       >
//         {/* Form fields */}
//         <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item
//           name="contactNumber"
//           label="Contact Number"
//           rules={[
//             { required: true, message: 'Contact Number is required' },
//             {
//               pattern: /^\d{10}$/, // Assuming a 10-digit contact number
//               message: 'Contact Number must be 10 digits',
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>
//         <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>

     

//         {/* Submit button */}
//         <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
//           <Button type="primary" htmlType="submit">
//             Add
//           </Button>
//         </Form.Item>
//       </Form>
//     </MainCard>
//   );
// };

// export default AddCustomer;

// import React from 'react';
// import { Button, Form, Input } from 'antd';
// import MainCard from 'components/MainCard';
// import { message } from 'antd';

// const key = 'updatable';

// const AddCustomer = () => {
//   const onFinish = async (values) => {
//     try {
//       const addResponse = await fetch('/api/localPassengers/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (!addResponse.ok) {
//         throw new Error('API request failed');
//       }

//       const data = await addResponse.json();
//       console.log('New local passenger added:', data);

//       message.open({
//         key,
//         type: 'loading',
//         content: 'Loading',
//       });

//       setTimeout(() => {
//         message.open({
//           key,
//           type: 'success',
//           content: `${values.firstName} ${values.lastName} added successfully`,
//           duration: 2,
//         });
//       }, 1000);

//       message.config({
//         top: 100,
//         duration: 2,
//         maxCount: 4,
//         rtl: true,
//         prefixCls: 'my-message',
//       });
//     } catch (error) {
//       console.error('Error adding new local passenger:', error);

//       message.open({
//         top: 100,
//         type: 'error',
//         content: 'Failed to add a new local passenger',
//         duration: 5,
//       });

//       message.config({
//         top: 100,
//         duration: 2,
//         maxCount: 3,
//         rtl: true,
//         prefixCls: 'my-message',
//       });
//     }
//   };

//   return (
//     <MainCard>
//       <Form
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         name="add-customer-form"
//         onFinish={onFinish}
//         style={{ maxWidth: 600 }}
//         validateMessages={{
//           required: '${label} is required!',
//         }}
//       >
//         {/* Form fields */}
//         <Form.Item name="passengerId" label="Passenger ID" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="address" label="Address" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>

//         {/* Submit button */}
//         <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
//           <Button type="primary" htmlType="submit">
//             Add
//           </Button>
//         </Form.Item>
//       </Form>
//     </MainCard>
//   );
// };

// export default AddCustomer;
import React from 'react';
import { Button, Form, Input, message } from 'antd';
import MainCard from 'components/MainCard';

const key = 'updatable';

const AddCustomer = () => {
  const onFinish = async (values) => {
    try {
      const addResponse = await fetch('https://sripass.onrender.com/api/localPassengers/', {
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
      console.log('New local passenger added:', data);

      message.open({
        key,
        type: 'loading',
        content: 'Loading',
      });

      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: `${values.firstName} ${values.lastName} added successfully`,
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
      console.error('Error adding new local passenger:', error);

      message.open({
        top: 100,
        type: 'error',
        content: 'Failed to add a new local passenger',
        duration: 5,
      });

      message.config({
        top: 100,
        duration: 2,
        maxCount: 3,
        rtl: true,
        prefixCls: 'my-message',
      });
    }
  };

  return (
    <MainCard>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        name="add-customer-form"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        validateMessages={{
          required: '${label} is required!',
        }}
      >
        {/* Form fields */}
        <Form.Item name="passengerId" label="Passenger ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="contactNumber" label="Contact Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Submit button */}
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </MainCard>
  );
};

export default AddCustomer;
