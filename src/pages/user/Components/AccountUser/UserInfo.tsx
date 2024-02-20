import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import {
    UserOutlined,
    FileDoneOutlined,
    BellOutlined,
} from "@ant-design/icons";
import { Avatar, Image, Layout, Menu } from 'antd';
import { isAuthenticate } from "../../../../utils/LocalStorage";
import { getProfile } from "../../../../api_slice/api_user";
import { useState } from "react";

type Prop = {

}

const UserInfo = (props: Prop) => {
    const isUser = isAuthenticate();
    const [user, setuser] = useState<any>();
    const url = useParams()
    const { Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const getProfiles = async () => {
            const res = await getProfile(isUser?.token);
            setuser(res)
        };
        getProfiles();
    }, [url]);


    return (
        <div className="container info_page">
            <Layout>
                <Sider
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className="text-center ">
                        <div className="mt-3 mb-3">
                            {" "}
                            <Avatar
                                size={{
                                    xs: 24,
                                    sm: 32,
                                    md: 40,
                                    lg: 64,
                                    xl: 80,
                                    xxl: 100,
                                }}
                                className="avatar_user"
                                src={<Image src={user?.avatar} preview={false} />}
                                icon={<UserOutlined />}
                            />
                        </div>
                        <h4 className="font-bold text-2xl  mb-5">{user?.name}</h4>
                    </div>
                    <Menu
                        className="menu"
                        theme="light"
                        mode="inline"
                    >
                        <Menu.Item key="info">
                            <Link to={"account"}>
                                <UserOutlined />
                                Tài khoản
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="order">
                            <Link to={"order"}>
                                <FileDoneOutlined />
                                Đơn hàng
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="noti">
                            <Link to={"noti"}>
                                <BellOutlined />
                                Thông báo
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <div className="col-span-4 ">
                        <Outlet></Outlet>
                    </div>
                </Layout>
            </Layout >
        </div>
    );
};

export default UserInfo;
