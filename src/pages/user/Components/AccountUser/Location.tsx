import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { EditOutlined, PhoneOutlined, PlusOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { getProfile, updateProfile } from '../../../../api_slice/api_user';
import { isAuthenticate } from '../../../../utils/LocalStorage';
import { ModalProps } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .max(20, 'Tên không được quá 20 ký tự')
        .required('Vui lòng nhập tên'),
    address: Yup.string()
        .min(10, 'Địa chỉ tối thiểu 10 ký tự')
        .max(100, 'Địa chỉ tối đa 100 ký tự')
        .required('Vui lòng nhập địa chỉ'),
});

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type Props = {}

const Location_component = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = isAuthenticate();
    const [data, setData] = useState<any>();
    const [form] = Form.useForm<any>();
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        try {
            Modal.confirm({
                title: 'Bạn có chắc chắn muốn cập nhật thông tin tài khoản không ?',
                onOk: async () => {
                    const updatedValues = await form.validateFields();
                    const updatedData = {
                        ...data,
                        name: updatedValues.name,
                        address: updatedValues.address,
                    };
                    updateProfile(user?.token, updatedData)
                        .then((data) => {
                            message.success('Cập nhật địa chỉ giao hàng thành công.', 4);
                            getProfiles();
                        })
                        .catch((error) => {
                            message.error('Không thể cập nhật thông tin giao hàng', 4);
                        });
                },
            });
        } catch (error: any) {
            message.error(`${error.response.data.message}`, 4);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const getProfiles = async () => {
        const dataUser: any = await getProfile(user?.token);
        form.setFieldsValue({
            name: dataUser?.name,
            address: dataUser?.address,
            age: dataUser?.age,
            phoneNumber: dataUser?.phoneNumber,
        });
        setData(dataUser);
    };

    useEffect(() => {
        getProfiles();
    }, []);

    return (
        <div className='location_page ml-3 mr-3'>
            <div className="content">
                <div className="item_content">
                    <div className="desc">
                        <b>{data?.name}</b>
                        <br />
                        <i>{data?.phoneNumber}</i>
                        <p>{data?.address}</p>
                    </div>
                    <div className="action">
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={showModal}
                            style={{
                                fontSize: "13px",
                                padding: "2px 10px",
                                height: "auto",
                                backgroundColor: "#95532d",
                                display: 'flex',
                                alignItems: "center",
                                borderRadius: "3px"
                            }}
                        >
                            <EditOutlined />
                            Cập nhật địa chỉ
                        </Button>

                        <Modal title="Địa chỉ mới" open={isModalOpen}
                            footer={[
                                <Button key="cancel" onClick={handleCancel}>
                                    Cancel
                                </Button>,
                                <Button key="ok" type="primary" htmlType="submit" onClick={handleOk}>
                                    OK
                                </Button>,
                            ]}
                        >
                            <Form
                                name="basic"
                                style={{ maxWidth: 600 }}
                                initialValues={{ remember: true }}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                form={form}
                            >
                                <Form.Item
                                    name="name"
                                    help={formik.touched.name && formik.errors.name}
                                    validateStatus={
                                        formik.touched.name && formik.errors.name ? "error" : ""
                                    }
                                >
                                    <Input
                                        placeholder='Họ và tên'
                                        name="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phoneNumber"

                                >
                                    <Input
                                        placeholder='Số điện thoại'
                                        disabled={true}
                                    />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{ offset: 0, span: 24 }}
                                    name="address"
                                    help={formik.touched.address && formik.errors.address}
                                    validateStatus={
                                        formik.touched.address && formik.errors.address ? "error" : ""
                                    }
                                >
                                    <TextArea
                                        cols={5}
                                        rows={5}
                                        placeholder='Địa chỉ giao hàng'
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Location_component