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
import Header from './header';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';

interface SingleCategoryParams {
    s_id: string;
};

type SingleCategoryProps = RouteComponentProps<SingleCategoryParams>

const WrapperDiv = styled(motion.div)`
min-height: 600px;
margin:16px;
border:1px solid black;
padding-bottom: 8px;
cursor:pointer;
`;

const SingleCategory: React.FC<SingleCategoryProps> = (props) => {
    let history = useHistory();
    let [categoryData, setCategoryData] = React.useState<Partial<ICategories>>({});
    let [productsData, setProductsData] = React.useState<Partial<IProdItems[]>>([]);
    // let [productAmount, setProductAmount] = React.useState<Partial<Property[]>>([])
    React.useEffect(() => {
        getSingleCatData();
        getProductsData();
    }, [])

    const getSingleCatData = async () => {
        let url = URL_API + "/categories/single/" + props.match.params.s_id;
        let data = await doApiGet(url);
        console.log(data);
        setCategoryData(data);
    }

    const getProductsData = async () => {
        let url = URL_API + "/products?category=" + props.match.params.s_id;
        let data = await doApiGet(url);
        console.log(data);
        setProductsData(data);
        // setProductAmount(data[0].properties);
    }

    const renderTooltip = (props: any, color: any) => (
        <Tooltip {...props}>{color}</Tooltip>
    )

    return (
        <>
            <Header />
            <div className="d-flex">
                {/* <FilterForm productsData={productsData} /> */}
                <div className="container mt-5">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                        <Breadcrumb.Item active>{categoryData?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <HR />
                    <H2HR>
                        <SpanH2>
                            {categoryData?.name}
                        </SpanH2>
                    </H2HR>
                    <div className="d-flex">
                        {productsData.map((item, i) => {
                            return (
                                <>
                                    <WrapperDiv whileHover={{scale:1.05}} transition={{duration:0.4}} onClick={() => {history.push("/product/" + item?.s_id)}} className="col-lg-3 mx-5 shadow rounded-1">
                                        <img src={item?.image} alt={item?.name} height="350px" width="100%" />
                                        <h2>{item?.name}</h2>
                                        <h3>{item?.price} $</h3>
                                        {/* <div className="text-info border p-3">
                                        <h3>Colors Available:</h3>
                                        {item?.properties.map((prop, i) => {
                                            return (
                                                <>
                                                    <button className="border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${prop?.color}`, width: "30px", height: "30px" }} data-tip={`${prop?.color}`}></button>
                                                </>
                                            )
                                        })}
                                    </div> */}
                                        <div className="text-info border p-3">
                                            <h3>Available:</h3>
                                            {item?.properties.map((prop, i) => {
                                                // const amounts = productAmount.amount;
                                                return (
                                                    <>
                                                        <div className="border border-dark p-2 d-flex justify-content-around">
                                                            <OverlayTrigger delay={{ show: 250, hide: 200 }} placement="left-start" overlay={renderTooltip(props, prop.color)}>
                                                                <button className="border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${prop?.color}`, width: "30px", height: "30px" }} data-tip={`${prop?.color}`}></button>
                                                            </OverlayTrigger>
                                                            {prop?.amount.XS > 0 ?
                                                                <h4>XS</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.S > 0 ?
                                                                <h4>S</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.M > 0 ?
                                                                <h4>M</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.L > 0 ?
                                                                <h4>L</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.XL > 0 ?
                                                                <h4>XL</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.XXL > 0 ?
                                                                <h4>XXL</h4>
                                                                :
                                                                null
                                                            }
                                                            {prop?.amount.XXXL > 0 ?
                                                                <h4>XXXL</h4>
                                                                :
                                                                null
                                                            }

                                                        </div>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </WrapperDiv>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </>
    )
}

export default SingleCategory