// import React from 'react'
// import { Form, Input, Button, Upload } from 'antd';
// import { useUploadImagesMutation } from '../../../api_slice/api_images';
// import { UploadOutlined } from '@ant-design/icons';

// type Props = {}

// const formSchema = {
//     name: {
//         rules: [{ required: true, message: 'Please enter image name' }],
//     },
//     image: {
//         valuePropName: 'fileList',
//         getValueFromEvent: (event: any) =>
//             Array.isArray(event) ? event : event && event.fileList,
//         rules: [{ required: true, message: 'Please select an image' }],
//     },
// };

// const Test = (props: Props) => {
//     const [form] = Form.useForm();
//     const [uploadImage, { isLoading }] = useUploadImagesMutation();

//     const handleFormSubmit = (values: any) => {
//         const { name, image } = values;
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('image', image[0].originFileObj);

//         uploadImage(formData)
//             .unwrap()
//             .then((result) => {
//                 console.log('Upload success:', result);
//                 form.resetFields();
//             })
//             .catch((error) => {
//                 console.error('Upload error:', error);
//             });
//     };

//     return (
//         <Form form={form} onFinish={handleFormSubmit}>
//             <Form.Item name="name" label="Image Name" {...formSchema.name}>
//                 <Input />
//             </Form.Item>
//             <Form.Item name="image" label="Image" {...formSchema.image}>
//                 <Upload>
//                     <Button icon={<UploadOutlined />}>Select Image</Button>
//                 </Upload>
//             </Form.Item>
//             <Form.Item>
//                 <Button type="primary" htmlType="submit" loading={isLoading}>
//                     Upload
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// }

// export default Test

import React from 'react'

type Props = {}

const Test = (props: Props) => {
    return (
        <div>

        </div>
    )
}

export default Test