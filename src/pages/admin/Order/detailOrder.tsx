import React from 'react'
import { useParams } from 'react-router';
import { useDetailOrderQuery } from '../../../api_slice/order';
import moment from 'moment';
import { Table } from 'antd';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router-dom';

type Props = {}

const Detail_Order = (props: Props) => {

    const { id } = useParams();

    const {data: detailOrder, isLoading: loadingOrder} = useDetailOrderQuery(id)

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

    if(loadingOrder) return (<>Loading...</>)
    return (
        <>
            <p><b>Mã đơn hàng:</b> {detailOrder.orderCode}</p>
            <p><b>Tình trạng:</b> {checkStatus(detailOrder.status)}</p>
            <p><b>Họ tên người nhận:</b> {detailOrder.userName}</p>
            <p><b>Địa chỉ nhận hàng:</b> {detailOrder.address}</p>
            <p><b>Số điện thoại:</b> {detailOrder.phoneNumber}</p>
            <p><b>Giá trị đơn hàng:</b> {(detailOrder.totalCheck).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</p>
            <p><b>Ngày đặt hàng:</b> {moment(detailOrder.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p><b>Ghi chú:</b> {detailOrder.note}</p>
            <hr />
            <Table
                    dataSource={detailOrder.product.map((item:any, index:number) => ({
                        key: item._id,
                        product_name: item.product_name,
                        product_images: item.product_images,
                        product_size: item.product_size,
                        color: item.color,
                        sizePrice: item.sizePrice,
                        quantity: item.quantity,
                        product: item
                    }))}
                >

                    <Column 
                        dataIndex="product_images" 
                        key="key" 
                        width={170}
                        render={(product_images) => (<><img src={product_images[0]} alt="" /></>)}
                        title="Sản phẩm" 
                    />
                    <Column 
                        dataIndex="product" 
                        key="key" 
                        width={550}
                        title=''
                        render={(product) => (<><Link to= {`../../../shop/detail/${product.prdId}`}>{product.product_name}</Link></>)}
                    />
                    <Column 
                        dataIndex="product_size" 
                        key="key" 
                        width={130}
                        title=''
                        render={(product_size) => (<><p>Size: {product_size}</p></>)}
                    />
                    <Column 
                        dataIndex="color" 
                        key="key" 
                        title=''
                        width={130}
                        render={(color) => (<><p>Màu sắc: {color}</p></>)}
                    />
                    <Column 
                        dataIndex="sizePrice" 
                        key="key" 
                        render={(sizePrice) => (<><p>{sizePrice.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})} </p></>)}
                        title="Đơn giá" 
                    />
                    <Column 
                        dataIndex="quantity" 
                        key="key" 
                        render={(quantity) => (<><p>{quantity} </p></>)}
                        title="Số lượng" 
                    />
                    

                </Table >
        </>
    )
}

export default Detail_Order