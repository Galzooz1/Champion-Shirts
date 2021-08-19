import { motion } from 'framer-motion';
import React from 'react';
import { Button, DropdownButton, Image, Nav, NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { ICategories } from '../Admin/interfaces/categoriesArgs';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import Login from './login';
import './css/header.css';
import { IUsers } from '../Admin/interfaces/users';
import UserIcon from '../../assets/user.png';
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
justify-content: center;
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
    visible: {opacity: 1, x:0},
    hidden: {opacity: 0, x:20}
}

const Header: React.FC<HeaderProps> = () => {
    let history = useHistory();
    let [categoriesAr, setCategoriesAr] = React.useState<ICategories[]>([]);
    let [userInfo, setUserInfo] = React.useState<IUsers>();
    let [isSearchBox, setIsSearchBox] = React.useState<boolean>(false);
    let searchRef = React.useRef<any>();
    let toggleRef = React.useRef<any>();


    React.useEffect(() => {
        getCategoriesData();
        if (localStorage["token"]) {
            getUserData();
        }
    }, []);

    const getCategoriesData = async () => {
        let url = URL_API + `/categories?sort=_id&reverse=yes&perPage=200`
        let data = await doApiGet(url);
        console.log(data);
        setCategoriesAr(data);
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

    // const CustomDropDownToggle = React.forwardRef(({ children }, ref) => (
    //     <a
    //       href=""
    //       ref={toggleRef}
    //     //   onClick={e => {
    //     //     e.preventDefault();
    //     //     onClick(e);
    //     //   }}
    //     >
    //       {/* Render custom icon here */}
    //       &#x25bc;
    //       {userInfo?.avatar_img}
    //     </a>
    //   ));
    return (
        <>
            <HeaderDiv className="bg-dark container-fluid text-white py-2">
                <div>
                    <div className="d-flex justify-content-around">
                        <div onClick={() => history.push("/home")} className="logo">
                            <HeaderH2>Champion</HeaderH2>
                        </div>
                        <IconsDiv className="icons">
                            {isSearchBox ?
                                <div className="container d-flex justify-content-center">
                                    <motion.div transition={{duration:0.5, delay:0.2}} variants={backdrop} animate="visible" initial="hidden" className="input-group col-sm-7 input-group-lg">
                                        <SearchInput transition={{ duration: 0.7, delay: 0.2 }} initial={{ x: -300 }} animate={{ x: 0 }} onKeyDown={(evt) => {
                                            if (evt.key === "Enter") {
                                                onSearchClick()
                                            }
                                        }} ref={searchRef} style={{ borderRadius: "40px 0 0 40px" }} type="text" className="form-control h-75" />
                                        <div style={{ marginRight: "2px" }} className="input-group-append">
                                            <span onClick={handleSearchBox} style={{ borderRadius: "0 40px 40px 0", cursor: "pointer", border: "1px solid #fa316796" }} className="h-75 input-group-text">
                                                {searchIcon()}
                                            </span>
                                        </div>
                                    </motion.div>
                                </div>
                                :
                                <motion.div transition={{duration:0.5, delay:0.2}} variants={backdrop} animate="visible" initial="hidden" className="p-1 rounded-circle" style={{ cursor: "pointer", border: "1px dashed rgb(250, 49, 101)" }} whileHover={{ border: "1px solid rgb(250, 49, 101)", scale: 1.1 }} onClick={handleSearchBox}>{searchIcon()}</motion.div>
                            }
                            {/* <input type="text" classNameName="form-control" /> */}
                            {/* // <div onClick={handleSearchBox}>aaa</div> */}
                            {(!localStorage["token"]) ?
                                <Login />
                                :
                                <button onClick={onLogOut} className="btn btn-outline-danger mx-4">
                                    LogOut
                                </button>
                            }
                            {/* <Navbar>
                                <Nav>
                                    <DropdownMenu
                                    >
                                        <DropdownItem eventKey='1'><i className="fa fa-envelope fa-fw"></i> User Profile</DropdownItem>
                                        <DropdownItem eventKey='2'><i className="fa fa-gear fa-fw"></i> Settings</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem eventKey='3'><i className="fa fa-sign-out fa-fw"></i> Logout</DropdownItem>
                                    </DropdownMenu>
                                </Nav>
                            </Navbar> */}
                            {/* <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <img src={UserIcon} alt="user" width="37px" height="37px" />

                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                            {userInfo?.avatar_img ?
                                // <div className="dropdown">
                                //     </button>
                                //     <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                //         <li><Link className="dropdown-item" to="/admin">Admin</Link></li>
                                //     </ul>

                                <div className="p-1 border rounded-circle">
                                    <img src={userInfo?.avatar_img.includes("http") ? userInfo?.avatar_img : URL_API + userInfo?.avatar_img + "?" + Date.now()} alt={userInfo?.firstName} width="37px" height="37px" className="rounded-circle" />
                                </div>
                            :
                            <div className="p-1 border rounded-circle">
                                <img src={UserIcon} alt="user" width="37px" height="37px" />
                            </div>
                            }
                        </IconsDiv>
                    </div>
                </div>
            </HeaderDiv>
            <Navbar style={{ position: "sticky", top: 0 }} className="Navbar container-fluid d-flex justify-content-center" fixed="top" variant="light" expand="lg">
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

const searchIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-search m-1" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
    )
}

export default Header