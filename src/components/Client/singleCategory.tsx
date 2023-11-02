import { motion } from 'framer-motion';
import React from 'react';
import { Breadcrumb, OverlayTrigger, Tooltip, TooltipProps } from 'react-bootstrap';
import { Omit, BsPrefixProps } from 'react-bootstrap/esm/helpers';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { ICategories } from '../Admin/interfaces/categoriesArgs';
import { Amount, IProdItems, Property } from '../Admin/interfaces/prodItems';
import { doApiGet, URL_API } from '../services/apiService';
import FilterForm from './filterForm';
import Footer from './footer';
import Header from './header';
import Loading from './loading';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';
import { DesignedH2, DesignedLine } from './userPanel';

interface SingleCategoryParams {
    s_id: string;
};

type SingleCategoryProps = RouteComponentProps<SingleCategoryParams>

export const WrapperDiv = styled(motion.div)`
/* margin:16px; */
border-radius: 5px;
/* padding-bottom: 8px; */
cursor:pointer;
`;

const CleanWrapperDiv = styled(motion.div)`
/* min-height: 300px; */
height:100%;
width:90%;
margin:16px;
border-radius: 5px;
padding-bottom: 8px;
cursor:pointer;
display: flex;
justify-content: space-between;
align-items: center;
background: linear-gradient(92.21deg, #487686 28.52%, rgba(69, 108, 121, 0) 85.99%);
`;

const CleanH2 = styled.h2`
display: flex;
justify-content: center;
color:white;
width:70%;
font-family: Poppins;
font-size: 77px;
font-style: normal;
font-weight: 300;
line-height: 116px;
letter-spacing: 0.05em;
text-align: left;
`;

const SingleCategory: React.FC<SingleCategoryProps> = (props) => {
    let history = useHistory();
    let [categoryData, setCategoryData] = React.useState<Partial<ICategories>>({});
    let [productsData, setProductsData] = React.useState<Partial<IProdItems[]>>([]);
    React.useEffect(() => {
        getSingleCatData();
        getProductsData();
    }, [])

    const getSingleCatData = async () => {
        let url = URL_API + "/categories/single/" + props.match.params.s_id;
        let data = await doApiGet(url);
        setCategoryData(data);
    }

    const getProductsData = async () => {
        let url = URL_API + "/products?category=" + props.match.params.s_id + "&page=0&sort=isClean&reverse=yes&perPage=10";
        let data = await doApiGet(url);
        setProductsData(data);
    }

    const renderTooltip = (props: any, color: any) => (
        <Tooltip {...props}>{color}</Tooltip>
    )

    return (
        <>
            <Header />
            <div className="d-flex">
                <div className="container mt-5">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{categoryData?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <DesignedH2>{categoryData?.name}</DesignedH2>
                <DesignedLine>
                </DesignedLine>
                    {productsData.length === 0 &&
                        <Loading />}
                    <div className="d-flex flex-wrap">
                        {productsData.map((item, i) => {
                            return (
                                <>
                                    {item?.isClean &&
                                        <>
                                            <CleanWrapperDiv onClick={() => { history.push("/product/clean/" + item?.s_id) }} transition={{duration:0.4}} whileHover={{scale:1.01}}>
                                                <CleanH2>Design <span className="fw-bold ms-4">Now!</span></CleanH2>
                                                <WrapperDiv style={{position:"relative", top:"-5px"}}>
                                                    {item?.image?.includes("http") ?
                                                        <img src={item?.image} alt={item?.name} height="350px" width="100%" />
                                                        :
                                                        <img src={URL_API + item?.image + "?" + Date.now()} height="350px" width="100%" alt={item?.name} />
                                                    }
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <h3 className="me-3">{item?.name}</h3>
                                                        <h4>{item?.price.toFixed(2)} $</h4>
                                                    </div>
                                                    <div className="d-flex justify-content-center">
                                                        {item?.properties.map((prop, i) => {
                                                            return (
                                                                <>
                                                                    <motion.div className="p-2 text-start d-flex flex-wrap justify-content-around">
                                                                        <div className="w-100 d-flex justify-content-center">
                                                                            <OverlayTrigger delay={{ show: 250, hide: 200 }} placement="left-start" overlay={renderTooltip(props, prop.color)}>
                                                                                <button className="border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${prop?.color}`, width: "30px", height: "30px" }} data-tip={`${prop?.color}`}></button>
                                                                            </OverlayTrigger>
                                                                        </div>
                                                                    </motion.div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </WrapperDiv>
                                            </CleanWrapperDiv>
                                        </>
                                    }
                                    {!item?.isClean &&
                                        <WrapperDiv transition={{ duration: 0.4 }} onClick={() => { history.push("/product/" + item?.s_id) }} className="col-lg-3 mx-5 border rounded-1 my-5">
                                            {item?.image?.includes("http") ?
                                                <img src={item?.image} alt={item?.name} height="350px" width="100%" />
                                                :
                                                <img src={URL_API + item?.image + "?" + Date.now()} height="350px" width="100%" alt={item?.name} />
                                            }
                                            <div className="text-dark d-flex justify-content-center">
                                                {item?.properties.map((prop, i) => {
                                                    return (
                                                        <>
                                                            <motion.div className="p-2 text-start d-flex justify-content-around">
                                                                <OverlayTrigger delay={{ show: 250, hide: 200 }} placement="left-start" overlay={renderTooltip(props, prop.color)}>
                                                                    <button className="border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${prop?.color}`, width: "30px", height: "30px" }} data-tip={`${prop?.color}`}></button>
                                                                </OverlayTrigger>
                                                            </motion.div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div className="d-flex justify-content-around align-items-center flex-wrap">
                                                <h3>{item?.name}</h3>

                                                <h4>{item?.price.toFixed(2)} $</h4>
                                            </div>

                                        </WrapperDiv>
                                    }
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ReactTooltip />
            <Footer />
        </>
    )
}

export default SingleCategory