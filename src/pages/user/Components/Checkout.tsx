import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox, message } from 'antd';

import insta_1 from '../img/instagram/insta-1.jpg'
import insta_2 from '../img/instagram/insta-2.jpg'
import insta_3 from '../img/instagram/insta-3.jpg'
import insta_4 from '../img/instagram/insta-4.jpg'
import insta_5 from '../img/instagram/insta-5.jpg'
import insta_6 from '../img/instagram/insta-6.jpg'
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { isAuthenticate } from '../../../utils/LocalStorage';
import { getProfile } from '../../../api_slice/api_user';
import { useCreateOrderMutation } from '../../../api_slice/order';
import { useEditProductMutation, useGetProductQuery } from '../../../api_slice/api_product';
import { IProduct } from '../../../interfaces/i_product';
import { useRemoveCartMutation } from '../../../api_slice/api_cart';
import axios from 'axios';

const Checkout = () => {

    const navigate = useNavigate()
    const localCart = localStorage.getItem('checkOut');
    const localUser = localStorage.getItem('user');
    const cartCheck = JSON.parse(localCart as string);
    const infoUser = JSON.parse(localUser as string);
    const [totalProduct, setTotalProduct] = useState(0);
    const [form] = Form.useForm<any>();
    const [createOrder, { isLoading: loadingOrder }] = useCreateOrderMutation();
    const [updateProduct, { isLoading: loadingProduct }] = useEditProductMutation();
    const [removeCart, { isLoading: loadingRemove }] = useRemoveCartMutation();

    // BOT TELTGRAM START

    const botToken = '6040991044:AAHZ8DB9mgF_KbVuTQsU11Atn4cRZgjQO3k';
    const chatId = "5208541473";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=`

    // BOT TELTGRAM END

    const user = isAuthenticate();

    let newTotalProduct = 0;

    useEffect(() => {
            cartCheck.map((item:any) => {
                newTotalProduct += item.sizePrice * item.quantity;
                setTotalProduct(newTotalProduct);
            })    

            const getProfiles = async () => {
                const userInfo: any = await getProfile(user?.token);
                form.setFieldsValue({
                    userName: userInfo?.name,
                    address: userInfo?.address,
                    phoneNumber: userInfo?.phoneNumber,
                });
            };

            getProfiles();
            
    }, [cartCheck])
    
    const generateOrderCode = () => {

        const randomDigits = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
        const orderCode = `DH${randomDigits}`; // Tạo mã DH bằng cách kết hợp 'DH' và số ngẫu nhiên
        
        return orderCode;
    };

    const handleSubmit = (value:any) => {

        const checkOut = {
            "userId": infoUser.id,
            "orderCode": generateOrderCode(),
            "note": value.note,
            "phoneNumber": value.phoneNumber,
            "userName": value.userName,
            "product": cartCheck,
            "status": 0,
            "totalCheck": totalProduct + 30000
        }

        const messageTele = `BẠN CÓ ĐƠN HÀNG MỚI \n\n
            ------------------ \n\n
            Họ và tên: ${checkOut.userName} \n\n
            Mã đơn hàng: ${checkOut.orderCode} \n\n
            Số điện thoại: ${checkOut.phoneNumber} \n\n
            Số điện thoại: ${checkOut.phoneNumber} \n\n
            Giá trị đơn hàng: ${checkOut.totalCheck} \n\n
            Ghi chú: ${checkOut.note} \n\n
        `


        createOrder(checkOut).then(() => {
            checkOut.product.map( async (itemCart:any) => {
                axios.get(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${messageTele}`)
                removeCart(itemCart._id)
                const dataProduct = await (await fetch(`http://localhost:8080/api/products/${itemCart.prdId}`)).json()
                
                
                dataProduct.product_size.map(async (item:any) => {
                    const newSize = dataProduct.product_size.filter((element:any) => element.size != itemCart.product_size);
                    if(item.size === itemCart.product_size){
                        const updateCart = {
                            _id: dataProduct._id,
                            product_size: [...newSize,{"size": `${itemCart.product_size}`, 'sizePrice': item.sizePrice, "sizeQuantity" : (item.sizeQuantity - itemCart.quantity)}]
                        }
                        localStorage.removeItem('checkOut')
                        updateProduct(updateCart as IProduct).then(() => {
                                message.success("Bạn đã đặt hàng thành công!")
                                navigate("/")
                            }
                        )
                    }
                })            
            })
        }
        ).catch((error) => {
            message.error("Đã xảy ra lỗi khi đặt hàng");
        })
    }

    return (
        <div>
            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to={'/'}><i className="fa fa-home" />Trang chủ</Link>
                                <span>Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}
            
            {/* Checkout Section Begin */}
            <section className="checkout spad">
                <Form
                    form={form}
                    onFinish={handleSubmit}
                >
                    <div
                        className="container"
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between"
                        }}
                    >
                        <div className="form col-5">
                            <h5>Địa chỉ nhận hàng:</h5>
                            <hr />
                                <div className="item_form">
                                    <p>Họ và tên: <i style={{color: "red"}}>*</i></p>
                                    <Form.Item
                                        name="userName"
                                    >
                                        <Input 
                                            placeholder="Họ và tên người nhận hàng"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="item_form">
                                    <p>Số điện thoại: <i style={{color: "red"}}>*</i></p>
                                    <Form.Item
                                        name="phoneNumber"
                                    >
                                        <Input 
                                            placeholder="Số điện thoại người nhận hàng"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="item_form">
                                    <p>Địa chỉ: <i style={{color: "red"}}>*</i></p>
                                    <Form.Item
                                        name="address"
                                    >
                                        <TextArea rows={6} placeholder="Nhập địa chỉ nhận hàng" />
                                    </Form.Item>
                                </div>
                                <div className="item_form">
                                    <p>Ghi chú:</p>
                                    <Form.Item
                                        name="note"
                                    >
                                        <TextArea rows={5} placeholder="Nhập nội dung ghi chú" />
                                    </Form.Item>
                                </div>
                        </div>
                        <div className="cart col-6">
                            <h5>Chi tiết đơn hàng:</h5>
                            <hr />
                            <div className="listCart">
                                {cartCheck.map((item:any) => (
                                    <>
                                        <div 
                                            className="itemCart"
                                            style={{
                                                display: "flex",
                                                alignItems: "flex-start",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <div 
                                                className="detail"
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <img src={item.product_images[0]} className='col-3' alt="" />
                                                <h6 className='col-9'>{item.product_name}</h6>
                                            </div>
                                            <div
                                                className="price col-3"
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-end",
                                                    alignItems: "flex-end"
                                                }}
                                            >
                                                <b>{(item.sizePrice).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</b>
                                                <p>x{item.quantity}</p>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                ))}
                                <div
                                    className="totalPrice"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <p>Tổng tiền hàng: <b> {totalProduct.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</b></p>
                                    <p>Phí vận chuyển: <b> {(30000).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</b></p>
                                    <p>Tổng thanh toán: <b  style={{color: '#95532d', fontSize: "18px"}}> {(totalProduct + 30000).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'})}</b></p>
                                </div>
                                <hr />
                                <div>
                                <Form.Item 
                                    className='col-12' 
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: "#95532d",
                                            borderRadius: "3px",
                                            width:"250px",
                                            color: "white",
                                            height:"35px"
                                        }}
                                    >
                                        Đặt hàng
                                    </Button>
                                </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </section>
            {/* Checkout Section End */}
            
            {/* Instagram Begin */}
            <div className="instagram">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_1})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_2})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_3})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_4})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_5})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                            <div className="instagram__item set-bg" style={{ backgroundImage: `url(${insta_6})` }}>
                                <div className="instagram__text">
                                    <i className="fa fa-instagram" />
                                    <Link to="#">@ ashion_shop</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Instagram End */}
        </div>
    );
};

export default Checkout;
