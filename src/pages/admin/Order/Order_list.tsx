import React, { useEffect, useState } from 'react'
import { useGetOrderAllQuery, useUpdateOrderMutation } from '../../../api_slice/order';
import { Button, Table, message } from 'antd';
import Column from 'antd/es/table/Column';
import moment from 'moment';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { CSVLink } from 'react-csv'
import { ExportOutlined } from '@ant-design/icons';

type Props = {}

const Order_list = (props: Props) => {
    
    const { Option, OptGroup } = Select;
    const {data: listOrderAll= [], isLoading: loadingOrder, error} = useGetOrderAllQuery(undefined);
    const [updateOrder, isLoading] = useUpdateOrderMutation()

    function handleChange(value:any, option:any) {
        const newOrder = {
            "_id": option.data.key,
            "status": value
        }

        updateOrder(newOrder).then(() => {
            message.success("Cập nhật trạng thái đơn hàng thành công")
        })
    }

    const headers = [
        { label: 'STT', key: 'stt' },
        { label: 'Mã đơn hàng', key: 'orderCode' },
        { label: 'Người nhận', key: 'userName' },
        { label: 'Số điện thoại', key: 'phoneNumber' },
        { label: 'Địa chỉ', key: 'address' },
        { label: 'Giá trị đơn', key: 'totalCheck' },
        { label: 'Ngày đặt hàng', key: 'createdAt' },
        { label: 'Ghi chú', key: 'note' },
    ];

     // Tạo mảng dữ liệu STT từ 1 đến kích thước của dữ liệu
    const sttData = Array.from({ length: listOrderAll.length }, (_, index) => index + 1);
    // Thêm cột STT vào mỗi đối tượng dữ liệu
    const dataWithSTT = listOrderAll.map((item:any, index:any) => ({
        ...item,
        stt: sttData[index],
    }));


    return (
        <>
            <div
                className="action"
                style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <CSVLink
                    data={dataWithSTT}
                    headers={headers}
                    style={{
                        border: "1px solid #007bff",
                        padding: "7px 15px",
                        borderRadius: '7px'
                    }}
                >
                    Export
                </CSVLink>
            </div>
            <hr />
            <Table
                dataSource={listOrderAll.map((item:any, index:number) => ({
                    key: item._id,
                    orderCode: item.orderCode,
                    userName: item.userName,
                    phoneNumber: item.phoneNumber,
                    totalCheck: item.totalCheck,
                    product: item.product,
                    createdAt: item.createdAt,
                    status: item.status,
                }))}
            >

                <Column 
                    title="Mã đơn hàng" 
                    dataIndex="orderCode" 
                    key="key" 
                    render={(orderCode) => (<><Link to= {orderCode}>{orderCode}</Link></>)}
                />
                <Column 
                    title="Người nhận" 
                    dataIndex="userName" 
                    key="key" 
                />
                <Column 
                    title="Số điện thoại" 
                    dataIndex="phoneNumber" 
                    key="key" 
                />
                <Column 
                    title="Giá trị đơn" 
                    dataIndex="totalCheck" 
                    key="key" 
                    render={(orderCart) => (<>{orderCart.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</>)}
                />
                <Column 
                    title="Thực nhận" 
                    dataIndex="totalCheck" 
                    key="key" 
                    render={(orderCart) => (<>{(orderCart-30000).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</>)}
                />
                <Column 
                    title="Ngày đặt hàng" 
                    dataIndex="createdAt" 
                    key="key" 
                    render={(orderCart) => (<>{moment(orderCart.createdAt).format("DD/MM/YYYY HH:mm:ss")}</>)}
                />
                <Column 
                    title="Tình trạng" 
                    dataIndex="status" 
                    key="key" 
                    render={(statusOrder, key) => (
                        <>
                            <Select defaultValue= {(statusOrder).toString()} style={{ width: 200 }} onChange={ handleChange}>
                                    <Option value="0" data={key}>Chờ xác nhận</Option>
                                    <Option value="1" data={key}>Đã xác nhận</Option>
                                    <Option value="2" data={key}>Đang giao hàng</Option>
                                    <Option value="3" data={key}>Giao hàng thành công</Option>
                                    <Option value="4" data={key}>Đơn đã hủy</Option>
                            </Select>
                        </>
                    )}
                />

            </Table >
        </>
    );
};


export default Order_list;
