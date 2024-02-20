import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { isAuthenticate } from '../../../../utils/LocalStorage';
import { updatePass } from '../../../../api_slice/api_user';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';


const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
        .required('Vui lòng nhập mật khẩu cũ'),
    newPassword: Yup.string()
        .max(20, 'Tối đa 20 ký tự')
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
            "Mật khẩu phải chứa ít nhất 8 ký tự, một chữ hoa, một chữ thường, một số và một ký tự đặc biệt (!@#$&*)"
        )
        .required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
        .max(20, 'Tối đa 20 ký tự')
        .required('Vui lòng xác nhận mật khẩu mới'),
});

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type Props = {}

const Password_userComponent = (props: Props) => {
    const isUser = isAuthenticate();
    const [form] = Form.useForm();

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    useEffect(() => { }, []);
    const onSubmit = async (data: any) => {
        await updatePass(isUser?.token, data);
        localStorage.removeItem('user')

    };
    const onFinish = async (data: any) => {
        console.log(data);
        const dataPost = { ...data };
        try {
            await onSubmit(dataPost).then(() => {
                message.success("Cập nhật mật khẩu thành công.", 4);
            });
        } catch (error: any) {
            message.error(`${error.response.data.message}`, 4);
        }
    };
    return (
        <div className='password_page ml-3'>
            <div className="title_content">
                <b>Đổi Mật Khẩu</b>
                <p>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác !</p>
            </div>
            <div className="info_content col-md-6 col-12">
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                    style={{ maxWidth: "100%" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}

                >
                    <Form.Item
                        label="Mật khẩu hiện tại:"
                        name="currentPassword"
                        help={formik.touched.currentPassword && formik.errors.currentPassword}
                        validateStatus={
                            formik.touched.currentPassword && formik.errors.currentPassword ? "error" : ""
                        }
                        rules={[{ required: true, message: 'Bạn phải nhập mật khẩu hiện tại!' }]}
                    >
                        <Input.Password
                            name="currentPassword"
                            value={formik.values.currentPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu mới:"
                        name="newPassword"
                        help={formik.touched.newPassword && formik.errors.newPassword}
                        validateStatus={
                            formik.touched.newPassword && formik.errors.newPassword ? "error" : ""
                        }
                        rules={[{ required: true, message: 'Bạn phải nhập mật khẩu mới!' }]}
                    >
                        <Input.Password
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu mới:"
                        name="confirmPassword"
                        help={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        validateStatus={
                            formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""
                        }
                        dependencies={['newPassword']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu mới và mật khẩu xác nhận phải trùng nhau.'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                backgroundColor: "#95532d",
                                marginTop: "15px"
                            }}
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                    <NavLink to="/reset-password" style={{ marginLeft: '150px' }}>Quên mật khẩu?</NavLink>
                </Form>
            </div>

        </div >
    )
}

export default Password_userComponent