import React from 'react'
import { useNavigate } from 'react-router-dom';
// Form
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';

// Noti
import { notification, Space, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useEditCategoryMutation, useGetCategoryQuery } from '../../../api_slice/api_categories';
type NotificationType = 'success';


// Form End

type Props = {}

const Category_edit = (props: Props) => {
    const { id } = useParams()
    const [form] = Form.useForm();

    const navigate = useNavigate()

    const [editCategory, result] = useEditCategoryMutation()
    const { data, isLoading, error } = useGetCategoryQuery(id)

    const onFinish = (values: any) => {
        const category = { ...values, _id: id }
        editCategory(category)
        message.success("Sửa danh mục thành công!");
        navigate("/admin/categories")
    };


    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <Form

                form={form}
                // {...layout}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}

                initialValues={{
                    ['name_category']: data?.name_category,

                }}
            >
                <Form.Item
                   label="Tên danh mục"
                   name="name_category"
                   rules={[{ required: true, message: 'Tên danh mục là bắt buộc!' }]}
                >
                    <Input type='text' />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form.Item>
            </Form>
        </ >
    )
}

export default Category_edit 