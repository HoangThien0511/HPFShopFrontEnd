import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../../../api_slice/api_user';

type Props = {}

interface FormValues {
  name: {
    name: string;
  };
  phoneNumber: {
    phoneNumber: string;
  };
  password: {
    password: string;
  };
}

const Signup_component = (props: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);


  const onFinish = async (values: FormValues) => {
    const userValues = {
      name: values.name.name,
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password.password,
    };
    try {
      await register(userValues);
      message.success("Đăng ký thành công");
      await navigate(`/verify?phone=${values.phoneNumber.phoneNumber}`);
      localStorage.setItem("signup", "true");
      setIsLoggedOut(true);
    } catch (error: any) {
      message.error(`${error.response.data.message}`, 2);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: " Không được bỏ trống!",
    types: {
      email: " Không đúng định dạng!",
    },
  };

  useEffect(() => {
    if (isLoggedOut) {
      window.location.href = '/';
      // navigate("/");
    }
  }, [isLoggedOut, navigate]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedOut(true);
    }
  }, []);

  if (isLoggedOut) {
    return null; // nếu đã đăng nhập thành công thì không cần hiển thị trang đăng nhập
  }
  return (
    <div className="signin_page col-md-3 col-12">
      <h3 style={{ textAlign: 'center', marginBottom: "20px" }}>Đăng kí tài khoản: </h3>
      <Form
        name="nest-messages"
        validateMessages={validateMessages}
        initialValues={{ prefix: "+84" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name={["name", "name"]}
          rules={[{ required: true }]}
        // rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]}
        >
          <Input className='input' placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          name={["phoneNumber", "phoneNumber"]}
          rules={[
            {
              required: true,
              pattern: new RegExp(/((9|3|7|8|5)+([0-9]{8})\b)/g),
              message: "Số điện thoại không đúng định dạng!",
            },
          ]}
        >
          <Input className='input' placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          name={["password", "password"]}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name={["confirmPassword", "confirmPassword"]}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập lại mật khẩu!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(['password', 'password']) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" >
          <Checkbox style={{ padding: "8px 5px" }}>Nhớ tài khoản</Checkbox>
        </Form.Item>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button style={{ backgroundColor: "#95532d" }} type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signup_component