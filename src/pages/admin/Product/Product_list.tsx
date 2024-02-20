import React, { useState } from 'react';
import { Button,Popconfirm, Table, message } from 'antd';
import { useGetProductsQuery, useImportProductMutation, useRemoveProductMutation } from '../../../api_slice/api_product';
import { Link } from 'react-router-dom';
import Column from 'antd/es/table/Column';
import { read, utils, writeFile } from 'xlsx';
import { NavLink } from 'react-router-dom';


type Props = {}

const Product_list = (props: Props) => {

    const { data: listProducts = [], isLoading } = useGetProductsQuery();
    const [importProduct, {isLoading: loadingImport}] = useImportProductMutation() 
    const [remove] = useRemoveProductMutation();

    const removeProduct = (key: number) => {
        remove(key as any).unwrap().then(() => {
            message.success("Xóa sản phẩm thành công!")
        })
    }

    listProducts.map((item, index) => {
        console.log(item);
        
    })

    if (isLoading) return <div>Đang tải dữ liệu...</div>;
    return (
        <>

            <Link style={{ color: 'white' }} to={'/admin/products/news'}>
                <Button type="primary" style={{ margin: '-40px 1200px 10px 0' }}>Thêm mới</Button>
            </Link>

            <Table
                dataSource={listProducts.map((item, index) => ({
                    id: item._id,
                    key: index,
                    product_name: item.product_name,
                    product_price: item.product_price,
                    product_images: item.product_images[0],
                    product_discount: (item.product_discount == 0 || !item.product_discount) ? item.product_price : item.product_discount,
                    product: item
                }))}
            >

                <Column className='col-1' title="STT" dataIndex="key" key="key" />
                <Column 
                    className='col-3' 
                    title="Tên sản phẩm" 
                    dataIndex="product" 
                    key="product" 
                    render={(product) => (<><NavLink to={`../../../shop/detail/${product._id}`} >{product.product_name}</NavLink></>)}
                />
                <Column 
                    className='col-1' 
                    title="Giá bán" 
                    dataIndex="product_price" 
                    key="product_price" 
                    render={(product_price) => (<>{product_price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</>)}
                />
                <Column className='col-1' title="Giá gốc" dataIndex="product_discount" key="product_discount" render={(product_discount) => (<>{product_discount.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</>)} />
                <Column 
                    className='col-2' 
                    title="Số lượng hiện có" 
                    dataIndex="product_quantity" 
                    key="product_quantity" />
                <Column
                    title="Action"
                    key="action"
                    className='col-2'
                    render={(product) => {
                        return (
                            <Popconfirm
                                placement="top"
                                title="Bạn chắc chắn xóa phẩm này?"
                                onConfirm={() => removeProduct(product.id)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button type="primary" style={{ margin: '0 5px' }} danger>
                                    Xóa
                                </Button>

                                <Link style={{ color: 'white' }} to={`/admin/products/update/${product.id}`}>
                                    <Button type="primary" style={{ backgroundColor: 'green' }}>Cập nhật</Button>
                                </Link>
                            </Popconfirm>
                        );
                    }}
                ></Column>

            </Table >
        </>
    )
}

export default Product_list