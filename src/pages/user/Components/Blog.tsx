import React from 'react'

// IMG BLOG
import blog_1 from '../img/blog/blog-1.jpg'
import blog_2 from '../img/blog/blog-2.jpg'
import blog_3 from '../img/blog/blog-3.jpg'
import blog_4 from '../img/blog/blog-4.jpg'
import blog_5 from '../img/blog/blog-5.jpg'
import blog_6 from '../img/blog/blog-6.jpg'
import blog_7 from '../img/blog/blog-7.jpg'
import blog_8 from '../img/blog/blog-8.jpg'
import blog_9 from '../img/blog/blog-9.jpg'
import blog_10 from '../img/blog/blog-10.jpg'

// IMG INSTA
import insta_1 from '../img/instagram/insta-1.jpg'
import insta_2 from '../img/instagram/insta-2.jpg'
import insta_3 from '../img/instagram/insta-3.jpg'
import insta_4 from '../img/instagram/insta-4.jpg'
import insta_5 from '../img/instagram/insta-5.jpg'
import insta_6 from '../img/instagram/insta-6.jpg'

import { Link } from 'react-router-dom'

type Props = {}

const Blog = (props: Props) => {
    return (
        <>
            <div>
                {/* Breadcrumb Begin */}
                <div className="breadcrumb-option">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="breadcrumb__links">
                                    <Link to={'/'}><i className="fa fa-home" /> Trang chủ</Link>
                                    <span>Blog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Blog Section Begin */}
                <section className="blog spad">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic large__item set-bg" style={{ backgroundImage: `url(${blog_1})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Không có máu xấu! Lý do tại sao Tamr Judge cuối cùng đã làm lành với...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_7})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Bữa tiệc nồi! Xem Farrah Abraham Khoe Thân Hút Thuốc Tại...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_9})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">CMT Awards 2019 xuất hiện trên thảm đỏ Carrie Underwood, Sheryl...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_2})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Những người nổi tiếng trên thảm đỏ Amf Cannes Kendall Jenner, Pamela...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_4})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Ireland Baldwin khoe hình xăm Ilse Valfre thời thượng tại Stagecoach...</Link>
                                        </h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_8})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Kim Kardashian bước ra Paris với bộ trang phục lấp lánh gây sốc...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_10})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Trận chiến hạng A! Angelina Jolie &amp; Lady Gaga tranh giành ai...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-6">
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_3})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Gigi Hadid, Rita Ora, Serena &amp; Những người nổi tiếng hấp dẫn khác gây choáng vào năm 2019...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic set-bg" style={{ backgroundImage: `url(${blog_5})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">
                                            Giải thưởng âm nhạc Billboard: Hay nhất, Tệ nhất &amp; Những bộ váy kỳ quặc nhất trên...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="blog__item">
                                    <div className="blog__item__pic large__item set-bg" style={{ backgroundImage: `url(${blog_6})` }} />
                                    <div className="blog__item__text">
                                        <h6><Link to="#">Stephanie Pratt Lộ Diện Bộ Bikini Đen Trẻ Trung Trong...</Link></h6>
                                        <ul>
                                            <li>by <span>Ema Timahe</span></li>
                                            <li>Ngày 1 tháng 2 năm 2023</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 text-center">
                                <Link to="#" className="primary-btn load-btn">Tải thêm bài viết</Link>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Blog Section End */}
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
            </div >
        </>
    )
}

export default Blog