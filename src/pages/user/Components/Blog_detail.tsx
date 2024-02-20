import React from 'react'

// IMG BLOG
import blog_detail from '../img/blog/details/blog-details.jpg'
import comment_1 from '../img/blog/details/comment-1.jpg'
import comment_2 from '../img/blog/details/comment-2.jpg'
import comment_3 from '../img/blog/details/comment-3.jpg'

import fp_1 from '../img/blog/sidebar/fp-1.jpg'
import fp_2 from '../img/blog/sidebar/fp-2.jpg'
import fp_3 from '../img/blog/sidebar/fp-3.jpg'

// IMG INSTA
import insta_1 from '../img/instagram/insta-1.jpg'
import insta_2 from '../img/instagram/insta-2.jpg'
import insta_3 from '../img/instagram/insta-3.jpg'
import insta_4 from '../img/instagram/insta-4.jpg'
import insta_5 from '../img/instagram/insta-5.jpg'
import insta_6 from '../img/instagram/insta-6.jpg'
import { Link } from 'react-router-dom'

type Props = {}

const Blog_detail = (props: Props) => {
    return (
        <>
            {/* Breadcrumb Begin */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to={'/'}><i className="fa fa-home" /> Trang chủ</Link>
                                <Link to={'/blog'}>Blog</Link>
                                <span>Đang được nhìn thấy: sự đa dạng về tuổi tác ảnh hưởng đến sự thay đổi trong thời trang và sắc đẹp như thế nào?</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* Blog Details Section Begin */}
            <section className="blog-details spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8">
                            <div className="blog__details__content">
                                <div className="blog__details__item">
                                    <img src={blog_detail} alt="" />
                                    <div className="blog__details__item__title">
                                        <span className="tip">Phong cách đường phố</span>
                                        <h4>Đang được nhìn thấy: sự đa dạng về tuổi tác ảnh hưởng đến sự thay đổi trong thời trang và sắc đẹp như thế nào?</h4>
                                        <ul>
                                            <li>Bởi <span>Ema Timahe</span></li>
                                            <li>Seb 17, 2019</li>
                                            <li>39 Comments</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__details__desc">
                                    <p>Một mùa thời trang có thể được định nghĩa bởi những người trên sàn catwalk cũng như bởi
                                        quần áo họ đang mặc. Khoảng thời gian này, một thời điểm quan trọng đã đến ở phần cuối của Marc Jacobs.
                                        buổi biểu diễn ở New York, khi một Christy Turlington gần như không trang điểm hiếm hoi trở lại
                                        sàn catwalk, ở tuổi 50 (cô ấy cũng đóng vai chính, với chính nhà thiết kế, trong quảng cáo AW của hãng
                                        chiến dịch), trong đó độ tuổi trung bình của người mẫu catwalk là khoảng 18.</p>
                                    <p>Vài ngày sau, Simone Rocha được cho là đã tăng tiền cược. Chương trình của người đàn ông 32 tuổi – một phần
                                        lấy cảm hứng từ Louise Bourgeois, người đã sống đến năm 98 tuổi – những người mẫu nổi bật ở độ tuổi 30
                                        và độ tuổi 40, bao gồm Jeny Howorth được yêu thích và diễn viên Chloë Sevigny.</p>
                                </div>
                                <div className="blog__details__tags">
                                    <Link to="#">Quần áo</Link>
                                    <Link to="#">Phong cách đường phố</Link>
                                    <Link to="#">Đa dạng</Link>
                                    <Link to="#">Sắc đẹp</Link>
                                </div>
                                <div className="blog__details__btns">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="blog__details__btn__item">
                                                <h6><Link to="#"><i className="fa fa-angle-left" />Các bài đăng trước</Link></h6>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="blog__details__btn__item blog__details__btn__item--next">
                                                <h6><Link to="#">Bài viết tiếp theo<i className="fa fa-angle-right" /></Link></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog__details__comment">
                                    <h5>3 Bình luận</h5>
                                    <Link to="#" className="leave-btn">Để lại bình luận</Link>
                                    <div className="blog__comment__item">
                                        <div className="blog__comment__item__pic">
                                            <img src={comment_1} alt="" />
                                        </div>
                                        <div className="blog__comment__item__text">
                                            <h6>La Toản</h6>
                                            <p>Sản phẩm rất tốt.</p>
                                            <ul>
                                                <li><i className="fa fa-clock-o" /> Ngày 12 tháng 5 năm 2023</li>
                                                <li><i className="fa fa-heart-o" /> 12</li>
                                                <li><i className="fa fa-share" /> 1</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog__comment__item">
                                        <div className="blog__comment__item__pic">
                                            <img src={comment_2} alt="" />
                                        </div>
                                        <div className="blog__comment__item__text">
                                            <h6>Thắm</h6>
                                            <p>Tuyệt vời, giao hàng nhanh gọn.</p>
                                            <ul>
                                                <li><i className="fa fa-clock-o" /> Ngày 12 tháng 2 năm 2023</li>
                                                <li><i className="fa fa-heart-o" /> 12</li>
                                                <li><i className="fa fa-share" /> 1</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="blog__comment__item">
                                        <div className="blog__comment__item__pic">
                                            <img src={comment_3} alt="" />
                                        </div>
                                        <div className="blog__comment__item__text">
                                            <h6>Khiêm</h6>
                                            <p>Rất nhiều mẫu mã tốt, đáng xem.</p>
                                            <ul>
                                                <li><i className="fa fa-clock-o" /> Ngày 12 tháng 2 năm 2023</li>
                                                <li><i className="fa fa-heart-o" /> 12</li>
                                                <li><i className="fa fa-share" /> 1</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="blog__sidebar">
                                <div className="blog__sidebar__item">
                                    <div className="section-title">
                                        <h4>Danh mục</h4>
                                    </div>
                                    <ul>
                                        <li><Link to="#">All <span>(250)</span></Link></li>
                                        <li><Link to="#">Quần áo</Link></li>
                                        <li><Link to="#">Phong cách đường phố</Link></li>
                                        <li><Link to="#">Đa dạng</Link></li>
                                        <li><Link to="#">Sắc đẹp</Link></li>
                                    </ul>
                                </div>
                                <div className="blog__sidebar__item">
                                    <div className="section-title">
                                        <h4>Bài đăng nổi bật</h4>
                                    </div>
                                    <Link to="#" className="blog__feature__item">
                                        <div className="blog__feature__item__pic">
                                            <img src={fp_1} alt="" />
                                        </div>
                                        <div className="blog__feature__item__text">
                                            <h6>Những người nổi tiếng...</h6>
                                            <span>Ngày 1 tháng 2 năm 2023</span>
                                        </div>
                                    </Link>
                                    <Link to="#" className="blog__feature__item">
                                        <div className="blog__feature__item__pic">
                                            <img src={fp_2} alt="" />
                                        </div>
                                        <div className="blog__feature__item__text">
                                            <h6>Người mẫu...</h6>
                                            <span>Ngày 12 tháng 7 năm 2023</span>
                                        </div>
                                    </Link>
                                    <Link to="#" className="blog__feature__item">
                                        <div className="blog__feature__item__pic">
                                            <img src={fp_3} alt="" />
                                        </div>
                                        <div className="blog__feature__item__text">
                                            <h6>Đáng chú ý...</h6>
                                            <span>Ngày 12 tháng 2 năm 2023</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="blog__sidebar__item">
                                    <div className="section-title">
                                        <h4>Tags cloud</h4>
                                    </div>
                                    <div className="blog__sidebar__tags">
                                        <Link to="#">Quần áo</Link>
                                        <Link to="#">Phong cách đường phố</Link>
                                        <Link to="#">Đa dạng</Link>
                                        <Link to="#">Sắc đẹp</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Details Section End */}
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

export default Blog_detail