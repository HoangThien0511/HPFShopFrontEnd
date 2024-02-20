import { Table, Image, Space, Tooltip, Button, Tag } from "antd";
import React from "react";

import { Link } from "react-router-dom";
import useUsers from "../../../hooks/use-user";



const ListUser = () => {
    const { data, error } = useUsers();
    if (!data) return <div>loading</div>;
    if (error) return <div>Failed loading</div>;

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
        },

        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            render: (role: number) => {
                if (role === 1) {
                    return <span>Admin</span>;
                } else {
                    return <span>Khách hàng</span>;
                }
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status: number) => {
                if (status === 1) {
                    return (
                        <Tag color="green" className="p-1">
                            ĐẪ KÍCH HOẠT
                        </Tag>
                    );
                } else if (status === 2) {
                    return (
                        <Tag color="red" className="p-1">
                            ĐÃ KHÓA
                        </Tag>
                    );
                } else {
                    return (
                        <Tag color="gold" className="p-1">
                            CHƯA KÍCH HOẠT
                        </Tag>
                    );
                }
            },
        },
        {
            title: "Hành động",
            dataIndex: "_id",
            key: "action",
            colapse: 2,
            render: (item: any) => {
                return (
                    <div className="ml-4">
                        <Space size="middle">
                            <Tooltip title="Sửa">
                                <Link to={`/admin/user/${item}/edit`}>
                                    {" "}
                                    <Button type="primary">Sửa</Button>
                                </Link>
                            </Tooltip>
                        </Space>
                    </div>
                );
            },
        },
    ];


    return (
        <>
            <div className="w-full px-6 py-6 mx-auto">
                <Table columns={columns} dataSource={data} />
            </div>
            ;
        </>
    );
};

export default ListUser;
