import React, { createContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../../api_slice/api_product'
import { Button, Checkbox, Form, Input, InputNumber, message } from "antd";
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { db } from '../../../firebase/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'


import rp_1 from '../img/product/related/rp-1.jpg'
import rp_2 from '../img/product/related/rp-2.jpg'
import rp_3 from '../img/product/related/rp-3.jpg'
import rp_4 from '../img/product/related/rp-4.jpg'

// IMG INSTA
import insta_1 from '../img/instagram/insta-1.jpg'
import insta_2 from '../img/instagram/insta-2.jpg'
import insta_3 from '../img/instagram/insta-3.jpg'
import insta_4 from '../img/instagram/insta-4.jpg'
import insta_5 from '../img/instagram/insta-5.jpg'
import insta_6 from '../img/instagram/insta-6.jpg'
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useAddCartMutation, useGetCartsQuery, useUpdateCartMutation } from "../../../api_slice/api_cart";
import { Item } from "rc-menu";
import { Icart } from "../../../interfaces/i_cart";

type Props = {}

const DetailProduct = (props: Props) => {

    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductQuery(id)
    const userInfo = JSON.parse(localStorage.getItem("user") as any);
    const [addCart, { isLoading: loading_cart }] = useAddCartMutation();
    const [updateCart, { isLoading: loadingUpdate }] = useUpdateCartMutation();
    const { data: dataAllCart, isLoading: loadingCart, error: errorCart } = useGetCartsQuery(undefined);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [cartCount, setCartCount] = useState<number>(0);
    const navigate = useNavigate();
    const [valueColor, setValueColor] = useState('');
    const [valueSize, setValueSize] = useState('');
    const [valuePrice, setValuePrice] = useState(0);
    var [valuePro, setValuePro] = useState(1);


    const changeValuePro = (e: any) => {
        setValuePro(e.target.value);
    }

    const apart = (value: any) => {
        valuePro == 1 ? setValuePro(1) : setValuePro(value - 1)
    }

    const add = (value: any) => {
        setValuePro(value + 1)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeColor = (e: RadioChangeEvent) => {
        setValueColor(e.target.value);
    };

    const onChangeSize = (e: RadioChangeEvent) => {
        setValueSize(e.target.value);
        setValuePrice(e.target.value.sizePrice);
    };

    const onFinish = (values: any) => {

        if (!userInfo || userInfo == null) {
            message.error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng!", 2);
            navigate('/signin')
        } else {

            const productCart = {
                userId: userInfo.id,
                idProduct: product._id,
                quantity: valuePro,
                size: valueSize == '' ? product.product_size[0] : valueSize,
                color: valueColor == '' ? product.product_color[0] : valueColor,
            }

            const cartUser = dataAllCart.filter((itemCart: Icart) => itemCart.userId == userInfo.id);

            const checkCart = cartUser.filter((itemCart: Icart) => itemCart.idProduct == id)

            const checkUpdate = cartUser.filter((itemCart: any) => itemCart.color == productCart.color && itemCart.size['size'] == productCart.size['size'])

            if (checkUpdate.length > 0) {

                const cartUpdate: any = {
                    _id: checkUpdate[0]._id,
                    quantity: valuePro + checkUpdate[0].quantity,
                }

                updateCart(cartUpdate).then(
                    message.success("Thêm sản phẩm vào giỏ hàng thành công!")
                ).catch((error) => {
                    message.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
                })

            } else {
                addCart(productCart).then(
                    message.success("Thêm sản phẩm vào giỏ hàng thành công!")
                ).catch((error) => {
                    message.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
                })
            }

        }

    };

    if (isLoading) return <div className='detail_product'>Đang tải dữ liệu...</div>
    return (
        <div className='detail_product'>
            {/* Product Details Section Begin */}
            <section className="product-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="product__details__pic">
                                <Swiper
                                    loop={true}
                                    spaceBetween={10}
                                    // navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    {product.product_images.map((item: any) => {
                                        return (
                                            <SwiperSlide>
                                                <img src={item} />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    {product.product_images.map((item: any) => {
                                        return (
                                            <SwiperSlide>
                                                <img src={item} />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="product__details__text">
                                <h3>{product.product_name}</h3>
                                {/* <div className="product__details__price">{product.product_price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }<span> {product.product_discount ? product.product_discount.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) : ""} đ</span></div> */}
                                <div className="product__details__price">{valuePrice == 0 ? product.product_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : valuePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}<span> {product.product_discount ? product.product_discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ""} đ</span></div>
                                <div className="product__details__widget">
                                    <Form
                                        name="basic"
                                        labelCol={{ span: 4 }}
                                        wrapperCol={{ span: 19 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                        className="form_cart"
                                    >
                                        <Form.Item
                                            label="MÀU SẮC"
                                            name="product_color"
                                        >
                                            {product.product_color.map((item_color: any, index: number) => {
                                                return (
                                                    <Radio.Group
                                                        key={index}
                                                        onChange={onChangeColor}
                                                        value={valueColor}
                                                    >
                                                        <Radio value={item_color}>{item_color}</Radio>
                                                    </Radio.Group>
                                                )
                                            })}
                                        </Form.Item>
                                        <Form.Item
                                            label="SIZE"
                                            name="product_size"
                                        >
                                            {product.product_size.map((item_size: any, indexSize: number) => {
                                                return (
                                                    <Radio.Group
                                                        key={indexSize}
                                                        onChange={onChangeSize}
                                                        value={valueSize}
                                                    >
                                                        <Radio value={item_size}>{item_size.size}</Radio>
                                                    </Radio.Group>
                                                )
                                            })}
                                        </Form.Item>
                                        <Form.Item
                                            label="SỐ LƯỢNG"
                                            name="product_quantity"
                                        >
                                            <Button
                                                onClick={() => apart(valuePro)}
                                                type="primary"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "30px",
                                                    margin: "0",
                                                    borderRadius: "0",
                                                    border: "1px solid #ebebeb",
                                                    boxShadow: "none",
                                                    height: "38px"
                                                }}
                                            >
                                                -
                                            </Button>

                                            <Input
                                                style={{
                                                    width: "40px",
                                                    borderRadius: "0",
                                                    border: "0",
                                                    borderTop: "1px solid #ebebeb",
                                                    borderBottom: "1px solid #ebebeb",
                                                    paddingLeft: "0",
                                                    paddingRight: "0",
                                                    textAlign: "center"
                                                }}
                                                maxLength={3}
                                                value={valuePro}
                                                onChange={changeValuePro}
                                            />

                                            <Button
                                                onClick={() => add(valuePro)}
                                                type="primary"
                                                style={{
                                                    height: "38px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "30px",
                                                    color: "#95532d",
                                                    margin: "0",
                                                    borderRadius: "0",
                                                    border: "1px solid #ebebeb",
                                                    boxShadow: "none"
                                                }}
                                            >
                                                +
                                            </Button>
                                        </Form.Item>
                                        <Form.Item >
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="cart-btn col-md-6 col-12"
                                                // onClick={() => checkCart()}
                                                icon={<ShoppingCartOutlined />}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                Thêm vào giỏ hàng
                                            </Button>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="col-md-4 col-12"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                            >
                                                Mua ngay
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="product__details__tab">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <Link className="nav-link active" data-toggle="tab" to="#tabs-1" role="tab">Description</Link>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                        <h6>Mô tả sản phẩm</h6>
                                        <p>{product.product_desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="related__title">
                                <h5>RELATED PRODUCTS</h5>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${rp_1})` }}>
                                    <div className="label new">New</div>
                                    <ul className="product__hover">
                                        <li><Link to={rp_1} className="image-popup"><span className="arrow_expand" /></Link></li>
                                        <li><Link to="#"><span className="icon_heart_alt" /></Link></li>
                                        <li><Link to="#"><span className="icon_bag_alt" /></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><a href="#">Buttons tweed blazer</a></h6>
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <div className="product__price">$ 59.0</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${rp_2})` }}>
                                    <ul className="product__hover">
                                        <li><Link to={rp_2} className="image-popup"><span className="arrow_expand" /></Link></li>
                                        <li><Link to="#"><span className="icon_heart_alt" /></Link></li>
                                        <li><Link to="#"><span className="icon_bag_alt" /></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><a href="#">Flowy striped skirt</a></h6>
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <div className="product__price">$ 49.0</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${rp_3})` }}>
                                    <div className="label stockout">out of stock</div>
                                    <ul className="product__hover">
                                        <li><Link to={rp_3} className="image-popup"><span className="arrow_expand" /></Link></li>
                                        <li><Link to="#"><span className="icon_heart_alt" /></Link></li>
                                        <li><Link to="#"><span className="icon_bag_alt" /></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><a href="#">Cotton T-Shirt</a></h6>
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <div className="product__price">$ 59.0</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${rp_4})` }}>
                                    <ul className="product__hover">
                                        <li><Link to={rp_4} className="image-popup"><span className="arrow_expand" /></Link></li>
                                        <li><Link to="#"><span className="icon_heart_alt" /></Link></li>
                                        <li><Link to="#"><span className="icon_bag_alt" /></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6><Link to="#">Slim striped pocket shirt</Link></h6>
                                    <div className="rating">
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </div>
                                    <div className="product__price">$ 59.0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Product Details Section End */}
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
    )
}
export default DetailProduct