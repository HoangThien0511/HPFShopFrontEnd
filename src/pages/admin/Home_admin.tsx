import React, { useState, useContext } from "react";
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
  BorderlessTableOutlined,
  BarcodeOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../app/privateRouter";
import { NavLink } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

const Home_admin = () => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="home_page home_admin">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div
            style={{
              padding: "15px 0px",
              textAlign: 'center',
              fontWeight: "700",
              fontSize: "1vw",
              color: "white"
            }}
          >
            <NavLink to="/" className="custom-link">
              H P F S H O P
            </NavLink>
            <hr

              style={{
                backgroundColor: "White",
                margin: 0
              }}

            />
          </div>
          <Menu
            className="menu"
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
          >

            <Menu.Item key="home">
              <Link to={"/admin"}>
                <DashboardOutlined />
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="products">
              <Link to={"/admin/products"}>
                <BorderlessTableOutlined />
                Sản phẩm
              </Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to={"/admin/categories"}>
                <AppstoreOutlined />
                Danh mục
              </Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to={"/admin/orders"}>
                <ShoppingCartOutlined />
                Đơn hàng
              </Link>
            </Menu.Item>
            <Menu.Item key="user">
              <Link to={"/admin/user"}>
                <UserOutlined />
                Người dùng
              </Link>
            </Menu.Item>
            <Menu.Item key="voucher">
              <Link to={"/admin/voucher"}>
                <BarcodeOutlined />
                Mã giảm giá
              </Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="main_home" style={{ padding: 20, minHeight: 500, background: colorBgContainer }}>
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>HPF Shop ©2024</Footer>
        </Layout>
      </Layout>
    </div>
  )

}

export default Home_admin