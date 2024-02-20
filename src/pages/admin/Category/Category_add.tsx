import React from 'react'
import { useNavigate } from 'react-router-dom';
// Form
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';

// Noti
import { notification, Space, message } from 'antd';
import { useCreateCategoryMutation, useGetCategoriesQuery } from '../../../api_slice/api_categories';
type NotificationType = 'success';


// Form End

type Props = {}

const Category_add = (props: Props) => {
  const navigate = useNavigate()
  // Noti

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };


  // Noti End

  const [create_data, { isLoading }] = useCreateCategoryMutation()

  const { data } = useGetCategoriesQuery()

  const onFinish = async (values: any) => {
    create_data(values)
    message.success("Thêm thành công!");
    navigate("/admin/categories")


  };

  const onFinishFailed = (errorInfo: any) => {
  };


  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên danh mục"
          name="name_category"
          rules={[{ required: true, message: 'Tên danh mục là bắt buộc!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Category_add 
