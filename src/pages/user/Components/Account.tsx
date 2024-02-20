import React, { useState } from 'react';
import {SettingOutlined, SolutionOutlined, TagOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';


type Props = {}


const Account_Component = (props: Props) => {


    

    return (
        <div className="account_page    ">
            <Menu
                            
                className="menu"
                theme="light"
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <Link to={""}>
                        <SolutionOutlined />
                        Thông tin
                    </Link>
                </Menu.Item>
                <Menu.Item key="products">
                    <Link to={"location"}>
                        <TagOutlined />
                        Địa chỉ
                    </Link>
                </Menu.Item>
                <Menu.Item key="categories">
                    <Link to={"password"}>
                        <SettingOutlined />
                        Mật khẩu
                    </Link>
                </Menu.Item>
            </Menu>
            <div className="content">
                    <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Account_Component