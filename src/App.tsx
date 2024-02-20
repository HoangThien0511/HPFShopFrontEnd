import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Categories from "./pages/admin/Category/Categories";
import Category_add from "./pages/admin/Category/Category_add";
import Category_edit from "./pages/admin/Category/Category_edit";
import Category_list from "./pages/admin/Category/Category_list";
import Dashboard from "./pages/admin/Chart/dashbroad";
import Home_admin from "./pages/admin/Home_admin";
import Order from "./pages/admin/Order/Order";
import Order_list from "./pages/admin/Order/Order_list";
import Products from "./pages/admin/Product/Products";
import Product_add from "./pages/admin/Product/Product_add";
import Product_edit from "./pages/admin/Product/Product_edit";
import Product_list from "./pages/admin/Product/Product_list";
import { PrivateRouter } from "./utils/PrivateRouter"
import Home_component from "./pages/user/Components/Home";
import DetailProduct from "./pages/user/Components/DetailProduct";
import Blog from "./pages/user/Components/Blog";
import Contact from "./pages/user/Components/Contact";
import Shop_cart from "./pages/user/Components/Shop_cart";
import Blog_detail from "./pages/user/Components/Blog_detail";
import Shop from "./pages/user/Components/Shop";
import Home_page from "./pages/user/home_page";
import Checkout from "./pages/user/Components/Checkout";
import SignIn_component from "./pages/user/Components/signIn";
import Signup_component from "./pages/user/Components/signup";
import VerifyOTP from "./pages/user/Components/VerifyOTP";
import ResetPassword from "./pages/user/Components/ResetPassword";
import ListUser from "./pages/admin/User/UserList";
import UserEdit from "./pages/admin/User/UserEdit";
import Account_Component from "./pages/user/Components/AccountUser/Account";
import Location_component from "./pages/user/Components/AccountUser/Location";
import UserInfo from "./pages/user/Components/AccountUser/UserInfo";
import AccountInformation from "./pages/user/Components/AccountUser/AccountInformation";
import Password_userComponent from "./pages/user/Components/AccountUser/Password_user";
import Order_component from "./pages/user/Components/Order_component";
import Voucher from "./pages/admin/Voucher/Voucher";
import Voucher_list from "./pages/admin/Voucher/Voucher_list";
import Voucher_add from "./pages/admin/Voucher/Voucher_add";
import { ToastContainer } from "react-toastify";
import Detail_Order from "./pages/admin/Order/detailOrder";
import Voucher_edit from "./pages/admin/Voucher/Voucher_edit";
import jwtDecode from 'jwt-decode';
import React, { useCallback, useEffect, useState } from 'react'
import { message } from "antd";
import DetailOrder from "./pages/user/Components/detailOrder";


function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setAuth(false);
  };


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        if (currentTime > expirationTime) {
          handleLogout();
          message.success('Vui lòng đăng nhập lại');
        }
      } catch (error) {
      }
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* User */}
        <Route path="" element={<Home_page />}>
          <Route index element={<Home_component />}></Route>
          <Route path="shop/detail/:id" element={<DetailProduct />}></Route>
          <Route path="blog" element={<Blog />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="shop-cart" element={<Shop_cart />}></Route>
          <Route path="blog-detail" element={<Blog_detail />}></Route>
          <Route path="shop" element={<Shop />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="signin" element={<SignIn_component />}></Route>
          <Route path="signup" element={<Signup_component />}></Route>
          <Route path="reset-password" element={<ResetPassword />}></Route>
          <Route path="verify" element={<VerifyOTP />} />

          {/* ROUTER USER ACCOUNT INFORMATION */}
          <Route path="info" element={<UserInfo />}>
            <Route path="account" element={<Account_Component />}>
              <Route index element={<AccountInformation />} ></Route>
              <Route path="location" element={<Location_component />} ></Route>
              <Route path="password" element={<Password_userComponent />} ></Route>
            </Route>
            <Route path="order" element={<Order_component />} ></Route>
            <Route path="order/:id" element={<DetailOrder />} />

          </Route>
        </Route>

        {/* ADMIN START */}

        <Route path="/admin" element=
          // {
          //   <PrivateRouter>
          //     {<Home_admin />}
          //   </PrivateRouter>
          // }
          {<Home_admin />}
        >
          <Route index element={<Dashboard />}></Route>
          <Route path="categories" element={<Categories />}>
            <Route index element={<Category_list />}></Route>
            <Route path="update/:id" element={<Category_edit />}></Route>
            <Route path="news" element={<Category_add />}></Route>
          </Route>

          <Route path="orders" element={<Order />}>
            <Route index element={<Order_list />}></Route>
            <Route path=":id" element={<Detail_Order />}></Route>
          </Route>

          <Route path="voucher" element={<Voucher />}>
            <Route index element={<Voucher_list />}></Route >
            <Route path="news" element={<Voucher_add />}></Route>
            <Route path="update/:id" element={<Voucher_edit />}></Route>
          </Route>

          <Route path="products" element={<Products />}>
            <Route index element={<Product_list />}></Route>
            <Route path="update/:id" element={<Product_edit />}></Route>
            <Route path="news" element={<Product_add />}></Route>
          </Route>

          <Route path="user">
            <Route
              index
              element={
                <ListUser />
              }
            ></Route>
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
        </Route>

        {/* ADMIN END */}
      </Routes>
      <ToastContainer />
    </div >
  );
}

export default App;
