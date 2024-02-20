import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { checkValidPhoneNumber, resetPassword } from '../../../api_slice/api_user';
import { signInWithPhoneNumber } from '@firebase/auth';
import { generateCaptcha } from '../../../utils/GenerateCaptcha';
import { auth } from '../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

type Props = {

}

const FormForgotPassword = (props: Props) => {
    const navigate = useNavigate()
    const [isValid, setisValid] = useState(false)
    const [token, setToken] = useState(null)
    const [formReset, setFormReset] = useState(false)


    const onFinish = async (values) => {
        try {
            const response = await checkValidPhoneNumber(values)
            message.info(`${response.message}`, 2);
            setisValid(true)
            setToken(null)
            const phoneNumber = values.phoneNumber.replace("0", "+84");
            generateCaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    message.success("Gửi OTP thành công");
                })
                .catch((error) => {
                    message.error(`${error.message}`, 2);
                });
        } catch (error) {
            message.error(`${error}`, 2)
        }
    };
    const onConfirm = (values) => {
        const otp = values.otp;
        const confirmationResult = window.confirmationResult;
        confirmationResult
            .confirm(otp)
            .then(async (result) => {
                console.log(result._tokenResponse.idToken);
                const token = result._tokenResponse.idToken;
                message.success("Xác thực OTP thành công.", 2);
                setToken(token)
                setFormReset(true)
            })
            .catch((error) => {
                message.error(`${error.message}`, 2);
            });
    }
    const onResetPassword = async (values) => {
        try {
            const response = await resetPassword(values, token)
            message.success(`${response.message}`, 2)
        } catch (error) {
            message.error(`${error}`, 2)
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const navigateSignin = async (values: any) => {
        try {
            message.info(`Chuyển về đăng nhập sau 3s`, 2);
            setTimeout(() => {
                navigate('/signin');
            }, 5000);
        } catch (error) {
            message.error(`${error}`, 2);
        }
    };
    return (
        <>
            {
                !isValid && !formReset
                    ? <>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input placeholder="Số điện thoại" />
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button style={{ backgroundColor: "#95532d" }} type="primary" htmlType="submit">
                                    Nhận mã
                                </Button>
                            </Form.Item>
                        </Form>
                    </> : ""
            }
            {
                isValid && !formReset ? <Form
                    name="confirm"

                    onFinish={onConfirm}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số mã otp!',
                            },
                        ]}
                    >
                        <Input placeholder='Mã OTP' />
                    </Form.Item>
                    <Form.Item
                        style={{ textAlign: 'center' }}
                    >
                        <Button type="primary" style={{ backgroundColor: "#95532d" }} htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form> : ""
            }
            {
                formReset ? <Form
                    name="reset"

                    onFinish={onResetPassword}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Mật khẩu mới' />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng xác nhận mật khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Hai mật khẩu phải giống nhau !'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Xác nhận mật khẩu' />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" style={{ backgroundColor: "#95532d" }} htmlType="submit" onClick={navigateSignin}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form> : ""
            }
            <div id="recaptcha"></div>
        </>

    );
};
export default FormForgotPassword;
