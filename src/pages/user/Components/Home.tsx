import React from 'react'
import { useGetNewProductQuery, useGetProductsQuery } from '../../../api_slice/api_product'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RootState } from '../../../app/store';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

type Props = {}

const Home_component = (props: Props) => {

    const { data: products = [] } = useGetProductsQuery()
    const { data: newProducts = [], isLoading } = useGetNewProductQuery(undefined)

    // const dataSearch = useSelector((state: RootState) => state.searchSlice.value)


    return (
        <>
            {/* CATEGORIES SESSION START */}
            <section className="categories" style={{ marginTop: '-1px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <Swiper
                            // install Swiper modules
                            modules={[Pagination]}
                            spaceBetween={50}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                        >
                        </Swiper>
                    </div>
                </div>
            </section>
            {/* CATEGORIES SESSION END */}



            {/* PRODUCTS SESSION START */}

            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="section-title col-12">
                            <h4>Sản phẩm</h4>
                            <hr />
                        </div>
                    </div>

                    <div className="row property__gallery">
                        {products.slice(0, 8).map((item: any) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                                <div className="product__item">
                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${item.product_images[0]})` }}>
                                        <div className="label new">Mới</div>
                                        <ul className="product__hover">
                                            <li>
                                                <Link to={item.product_images[0]} className="image-popup">
                                                    <span className="arrow_expand"></span>
                                                </Link>
                                            </li>
                                            <li><Link to="#"><span className="icon_bag_alt"></span></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product__item__text">
                                        <h6 className='nameProduct'><Link to={`/shop/detail/${item._id}`}>{item.product_name}</Link></h6>
                                        <hr />
                                        <div className="product__price">{(item.product_discount ? (item.product_discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : (item.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </section>

            {/* PRODUCTS SESSION END */}


            {/* BANNER SESSION START */}

            <div >
              
            </div>

            <div style={{ margin: "3vw auto" }} className="container">
                <div className="row">
                    <div className="section-title col-12">
                        <h4>Sản phẩm mới</h4>
                        <hr />
                    </div>
                </div>
                <div className="row property__gallery">
                    {newProducts.map((item: any) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mix women">
                            <div className="product__item">
                                <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${item.product_images[0]})` }}>
                                    <div className="label new">Mới</div>
                                    <ul className="product__hover">
                                        <li>
                                            <Link to={item.product_images[0]} className="image-popup">
                                                <span className="arrow_expand"></span>
                                            </Link>
                                        </li>
                                        <li><Link to="#"><span className="icon_bag_alt"></span></Link></li>
                                    </ul>
                                </div>
                                <div className="product__item__text">
                                    <h6 className='nameProduct'><Link to={`/shop/detail/${item._id}`}>{item.product_name}</Link></h6>
                                    <hr />
                                    <div className="product__price">{(item.product_discount ? (item.product_discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : (item.product_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>Vận chuyển nhanh chóng</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>Hỗ trợ đổi hàng hoàn tiền</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>Luôn có người trực hỗ trợ</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>Lắng nghe mọi góp ý từ khách hàng</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE SESSION END */}

            {/* IMSTAGRAM SESSION START */}

            <div className="instagram">
                <div className="container-fluid">
                    <div className="row">
                        <Swiper
                            // install Swiper modules
                            modules={[A11y]}
                            spaceBetween={50}
                            slidesPerView={6}
                            autoplay
                        >
                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://khunganh.net/wp-content/uploads/2018/08/khung-anh-vuong1-400x400.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://khunganh.net/wp-content/uploads/2018/08/khung-anh-10x15-1-320x320.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://khunganh.net/wp-content/uploads/2018/08/khung-anh-15x21-320x320.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://fairycorner.vn/wp-content/uploads/2020/11/13.11.2020..-300x300.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://fairycorner.vn/wp-content/uploads/2021/01/MG_9595-300x300.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://filebroker-cdn.lazada.vn/kf/S539f7bc58e4a4376b9191f0ba3fdadceM.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                            <div className="col-lg-2 col-md-4 col-sm-4 p-0">
                                <div className="instagram__item set-bg">
                                    <SwiperSlide><img src="https://khunganh.net/wp-content/uploads/2018/07/bo-7-khung-anh-treo-tuong-phong-khach-quan-cafe-KA703-1-320x320.jpg" alt="" /></SwiperSlide>
                                </div>
                            </div>

                          



                        </Swiper>
                    </div>
                </div>
            </div>

            {/* IMSTAGRAM SESSION END */}
        </>
    )
}

export default Home_component