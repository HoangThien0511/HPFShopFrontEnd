import React, { useEffect, useState } from 'react'
import { Button, Input, Popconfirm, Table, message } from 'antd';
import { Modal } from 'antd';

// IMG INSTA
import insta_1 from '../img/instagram/insta-1.jpg'
import insta_2 from '../img/instagram/insta-2.jpg'
import insta_3 from '../img/instagram/insta-3.jpg'
import insta_4 from '../img/instagram/insta-4.jpg'
import insta_5 from '../img/instagram/insta-5.jpg'
import insta_6 from '../img/instagram/insta-6.jpg'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { useGetCartsQuery, useRemoveCartMutation, useUpdateCartMutation } from '../../../api_slice/api_cart';
import { Icart } from '../../../interfaces/i_cart';
import Column from 'antd/es/table/Column';
import { log } from 'console';

type Props = {}


const Shop_cart = (props: Props) => {

    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem("user") as any);
    const {data: dataAllCart = [], isLoading: loadingCart , error: errorCart} = useGetCartsQuery('Cart',undefined);
    const [updateCart, { isLoading: loadingUpdate }] = useUpdateCartMutation();
    const [removeCart, { isLoading: loadingRemoveCart }] = useRemoveCartMutation();
    console.log('dataAllCart', dataAllCart)
    const [modal, setModal] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);
    const [countProduct, setCountProduct] = useState(0);
    const [valueCart, setValueCart] = useState([]);

    console.log(dataAllCart);

    const rowSelection = {
        onChange: (selectedProductKey: any, selectedProduct: any) => {
            let newTotalProduct = 0;
            let newContProduct = 0;
            newContProduct += selectedProduct.length

            selectedProduct.map((itemProduct: any) => {
                newTotalProduct += itemProduct.quantity * itemProduct.sizePrice;
            });

            setTotalProduct(newTotalProduct);
            setCountProduct(newContProduct);
            setValueCart(selectedProduct);
        },
    };

    const showModal = () => {
        setModal(true)
    };

    const handleOk = (e: any) => {
        console.log(e);
        setModal(false)
    };

    const handleCancel = () => {
        setModal(false)
    };

    const apart = (value: any, id: any) => {
        const cartUpdate: any = {
            _id: id,
            quantity: value > 1 ? value - 1 : 1,
        }

        updateCart(cartUpdate)
    }

    const add = (value: any, id: any) => {
        const cartUpdate: any = {
            _id: id,
            quantity: value + 1,
        }

        updateCart(cartUpdate)
    }

    const handleCheckOut = () => {

        if (valueCart.length == 0) {
            message.error("Bạn chưa chọn sản phẩm để tiến hành thanh toán")
        } else if (valueCart.length > 0) {
            localStorage.setItem('checkOut', JSON.stringify(valueCart));
            navigate("/checkout")
        }

    }


    if (loadingCart) return <div className='detail_product'>Đang tải dữ liệu...</div>
    return (
        <>
            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option" >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to={'/'}><i className="fa fa-home" /> Trang chủ</Link>
                                <span>Giỏ hàng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Breadcrumb End */}

            {/* Shop Cart Section Begin */}
            <section className="shop-cart container">
                <div className="listCart">
                    <div className="itemCart">
                        <Table
                            rowSelection={rowSelection}
                            pagination={false}
                            dataSource={dataAllCart
                                .filter((itemCart:Icart) => itemCart.userId == userInfo.id)
                                .map((item:any, index:number) => ({
                                    _id: item._id,
                                    key: index,
                                    product_name: item.Product[0].product_name,
                                    product_images: item.Product[0].product_images,
                                    product_size: item.size.size,
                                    color: item.color,
                                    product_discount: item.Product[0].product_discount,
                                    sizePrice: item.size.sizePrice,
                                    quantity: item.quantity,
                                    prdId: item.idProduct,
                                }))}
                        >
                            <Column
                                width={150}
                                key="key"
                                title="Sản Phẩm"
                                colSpan={1}
                                render={(product_img) => (<img width={150} src={product_img.product_images[0]} />)}
                            />
                            <Column
                                width={300}
                                key="key"
                                render={(product) => (<a style={{ color: "#95532d", fontWeight: "700" }} href={product.product_name}>{product.product_name}</a>)}
                            />
                            <Column
                                key="key"
                                render={(product_size) => (
                                    <>
                                        <p style={{ margin: 0 }}>Màu sắc: <i style={{ color: "#95532d" }}>{product_size.color}</i></p>
                                        <p style={{ margin: 0 }}>Size: <i style={{ color: "#95532d" }}>{product_size.product_size}</i></p>
                                    </>
                                )}
                            />
                            <Column
                                key="key"
                                title="Đơn Giá"
                                render={
                                    (product_discount) => (
                                        <>
                                            <i style={{ textDecoration: "line-through" }}>{product_discount.product_discount}</i>
                                            <b style={{ color: "#95532d" }}> {product_discount.sizePrice}</b>
                                        </>
                                    )}
                            />
                            <Column
                                key="key"
                                title="Số Lượng"
                                render={
                                    (product_quantity) => (
                                        <>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    boxShadow: "0px 0px 5px gainsboro",
                                                    width: "min-content"
                                                }}
                                            >
                                                <Button
                                                    onClick={() => apart(product_quantity.quantity, product_quantity._id)}
                                                    type="primary"
                                                    style={{
                                                        backgroundColor: "rgb(251 251 251)",
                                                        color: "#95532d",
                                                        borderRadius: '3px 0px 0px 3px',
                                                        boxShadow: "none",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    -
                                                </Button>

                                                <Input
                                                    style={{
                                                        border: "none",
                                                        width: "40px",
                                                        borderRadius: "0",
                                                        textAlign: "center"
                                                    }}
                                                    maxLength={3}
                                                    value={product_quantity.quantity}
                                                />

                                                <Button
                                                    onClick={() => add(product_quantity.quantity, product_quantity._id)}
                                                    type="primary"
                                                    style={{
                                                        backgroundColor: "rgb(251 251 251)",
                                                        color: "#95532d",
                                                        borderRadius: '0px 3px 3px 0px',
                                                        boxShadow: "none",
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </>
                                    )}
                            />
                            <Column
                                key="key"
                                title="Số Tiền"
                                render={
                                    (product_discount) => (
                                        <>
                                            <b style={{ color: "#95532d" }}>{(product_discount.sizePrice * product_discount.quantity)}</b>
                                        </>
                                    )}
                            />
                            <Column
                                key="key"
                                title="Thao Tác"
                                render={(cart) => {
                                    return (
                                        <Popconfirm
                                            placement="top"
                                            title="Xóa sản phẩm khỏi giỏ hàng?"
                                            onConfirm={() => removeCart(cart._id)}
                                            okText="Có"
                                            cancelText="Không"
                                        >
                                            <Button
                                                style={{
                                                    border: "none",
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </Popconfirm>
                                    );
                                }}
                            />
                        </Table>
                    </div>
                </div>
                <div className="total">
                    <div className="voucher"
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            margin: "25px 0px"
                        }}
                    >
                        Chọn mã giảm giá:
                        <Button
                            style={{
                                border: "none",
                                boxShadow: "none",
                                color: "rgb(202, 21, 21)"
                            }}
                            onClick={showModal}
                        >
                            Chọn hoặc nhập mã
                        </Button>
                        <Modal
                            title="Basic Modal"
                            visible={modal}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                    <hr />
                    <div
                        className="buy"
                        style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "flex-end"
                        }}
                    >
                        <h5>Tổng thanh toán ({countProduct} sản phẩm): <b><i style={{ color: "rgb(202, 21, 21)" }}>{totalProduct ? totalProduct : "0đ"}</i></b></h5>
                        <button
                            onClick={handleCheckOut}
                            style={{
                                width: "250px",
                                padding: "7px 20px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "rgb(202, 21, 21)",
                                color: "white",
                                margin: "0px 0px 0px 35px"
                            }}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            </section>
            {/* Shop Cart Section End */}

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
        </>

    )
}

export default Shop_cart