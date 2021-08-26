import { motion } from 'framer-motion';
import React from 'react';
import { Button, Dropdown, DropdownButton, Image, Nav, NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { ICategories } from '../Admin/interfaces/categoriesArgs';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import Login from './login';
import './css/header.css';
import { IUsers } from '../Admin/interfaces/users';
import UserIcon from '../../assets/user.png';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import CartSide from './cartSide';
import AuthUser from './authUser';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { ReactComponent as MoonSVG } from '../../assets/moon.svg';
// import DropdownMenu from 'react-bootstrap/lib/DropdownMenu';
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';


interface HeaderProps {

};

const HeaderDiv = styled.header`
background-color:#212529;
padding: 32px;
/* display: flex; */
/* justify-content: space-around; */
/* align-items: center; */
`;

const IconsDiv = styled.div`
width: 500px;
display: flex;
justify-content: flex-end;
align-items: center;
/* padding: 8px; */
`;

const HeaderH2 = styled.h2`
font-family:"Black Emerald";
font-weight: 900;
font-size: 72px;
z-index:999;
transition:0.6s ease-in-out;
cursor:pointer;
&:hover{
    transform: scale(1.03);
    color:#fa316796;
}
`;

const SearchInput = styled(motion.input)`
    border-right: 0 !important;
    border-left: 0 !important;
    border:2px solid #fa316796;
    &:focus{
    color: #495057;
    background-color: #fff;
    border-color: #ced4da;
    outline: 0;
    box-shadow: 0 0 0 0 !important
    }
`;

const backdrop = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 20 }
}

const Header: React.FC<HeaderProps> = () => {
    let carts_ar = useSelector<RootStateOrAny, IReadyproducts[]>(myStore => myStore.carts_ar);
    let wish_ar = useSelector<RootStateOrAny, IReadyproducts[]>(myStore => myStore.wish_ar);
    let history = useHistory();
    let [categoriesAr, setCategoriesAr] = React.useState<ICategories[]>([]);
    let [userInfo, setUserInfo] = React.useState<IUsers>();
    let [isSearchBox, setIsSearchBox] = React.useState<boolean>(false);
    let searchRef = React.useRef<any>();
    let [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
    let [isWishOpen, setIsWishOpen] = React.useState<boolean>(false);
    let [isAdmin, setIsAdmin] = React.useState<boolean>(false);
    let toggleRef = React.useRef<any>();
    let dispatch = useDispatch()



    React.useEffect(() => {
        console.log("Wish: ", wish_ar);
        console.log("Cart: ", carts_ar);
        // dispatch({type:"RESET_CARTS", carts_ar:[]})
        // dispatch({type:"RESET_WISH", wish_ar:[]})
        // dispatch({type:"UPDATE_IS_WISH", flag: false})
        getCategoriesData();
        checkIfAdmin();
        if (localStorage["token"]) {
            getUserData();
        }
    }, [localStorage]);

    const getCategoriesData = async () => {
        let url = URL_API + `/categories?sort=_id&reverse=yes&perPage=200`
        let data = await doApiGet(url);
        console.log(data);
        setCategoriesAr(data);
    }

    const checkIfAdmin = async () => {
        let url = URL_API + "/users/checkAdmin";
        let data = await doApiMethod(url, "POST", {});
        if (data.auth === "success") {
            setIsAdmin(true);
        }
    }

    const onLogOut = () => {
        // log out the user by delete the token
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        history.push("/home");
        toast.error("You logged out!");
    }

    const handleSearchBox = () => {
        setIsSearchBox(wasSearchBox => !wasSearchBox);
    }

    const onSearchClick = () => {
        let searchQ = searchRef.current.value;
        let url = "/search/?q=" + searchQ;
        if (searchQ.length > 0) {
            history.push(url);
        }
    }

    const getUserData = async () => {
        let url = URL_API + "/users/myInfo";
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUserInfo(data);
    }

    const toggleCart = () => {
        setIsCartOpen(wasCartOpen => !wasCartOpen);
        if (!isCartOpen) {
            dispatch({ type: "SHOW_HIDE_CART", flag: true })
        } else {
            dispatch({ type: "SHOW_HIDE_CART", flag: false })
        }
    }

    const toggleHeart = () => {
        setIsWishOpen(wasWishOpen => !wasWishOpen);
        if (!isWishOpen) {
            dispatch({ type: "SHOW_HIDE_WISH", flag: true })
        } else {
            dispatch({ type: "SHOW_HIDE_WISH", flag: false })
        }
    }

    const delFromWish = (item: IReadyproducts) => {
        if (window.confirm("Are you sure you want to delete " + item.product_name + "?")) {
            item.count = 0;
            dispatch({ type: "UPDATE_THE_WISH", data: item })
            deleteFromDB(item.s_id);
        }
    }

    const deleteFromDB = async (s_id: number) => {
        let url = URL_API + "/readyProducts/" + s_id;
        await doApiMethod(url, "DELETE", {});
    }

    return (
        <>
            <HeaderDiv className="bg-dark container-fluid text-white py-2">
                <div>
                    <div className="d-flex justify-content-between col-lg-12">
                        <div onClick={() => history.push("/home")} className="logo col-lg-3">
                            <HeaderH2>Champion</HeaderH2>
                        </div>
                        <CartSide />
                        <AuthUser />
                        <IconsDiv className="icons w-75">
                            {isSearchBox ?
                                <div className="d-flex justify-content-center col-lg-3 me-4 mt-3">
                                    <motion.div transition={{ duration: 0.5, delay: 0.2 }} variants={backdrop} animate="visible" initial="hidden" className="input-group col-sm-7 input-group-lg">
                                        <SearchInput placeholder="Enter to Search..." transition={{ duration: 0.7, delay: 0.2 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onKeyDown={(evt) => {
                                            if (evt.key === "Enter") {
                                                onSearchClick()
                                            }
                                        }} ref={searchRef} style={{ borderRadius: "40px 0 0 40px", fontSize: "16px" }} type="text" className="form-control h-75" />
                                        <div style={{ marginRight: "2px" }} className="input-group-append">
                                            <span onClick={handleSearchBox} style={{ borderRadius: "0 40px 40px 0", cursor: "pointer", border: "1px solid #fa316796" }} className="h-75 input-group-text">
                                                <i className="fa fa-times-circle" style={{ color: "#7c1833c3" }} aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                                :
                                <motion.div data-tip="Search for Anything" transition={{ duration: 0.3 }} variants={backdrop} animate="visible" initial="hidden" className="p-1 mt-1 me-4 rounded-circle" style={{ cursor: "pointer" }} whileHover={{ color: "#fa316796", scale: 1.1 }} onClick={handleSearchBox}>
                                    {searchIcon()}
                                </motion.div>
                            }
                            <div>
                                <MoonSVG fill="black" stroke="red" width="100" height="100" />
                            </div>
                            <motion.div whileHover={{ scale: 1.1 }} className="mx-2 d-flex justify-content-center justify-content-lg-end align-items-center ms-4 my-2 my-lg-0">
                                {(carts_ar.length > 0) ?
                                    <h3 className="cart_header_icon me-2 text-warning" style={{ cursor: "pointer" }} onClick={() => { toggleCart() }}>
                                        {cartIcon()}
                                        <div className="badge bg-danger" style={{ fontSize: "0.45em" }}>
                                            {cartTotal(carts_ar)}
                                        </div>
                                    </h3>
                                    :
                                    <div style={{ cursor: "pointer" }} className="text-warning" data-tip="Your Cart Is Empty">
                                        {cartIcon()}
                                    </div>
                                }
                            </motion.div>
                            <>
                                {wish_ar.length > 0 ?
                                    <Dropdown className="mb-1 mx-5">
                                        <Dropdown.Toggle className="rounded-circle bg-dark px-1 border-0" variant="light" id="dropdown-basic">
                                            <motion.div whileHover={{ scale: 1.1 }} onClick={toggleHeart} style={{ position: "relative" }}>
                                                <div className="badge bg-danger" style={{ fontSize: "0.7em", position: "absolute", top: "18px", left: "-10px" }}>
                                                    {cartTotal(wish_ar)}
                                                </div>
                                                {heartIcon()}
                                            </motion.div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {wish_ar.map((item, i) => {
                                                return (
                                                    <>
                                                        <tbody className="d-flex justify-content-between">
                                                            <Dropdown.Item disabled>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div style={{ fontSize: "1.2em" }} className="fw-bold text-dark me-3">
                                                                        {item.product_name}
                                                                    </div>
                                                                    <button data-tip={`${item.color}`} disabled style={{ backgroundColor: `${item.color}`, width: "20px", height: "20px" }} className="border rounded-circle shadow mt-1">
                                                                    </button>
                                                                    <div className="mx-4 text-dark fw-bold">{item.size}</div>
                                                                    <div className="fw-bold text-dark">{item.price.toFixed(2)}$</div>
                                                                    {/* <img src={item.images.frontImage.image} alt={item.product_name} width="20" /> */}
                                                                </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item style={{width:"15%"}} className="d-flex justify-content-end">
                                                                <button onClick={() => { delFromWish(item) }} className="btn btn-danger">
                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                </button>
                                                            </Dropdown.Item>
                                                        </tbody>
                                                            {(wish_ar.length > 0 && (i != wish_ar.length-1)) &&
                                                                <Dropdown.Divider />
                                                            }
                                                    </>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    :
                                    <motion.div className="mx-5 me-4" data-tip="Add Some Favourites" whileHover={{ scale: 1.1 }} onClick={toggleHeart} style={{ position: "relative", cursor: "pointer" }}>
                                        {heartIcon()}
                                    </motion.div>
                                }
                            </>
                            {(!localStorage["token"]) &&
                                <div className="mt-1">
                                    <Login />
                                </div>
                            }
                            {localStorage["token"] &&
                                <Dropdown className="mt-1">
                                    <Dropdown.Toggle className="rounded-circle bg-dark px-1 py-1 mx-2 me-5" variant="light" id="dropdown-basic">
                                        <motion.div whileHover={{ scale: 1.1 }}>
                                            {userInfo?.avatar_img ?
                                                <img src={userInfo?.avatar_img.includes("http") ? userInfo?.avatar_img : URL_API + userInfo?.avatar_img + "?" + Date.now()} alt={userInfo?.firstName} width="37px" height="37px" className="rounded-circle" />
                                                :
                                                <img src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" className="bg-light rounded-circle border" alt="user" width="37px" height="37px" />
                                            }
                                        </motion.div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => {history.push("/user/" + userInfo?._id)}}>My Info</Dropdown.Item>
                                        <Dropdown.Item onClick={() => {history.push("/selfdesigns/" + userInfo?._id)}}>My Designed Products</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        <Dropdown.Divider />

                                        <Dropdown.Item onClick={onLogOut}>
                                            <button onClick={onLogOut} className="btn btn-outline-danger btn-sm">
                                                LogOut
                                            </button>
                                        </Dropdown.Item>
                                        {isAdmin &&
                                            <>
                                                <Dropdown.Divider />
                                                <Dropdown.Item href="/admin">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Link to="/admin" className="btn btn-warning btn-sm">
                                                            Admin Panel
                                                        </Link>
                                                        <i className="fas fa-crown fa-lg text-warning"></i>
                                                    </div>
                                                </Dropdown.Item>
                                            </>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                        </IconsDiv>
                    </div>
                </div>
            </HeaderDiv>
            <Navbar /*style={{ position: "sticky", top: 0 }}*/ className="Navbar container-fluid d-flex justify-content-center" variant="light" expand="lg">
                <Container className="container-fluid">
                    {/* <Navbar.Brand href="#home"><Link className="text-white text-white text-decoration-none" to="/">Home</Link></Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav style={{ color: "whitesmoke", fontSize: "20px" }} className="d-flex justify-content-around w-25 mx-auto">
                            <Nav.Link><Link className="text-dark text-decoration-none me-5" to="/">Home</Link></Nav.Link>
                            <NavDropdown className="text-dark" title={"Categories"} id="collasible-nav-dropdown">
                                {categoriesAr.map((item, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <NavDropdown.Item onClick={() => { history.push("/categories/single/" + item.s_id) }}>{item.name}</NavDropdown.Item>
                                        </React.Fragment>
                                    )
                                })}
                            </NavDropdown>
                            <Nav.Link href="#link"><Link className="text-dark text-decoration-none mx-5" to="/">About</Link></Nav.Link>
                            <Nav.Link href="#link"><Link className="text-dark text-decoration-none" to="/">Contact</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <nav className="container-fluid p-3 bg-primary">
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {categoriesAr.map((item, i) => {
                            return (
                                <li><Link className="text-white dropdown-item" key={i} to={"/categories/single/" + item.s_id}>{item.name}</Link></li>
                            )
                        })}
                    </ul>
                </div>
            </nav> */}
        </>
    )
}

// מחשב כמה מוצרים יש בסהכ בעגלה
const cartTotal = (carts_ar: any) => {
    let total = 0;
    // carts_ar.map((item: any) => {
    total += carts_ar.length;
    // })
    return total;
}

const searchIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search m-1" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
    )
}

const cartIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
    )
}

const heartIcon = () => {
    return (
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="red" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" /></svg>
    )
}

export default Header