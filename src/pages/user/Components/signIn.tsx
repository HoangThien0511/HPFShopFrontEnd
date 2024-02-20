import React, { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, message } from 'antd';
import { useNavigate, NavLink, Route, Navigate } from 'react-router-dom';
import { login } from '../../../api_slice/api_user';
import jwtDecode from 'jwt-decode';

type Props = {
}

interface FormValues {
  phoneNumber: {
    phoneNumber: string;
  };
  password: {
    password: string;
  };
}

export const setUserLoggedIn = (userInfo: any) => {
  localStorage.setItem("user", JSON.stringify(userInfo));
  localStorage.setItem("userHeader", JSON.stringify({
    name: userInfo.name,
    avatar: userInfo.avatar
  }));
};

const SignIn_component = (props: Props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onFinish = async (values: FormValues) => {
    const userValues = {
      phoneNumber: values.phoneNumber.phoneNumber,
      password: values.password.password,
    };
    try {
      const data: any = await login(userValues);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userHeader", JSON.stringify({
        name: data,
        avatar: data,
      }));

      message.success("Đăng nhập thành công");
      setIsLoggedIn(true);
    } catch (error: any) {
      message.error(`${error.response.data.message}`, 2);
    }
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const checkLoggedIn = useCallback(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, [checkLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/';
      // navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) {
    // nếu đã đăng nhập thì ẩn trang đăng nhập
    return null;
  }

  return (
    <div className="signin_page col-md-3 col-12">
      <Form
        name="basic"
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h3 style={{ textAlign: 'center', marginBottom: "20px" }}>Đăng nhập: </h3>

        <Form.Item
          name={["phoneNumber", "phoneNumber"]}
          rules={[{ required: true, message: "Không được bỏ trống", type: "string" }]}
        >
          <Input placeholder="Email/Số điện thoại" />
        </Form.Item>

        <Form.Item name={["password", "password"]} rules={[{ required: true, message: "Không được bỏ trống" }]}>
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <div className='save-info'>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <Form.Item >
            <NavLink to="/reset-password" className="flex justify-end mr-[50px] ">
              Quên mật khẩu ?
            </NavLink>
          </Form.Item>
        </div>

        <Form.Item style={{ textAlign: 'center' }}>
          <Button style={{ backgroundColor: "#95532d" }} type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div >
  )
}

export default SignIn_component