import {
    Button,
    Form,
    Select,
    message,
} from "antd";
import { Option } from "antd/lib/mentions";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticate } from "../../../utils/LocalStorage";

import { httpGetOneUser, httpUpdateOneUser } from "../../../api_slice/api_user";

const UserEdit = () => {
    const user = isAuthenticate();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();

    const onFinish = async (data: any) => {
        const dataUpdate = { ...data };
        console.log('dataUpdate', dataUpdate)
        try {
            await httpUpdateOneUser(user?.token, id, dataUpdate).then(() => {
                message.success("cập nhật thành công", 4);
                navigate("/admin/user");
            });
        } catch (error: any) {
            message.error(`${error.response.data.message}`, 4);
        }
    };

    useEffect(() => {
        const getListUser = async () => {
            const res = await httpGetOneUser(user?.token, id);
            form.setFieldsValue({
                role: res?.role,
                status: res?.status,
            });
        };
        getListUser();
    }, []);

    return (
        <>
            <div className=" px-6 py-6 ml-[30px]  ">
                <div className="w-[1000px] m-auto">
                    <Form
                        name="basic"
                        initialValues={{ status: true, role: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                        form={form}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 8 }}
                    >
                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Không để trống trạng thái !",
                                },
                            ]}
                        >
                            <Select>
                                <Option value={0}>Chưa kích hoạt</Option>
                                <Option value={1}>Đã kích hoạt</Option>
                                <Option value={2}>Đã khóa</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Phân Quyền"
                            hasFeedback
                        // rules={[{ required: true, message: "Please input your username!" }]}
                        >
                            <Select>
                                <Option value={0}>User</Option>
                                <Option value={1}>Admin</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 2, span: 3 }}>
                            <Button type="primary" style={{ marginLeft: '15px' }} htmlType="submit">
                                Cập nhật tài khoản
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default UserEdit;
