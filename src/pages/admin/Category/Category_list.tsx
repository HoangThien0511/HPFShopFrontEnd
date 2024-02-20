import React from 'react'
// Form
import { Button, Checkbox, Form, Input, InputNumber, message, Popconfirm, Table } from 'antd';

// Noti
import { notification, Space } from 'antd';
import { Link } from 'react-router-dom';
import Column from 'antd/es/table/Column';
import { useGetCategoriesQuery, useRemoveCategoryMutation } from '../../../api_slice/api_categories';
type NotificationType = 'success';


// Form End

type Props = {}

const Category_list = (props: Props) => {

    const { data: listCategory = [], isLoading } = useGetCategoriesQuery()
    const [remove] = useRemoveCategoryMutation();
    const removeCategory = (key: number) => {
        remove(key as any).unwrap().then(() => {
            message.success("Xóa thành công!")
        })
    }

    const onFinishFailed = (errorInfo: any) => {
    };


    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <Link style={{ color: 'white' }} to={'/admin/categories/news'}>
                <Button type="primary" style={{ margin: '-40px 1200px 10px 0' }} >Thêm mới</Button>
            </Link>
            <Table

                dataSource={listCategory.map((item, index) => ({
                    key: item._id,
                    name: item.name_category,
                    stt: index
                }))}

            >
                <Column title="STT" dataIndex="stt" key="key" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column
                    title="Action"
                    key="action"
                    render={(category) => {
                        return (
                            <Popconfirm
                                placement="top"
                                title="Bạn có muốn xóa không?"
                                onConfirm={() => removeCategory(category.key)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button type="primary" style={{ margin: '0 5px' }} danger>
                                    Remove
                                </Button>
                                <Link style={{ color: 'white' }} to={`/admin/categories/update/${category.key}`}>
                                    <Button type="primary" style={{ backgroundColor: 'green' }} >
                                        Edit
                                    </Button>
                                </Link>
                            </Popconfirm>
                        );
                    }}
                ></Column>
            </Table >
        </>
    )
}

export default Category_list