import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ICategories } from '../Admin/interfaces/categoriesArgs';
import { doApiGet, URL_API } from '../services/apiService';
import Login from './login';

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
width: 200px;
display: flex;
justify-content: space-around;
align-items: center;
/* padding: 8px; */
`;

const Header: React.FC<HeaderProps> = () => {
    let [categoriesAr, setCategoriesAr] = React.useState<ICategories[]>([]);

    React.useEffect(() => {
        getCategoriesData()
    }, []);

    const getCategoriesData = async () => {
        let url = URL_API + `/categories?sort=_id&reverse=yes&perPage=200`
        let data = await doApiGet(url);
        console.log(data);
        setCategoriesAr(data);
    }

    return (
        <>
            <HeaderDiv className="bg-dark container-fluid text-white py-2">
                <div>
                    <div className="d-flex justify-content-around">
                        <div className="logo">
                            logo
                        </div>
                        <IconsDiv className="icons">
                            icons
                            <Login />
                        </IconsDiv>
                    </div>
                </div>
            </HeaderDiv>
            <Navbar className="container-fluid d-flex justify-content-center" sticky="top" bg="danger" expand="lg">
                <Container className="container-fluid">
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav style={{color:"whitesmoke"}} className="d-flex justify-content-around w-25 mx-auto">
                            <Nav.Link><Link className="text-white" to="/">Home</Link></Nav.Link>
                            <Nav.Link className="text-white" href="#link"><Link className="text-white" to="/">Link</Link></Nav.Link>
                            <NavDropdown className="text-white" title="Categories" id="basic-nav-dropdown">
                            {categoriesAr.map((item, i) => {
                            return (
                                <NavDropdown.Item><Link className="dropdown-item" key={i} to={"/categories/single/" + item.s_id}>{item.name}</Link></NavDropdown.Item>
                            )
                        })}
                            </NavDropdown>
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

export default Header