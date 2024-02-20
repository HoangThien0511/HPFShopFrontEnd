import React, { useState } from 'react';

import product_1 from "../img/product/details/product-1.jpg"
import product_2 from "../img/product/details/product-2.jpg"
import { useGetOrderAllQuery } from '../../../api_slice/order';
import { log } from 'console';
import { Link } from 'react-router-dom';

type Props = {}

const Order_component = (props: Props) => {

    const {data:allOrder=[], isLoading} = useGetOrderAllQuery(undefined);
    const userInfo = JSON.parse(localStorage.getItem("user") as any);

    const checkStatus = (status:any) => {
        switch (status) {
            case 1:
                return "Đã xác nhận"
                break;
            case 2:
                return "Đang giao hàng"
                break;
            case 3:
                return "Giao hàng thành công"
                break;
            case 4:
                return "Đơn đã hủy"
                break;
            default:
                return "Chờ xác nhận"
                break;
        }
    }

    return (
        <div className="account_page order_page">
                <div className="content">
                    <div className="list_order">
                        {
                            allOrder.filter((itemOrder:any) => itemOrder.userId == userInfo.id)
                            .map((item:any) => {
                                return (
                                    <>
                                        <div className="item_order" style={{margin: "25px auto"}}>
                                            <div className="title_order">
                                                <p>Mã đơn hàng: <Link to={item.orderCode}>{item.orderCode}</Link></p>
                                                <p>
                                                    <i>{checkStatus(item.status)}</i>
                                                </p>
                                            </div>
                                            <hr />
                                            {item.product.map((product:any) => {
                                                console.log(product);
                                                return (
                                                    <>
                                                        <div
                                                             className="detail col-9"
                                                             style={{
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                             }}
                                                        >
                                                            <div className="col-2">
                                                                <img src={product.product_images[0]} alt="" />
                                                            </div>
                                                            <b>{product.product_name}</b>
                                                        </div>
                                                        
                                                    </>
                                                )
                                            })}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    color: "#95532d"
                                                }}
                                            >
                                                <b>Thành tiền: {item.totalCheck}</b>
                                            </div>
                                        </div>
                                        <hr />
                                        <hr />
                                    </>
                                )
                                
                            })
                        }
                        
                    </div>
                </div>
            </div>
    )
}

export default Order_component