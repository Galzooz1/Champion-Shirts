import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-bootstrap';
import { Breadcrumb, OverlayTrigger } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { IProdItems } from '../Admin/interfaces/prodItems';
import { doApiGet, URL_API } from '../services/apiService';
import Header from './header';
import Loading from './loading';
import { WrapperDiv } from './singleCategory';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';

interface SearchPageProps {
location?: any;
};

const SearchPage: React.FC<SearchPageProps> = (props) => {
    let history = useHistory();
    let [search, setSearch] = React.useState<any>("");
    let [prods_ar, setProdsAr] = React.useState<Partial<IProdItems[]>>([]);
    let [loadingShow, setLoadingShow] = React.useState(true)

    React.useEffect(() => {
        // בשביל לאסוף קווארי סטרינג בצד לקוח
        let urlParams = new URLSearchParams(window.location.search);
        //?q=koko
        setLoadingShow(true);
        setSearch(urlParams.get('q'));
        doApiSearch(urlParams.get('q'));
        // props.location -> ככה שאם אנחנו כבר בחיפוש אז הוא יתרנדר מחדש
    }, [props.location])

    const doApiSearch = async (_searchFor: string | null) => {
        let url = URL_API + "/products/search?q=" + _searchFor;
        let data = await doApiGet(url);
        setProdsAr(data);
        setLoadingShow(false);
        console.log(data);
    }

    const renderTooltip = (props: any, color: any) => (
        <Tooltip {...props}>{color}</Tooltip>
    )

    return (
        <>
            <Header />
            <div className="container mt-5">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>Search for {search}</Breadcrumb.Item>
                </Breadcrumb>
                <HR />
                <H2HR>
                    <SpanH2>
                        Search for {search} :
                    </SpanH2>
                </H2HR>
                {loadingShow &&
                    <Loading />}
                {!loadingShow && prods_ar.length === 0 &&
                    <div className="display-5">There's nothing here, try again</div>
                }
                <div className="d-flex flex-wrap mb-5">
                    {prods_ar.map((item, i) => {
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
        </>
    )
}

export default SearchPage