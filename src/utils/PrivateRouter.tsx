import { message } from "antd";
import React from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";
import { isAuthenticate } from "./LocalStorage";


export const PrivateRouter = (props: any) => {
  const navigate = useNavigate();
  if (localStorage.getItem("user")) {
    const user = isAuthenticate();
    console.log(user);
    if (user?.role == 0) {
      React.useEffect(() => {
        message.error("Bạn không có quyền truy cập !", 2);
        return navigate("/");
      }, []);
    } else {
      return props.children;
    }
  } else {
    React.useEffect(() => {
      message.error("Bạn không có quyền truy cập !", 2);
      return navigate("/");
    }, []);
  }
};

// export const PrivateRouter2 = (props: any) => {
//   const navigate = useNavigate();
//   if (localStorage.getItem("user")) {
//     const user = isAuthenticate();
//     if (user?.role == 1) {
//       React.useEffect(() => {
//         // message.error("Bạn không có quyền truy cập !", 2);
//         return navigate("/admin/products");
//       }, []);
//     } else {
//       return props.children;
//     }
//   }
// };
