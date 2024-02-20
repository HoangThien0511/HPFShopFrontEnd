import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import { Input, Menu, message, Form } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/firebase'
import { useEffect, useState } from 'react';
import { isAuthenticate } from '../../../utils/LocalStorage';
import logo2 from "../img/logo2.png";
import { Dropdown } from 'antd';
import instance, { instanceSearch } from '../../../api_slice/port';
import { useDispatch } from 'react-redux';
import { dataSearch } from '../../../api_slice/api_search';


type Props = {}



const Header_component = (props: Props) => {
    const users = isAuthenticate();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const [open, setOpen] = useState(false);
    const [ismolDal, setIsModal] = useState();
    const [cartItems, setCartItems] = useState<any>([]);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch()


    const handleSearch = async () => {
        try {
            const response = await instanceSearch.get(`/product?name=${searchTerm}`);
            dispatch(dataSearch(response))
            setSearchResults(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);




    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
            const items = snapshot.docs.map((doc) => doc.data());
            setCartItems(items);
        });

        return () => unsubscribe();
    }, []);

    const totalQuantity = cartItems.reduce((acc: any, item: any) => acc + item.quantity, 0);

    const showModal = (e: any) => {
        setOpen(true);
        setIsModal(e.target.getAttribute("data"));
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        message.success("Đăng xuất thành công!", 2);
        navigate("/");
        window.location.reload()
        setAuth(false);
    };

    const handleCart = () => {
        const user = isAuthenticate();
        if (!user) {
            message.success("Bạn chưa tiến hành đăng nhập vào hệ thống!", 2);
            navigate("/signin");
        } else {
            navigate("/shop-cart");
        }
    }

    const handleUser = () => {
        const user = isAuthenticate();
        if (!user) {
            console.log(1234);
            message.success("Bạn chưa tiến hành đăng nhập vào hệ thống!", 2);
            navigate("/signin");
        }
    }


    const checckAuth = () => {
        if (users?.role === 1) {
            return (
                <Link
                    className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px] text-black"
                    to="/admin"
                >
                    Admin
                </Link>
            );
        } else {
            return null;
        }
    };
    const menu = (
        <Menu
            items={[
                {
                    key: "1",
                    label: (
                        <Link
                            className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
                            to="info/account"
                        >
                            Hồ sơ của tôi
                        </Link>
                    ),
                },
                {
                    key: "2",
                    label: (
                        <Link
                            className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
                            to="/order-history"
                        >
                            Lịch sử đặt hàng
                        </Link>
                    ),
                },
                {
                    key: "3",
                    label: checckAuth(),
                },
                {
                    key: "4",
                    label: (
                        <Link
                            className="text-[5px] md:text-[8px] lg:text-[15px] xl:text-[15px] 2xl:text-[15px] w-[50px] mr-[30px]"
                            to="/"
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Link>
                    ),
                },
            ]}
        />
    );

    useEffect(() => {
        const user = isAuthenticate();
        if (user) {
            setAuth(true);
            setUser(user);
        }
    }, []);



    const onHandleCloseModal = () => {
        setOpen(false);
    };

    const handleButtonClick = () => {
        setShowInput(true);
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleInputBlur = () => {
        setShowInput(false);
        // Xử lý logic tìm kiếm dựa trên giá trị `inputValue` ở đây
    };


    return (
        <>
            {/* <!-- Offcanvas Menu Begin --> */}
            <div className="offcanvas-menu-overlay"></div>
            <div className="offcanvas-menu-wrapper">
                <div className="offcanvas__close">+</div>
                <ul className="offcanvas__widget">
                    <li><span className="icon_search search-switch"></span></li>
                    <li><Link to="#"><span className="icon_heart_alt"></span>
                        <div className="tip">2</div>
                    </Link></li>
                    <li><Link to="#"><span className="icon_bag_alt"></span>
                        <div className="tip">2</div>
                    </Link></li>
                </ul>
                <div className="offcanvas__logo" style={{ width: '98px' }}>
                    <Link to="./index.html">
                        <img   src=" /public/image/unnamed (7).png"></img>
                    </Link>
                </div>
                <div id="mobile-menu-wrap"></div>
                <div className="offcanvas__auth">
                    <Link to="#">Đăng nhập</Link>
                    <Link to="#">Đăng kí</Link>
                </div>
            </div>
            {/* <!-- Offcanvas Menu End --> */}

            {/* <!-- Header Section Begin --> */}
            <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-2 col-lg-2">
                            <div className="header__logo" style={{ width: '150px', marginLeft: '140px' }}>
                                <Link to={'/'}>
                                    <img src="/public/image/unnamed (7).png"></img></Link>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-5">
                            <nav className="header__menu">
                                <ul style={{ display: "flex", justifyContent: "center", marginLeft: '140px' }}>
                                    <li><Link to={'/'}>Trang chủ</Link></li>
                                    <li><Link to={'/shop'}>Cửa hàng</Link></li>
                                    <li><Link to="/contact">Liên hệ</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className='col-lg-4' style={{ marginLeft: '-120px' }}>
                            {auth ? (
                                <div
                                    className="header__right"
                                >
                                    <ul className="header__right__widget" style={{ marginTop: '15px' }}>
                                        <li>
                                            <div style={{ display: 'flex' }}>
                                                <Form.Item
                                                // rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]}
                                                >
                                                    <Input
                                                        style={{ position: 'relative', borderRadius: '50px' }}
                                                        values={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className='input' placeholder="Tìm kiếm"
                                                        onClick={() => navigate('/shop')}
                                                    />
                                                </Form.Item>
                                                <li style={{ position: 'absolute', marginLeft: '155px' }}><SearchOutlined /></li>
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/shop-cart"><span className="icon_bag_alt"></span>
                                            </Link>
                                            {/* {totalQuantity > 0 && <div className="tip">{totalQuantity}</div>} */}

                                        </li>
                                        <Dropdown overlay={menu} placement="bottom">
                                            <li className='svg_user' ><Link to="#"><UserOutlined />
                                            </Link>
                                            </li>
                                        </Dropdown>
                                    </ul>
                                </div>

                            ) : (
                                <div className="header__right">
                                    <div className="header__right__widget" style={{ marginTop: '15px' }}>
                                        <div className="header__right__auth">
                                            <Link to="/signin" data-custom="signin" onClick={showModal}>Đăng Nhập</Link>
                                            <Link to="/signup" data-custom="signup" onClick={showModal}>Đăng Ký</Link>
                                        </div>
                                        <ul className="header__right__widget">
                                            <div style={{ display: 'flex' }}>
                                                <Form.Item
                                                // rules={[{ required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' }]}
                                                >
                                                    <Input
                                                        style={{ position: 'relative', borderRadius: '50px' }}
                                                        values={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                        className='input' placeholder="Tìm kiếm"
                                                        onClick={() => navigate('/shop')} />
                                                </Form.Item>
                                                <li style={{ position: 'absolute', marginLeft: '155px' }}><SearchOutlined /></li>
                                            </div>

                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="canvas__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header >
            {/* Header Section End */}
        </>
    );
};

export default Header_component