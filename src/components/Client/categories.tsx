import { motion } from 'framer-motion';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { ICategories } from '../Admin/interfaces/categoriesArgs';
import { doApiGet, URL_API } from '../services/apiService';
import Header from './header';
import Loading from './loading';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';

interface CategoriesProps {

};

const ImgDiv = styled(motion.div)`
background-position: center;
background-size: cover;
height: 350px;
width: 300px;
display: flex;
justify-content: center;
align-items: center;
margin:16px;
border-radius: 20px;
/* border:2px solid purple; */
color:white;
cursor:pointer;
/* box-shadow: 5px 10px #888888;; */
`;

const categoriesImgs = [
    "/images/underShirt.png",
    "/images/Vshirt.png",
    "/images/buttoned.png",
    "/images/hoodies.png",
    "/images/Tshirts.png",
    "/images/polo.png",
];

const Categories: React.FC<CategoriesProps> = () => {
    let location = useLocation();
    let history = useHistory();
    let [catList, setCatList] = React.useState<ICategories[]>([])
    React.useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        let url = URL_API + `/categories?sort=_id&reverse=yes&perPage=6`
        let data = await doApiGet(url)
        console.log(data)
        setCatList(data);
    }
    return (
        <>
            {location.pathname === "/categories" || location.pathname === "/categories/"
                ?
                <Header />
                : null
            }
            <div className="container mt-5">
                {location.pathname === "/" || location.pathname === "/home" ?
                    null
                    :
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to={"/home"}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>Categories</Breadcrumb.Item>
                    </Breadcrumb>
                }
                <HR />
                <H2HR>
                    <SpanH2>
                        Categories
                    </SpanH2>
                </H2HR>
                {catList.length === 0 &&
                    <Loading />}
                <div className="col-12 d-flex justify-content-around align-items-center flex-wrap">
                    {catList.map((item, i) => {
                        return (
                            <>
                                <ImgDiv className="shadow" onClick={() => { history.push("/categories/single/" + item.s_id) }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.03 }} style={{ backgroundImage: `url(${categoriesImgs[i]})` }}>

                                    {i % 2 === 0 ?
                                        <h4 className="text-dark">
                                            {item.name}
                                        </h4>
                                        :
                                        <h4>
                                            {item.name}
                                        </h4>
                                    }
                                </ImgDiv>
                            </>
                        )
                    })}
                </div>
            </div>
            <ReactTooltip />
        </>
    )
}

export default Categories