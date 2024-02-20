import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { checkValidPhoneNumber, resetPassword } from '../../../../api_slice/api_user';
import { signInWithPhoneNumber } from '@firebase/auth';
import { generateCaptcha } from '../../../../utils/GenerateCaptcha';
import { auth } from '../../../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

type Props = {

}

const FormForgotPassword = (props: Props) => {
    const navigate = useNavigate()
    const [isValid, setisValid] = useState(false)
    const [token, setToken] = useState(null)
    const [formReset, setFormReset] = useState(false)


    const onFinish = async (values: any) => {
        try {
            const response: any = await checkValidPhoneNumber(values)
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
    const onConfirm = (values: any) => {
        const otp = values.otp;
        const confirmationResult = window.confirmationResult;
        confirmationResult
            .confirm(otp)
            .then(async (result: any) => {
                console.log(result._tokenResponse.idToken);
                const token = result._tokenResponse.idToken;
                message.success("Xác thực OTP thành công.", 2);
                setToken(token)
                setFormReset(true)
            })
            .catch((error: any) => {
                message.error(`${error.message}`, 2);
            });
    }
    const onResetPassword = async (values: any) => {
        try {
            const response: any = await resetPassword(values, token)
            message.success(`${response.message}`, 2)
        } catch (error) {
            message.error(`${error}`, 2)
        }
    }
    const onFinishFailed = (errorInfo: any) => {
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
                                label="Số điện thoại"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Nhận mã
                                </Button>
                            </Form.Item>
                        </Form>
                    </> : ""
            }
            {
                isValid && !formReset ? <Form
                    name="confirm"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onConfirm}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Mã OTP"
                        name="otp"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số mã otp!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form> : ""
            }
            {
                formReset ? <Form
                    name="reset"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onResetPassword}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Xác nhận mật khẩu"
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
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={navigateSignin}>
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
