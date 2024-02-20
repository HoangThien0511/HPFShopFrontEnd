import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useDetailOrderQuery, useUpdateOrderMutation } from '../../../api_slice/order';
import moment from 'moment';
import { Button, Popconfirm, Table, message } from 'antd';
import Column from 'antd/es/table/Column';
import { Link } from 'react-router-dom';
import DetailProduct from './DetailProduct';

type Props = {}

const DetailOrder = (props: Props) => {

    const { id } = useParams();

    const {data: detailOrder, isLoading: loadingOrder} = useDetailOrderQuery(id)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [updateOrder, isLoading] = useUpdateOrderMutation()

    function handleClick(order:any) {
        const newOrder = {
            "_id": order._id,
            "status": 4
        }

        updateOrder(newOrder).then(() => {
            message.success("Bạn đã hủy đơn hàng thành công")
        })
    }

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

    const checkDisable = (status:any) => {
        switch (status) {
            case 1:
                return false
                break;
            case 2:
                return true
                break;
            case 3:
                return true
                break;
            case 4:
                return true
                break;
            default:
                return false
                break;
        }
    }

    if(loadingOrder) return (<>Loading...</>)
    return (
        <div 
            style={{
                paddingLeft: "15px"
            }}
        >
            <p><b>Mã đơn hàng:</b> {detailOrder.orderCode}</p>
            <p><b>Tình trạng:</b> {checkStatus(detailOrder.status)}</p>
            <p><b>Họ tên người nhận:</b> {detailOrder.userName}</p>
            <p><b>Địa chỉ nhận hàng:</b> {detailOrder.address}</p>
            <p><b>Số điện thoại:</b> {detailOrder.phoneNumber}</p>
            <p><b>Giá trị đơn hàng:</b> {(detailOrder.totalCheck).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</p>
            <p><b>Ngày đặt hàng:</b> {moment(detailOrder.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p><b>Ghi chú:</b> {detailOrder.note}</p>
            <Popconfirm
                placement="top"
                title="Bạn xác nhận sẽ hủy đơn hàng này?"
                onConfirm={() => handleClick(detailOrder)}
                okText="Có"
                cancelText="Không"
                disabled= {checkDisable(detailOrder.status)}
            >
                <Button disabled= {checkDisable(detailOrder.status)}  type="primary" style={{ margin: '0 5px' }} danger>
                    Hủy đơn hàng
                </Button>
                
            </Popconfirm>
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
        </div>
    )
}

export default DetailOrder