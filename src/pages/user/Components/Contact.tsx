import React from 'react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom'

type Props = {}

const Contact = (props: Props) => {
    return (
        <div>
            <div>
                {/* Breadcrumb Begin */}
                <div className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__links">
                                    <Link to={'/'}><i className="fa fa-home" /> Trang chủ</Link>
                                    <span>Liên hệ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Contact Section Begin */}
                <section className="contact spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="contact__content">
                                    <div className="contact__address">
                                        <h5>Thông tin liên hệ</h5>
                                        <ul>
                                            <li>
                                                <h6><i className="fa fa-map-marker" /> Địa chỉ</h6>
                                                <p>Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng 550000</p>
                                            </li>
                                            <li>
                                                <h6><i className="fa fa-phone" /> Điện thoại:</h6>
                                                <p><span>0905 222 529</span></p>
                                            </li>
                                            <li>
                                                <h6><i className="fa fa-headphones" />Email</h6>
                                                <p>hpfshop@gmail.com</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="contact__form">
                                        <h5>Góp ý liên hệ</h5>
                                        <form action="#">
                                            <input type="text" placeholder="Họ và tên" />
                                            <input type="text" placeholder="Số điện thoại" />
                                            <textarea placeholder="Nội dung" defaultValue={""} />
                                            <button type="submit" className="site-btn">Gửi tin nhắn</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="contact__map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29799.804421933488!2d105.79939550180853!3d20.993617073043033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac927ce95957%3A0xe230355f8983adb9!2sThanh%20Xu%C3%A2n%2C%20Hanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1681109282750!5m2!1sen!2s" height={780} style={{ border: 0 }} allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Section End */}
                {/* Instagram Begin */}
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
                {/* Instagram End */}
            </div >
        </div >
    )
}

export default Contact