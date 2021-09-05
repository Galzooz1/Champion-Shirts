import { motion } from 'framer-motion';
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import TrashPNG from '../../assets/trash.png';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { IUsers } from '../Admin/interfaces/users';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import ThirdDesignCanvas from './designSteps/thirdDesignCanvas';
import Footer from './footer';
import Header, { heartIcon } from './header';
import Loading from './loading';
import { DesignedH2, DesignedLine } from './userPanel';

interface UserDesignsParams {
    _id: string;
};

type UserDesignsProps = RouteComponentProps<UserDesignsParams>

export const ImageWrapper = styled.div`
position:relative;
`;

export const ImageHover = styled.img`
width: fit-content;
height: fit-content;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 1s ease-out;
  &:hover{
      opacity: 1;
  }
`;

const IconWrapper = styled.div`
position:relative;
`;

const IconHover = styled(motion.img)`
width: fit-content;
height: fit-content;
cursor: pointer;
  position: absolute;
  top: 0;
  left: -2px;
  opacity: 0;
  transition: opacity 0.4s ease-out;
  &:hover{
      opacity: 1;
  }
`;

const UserDesigns: React.FC<UserDesignsProps> = (props) => {
    let dispatch = useDispatch()
    let history = useHistory();
    let [userInfo, setUserInfo] = React.useState<IUsers>();
    let [countCartItems, setCountCartItems] = React.useState<number>(0);
    let carts_ar = useSelector<RootStateOrAny, IReadyproducts[]>((myStore: any) => myStore.carts_ar);
    let wish_ar = useSelector<RootStateOrAny, IReadyproducts[]>((myStore: any) => myStore.wish_ar);
    let [readyProductData, setReadyProductData] = React.useState<Partial<IReadyproducts[]>>([]);
    let [wishProductData, setWishProductsData] = React.useState<Partial<IReadyproducts[]>>([]);
    let [wishCleanProductData, setWishCleanProductsData] = React.useState<Partial<IReadyproducts[]>>([]);

    React.useEffect(() => {
        if (localStorage["token"]) {
            getUserData();
        }
    }, []);

    const getUserData = async () => {
        let url = URL_API + "/users/myInfo";
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUserInfo(data);
        getReadyProductsData(data._id);
    }

    const getReadyProductsData = async (_id: string) => {
        let url = URL_API + "/readyProducts/" + _id;
        let data = await doApiMethod(url, "GET");
        console.log(data)
        setReadyProductData(data);
        initialStatesReadyProducts(data);
    }

    const initialStatesReadyProducts = (data?: IReadyproducts[]) => {
        data?.map((item: IReadyproducts, i: number) => {
            if (item.isWish && !item.isClean) {
                setWishProductsData(wishProductData => [...wishProductData, { ...item }]);
            }
            if (item.isClean) {
                setWishCleanProductsData(wishCleanProductsData => [...wishCleanProductsData, { ...item }])
            }
        })
    }

    const delFromWish = (item: IReadyproducts) => {
        if (window.confirm("Are you sure you want to delete " + item.product_name + "?")) {
            if(item.isWish){
                item.count = 0;
                dispatch({ type: "UPDATE_THE_WISH", data: item })
            }
            deleteFromDB(item.s_id);
        }
    }

    const deleteFromDB = async (s_id: number) => {
        let url = URL_API + "/readyProducts/" + s_id;
        await doApiMethod(url, "DELETE", {});
        window.location.reload();
        // history.push("/selfdesigns/" + userInfo?._id)
    }

    const buyNow = (item?: IReadyproducts) => {
        if (!item?.isCart) {
            item!.count = 1;
            dispatch({ type: "UPDATE_THE_CART", data: item })
        }
        history.push("/checkout")
    }

    const addToCart = (item?: IReadyproducts) => {
        item!.isCart = true; 
        setCountCartItems(countCartItems + 1);
        item!.count = countCartItems + 1;
        dispatch({ type: "UPDATE_THE_CART", data: item })
        toast.success(item?.product_name + " Added to Cart!")

    }

    return (
        <>
            <Header />
            <div className="mx-auto mt-4 container">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>User Panel</Breadcrumb.Item>
                    <Breadcrumb.Item active>My Designs</Breadcrumb.Item>
                </Breadcrumb>
                <DesignedH2>My Designs</DesignedH2>
                <DesignedLine>
                </DesignedLine>
                {/* {wishProductData.length === 0 && wishCleanProductData.length === 0 &&
                <Loading />} */}
               
                {wishProductData.length > 0 &&
                    <>
                        <div className="text-center mt-3 display-6">My Wish Products</div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {wishProductData.map((item?: IReadyproducts, i?: number) => {
                                return (
                                    <>
                                        {(item?.isWish && !item.isClean) ?
                                            <div className="col-lg-5 p-3 mt-3 mx-2">
                                                <div className="p-1 shadow" style={{ minHeight: item?.images?.frontImage.height, minWidth: item?.images?.frontImage.width }}>
                                                    <ImageWrapper>
                                                        {item?.images?.frontImage.image.includes("http") ?
                                                            <img src={item?.images?.frontImage.image} style={{ height: 500, width: 500 }} />
                                                            :
                                                            <img src={URL_API + item?.images?.frontImage.image + "?" + Date.now()} style={{ height: 500, width: 500 }} />
                                                        }
                                                        {item?.images?.backImage.image.includes("http") ?
                                                            <ImageHover src={item?.images?.backImage.image} style={{ height: 500, width: 500 }} />

                                                            :
                                                            <ImageHover src={URL_API + item?.images?.backImage.image + "?" + Date.now()} style={{ height: 500, width: 500 }} />
                                                        }
                                                        {/* <ImageHover src={item?.images?.backImage.image} width="200" height="300" /> */}
                                                    </ImageWrapper>
                                                    <div className="p-3 text-center">
                                                        <h3>{item.product_name}</h3>
                                                        <div className="d-flex justify-content-center my-3">
                                                            <div className="me-2">Color:</div>
                                                            <button disabled className="rounded-circle shadow p-1" style={{ width: "20px", height: "20px", backgroundColor: `${item.color}` }} ></button>
                                                        </div>
                                                        <div className="d-flex justify-content-center my-3">
                                                            <div className="me-2">Size:</div>
                                                            <button disabled className="shadow text-dark" style={{ width: "30px", height: "30px" }}>{item?.size}</button>
                                                        </div>
                                                        <div className="my-3">Category: {item.category_name}</div>
                                                        <div className="my-3">
                                                            Catalog Number: {item.s_id}
                                                        </div>
                                                        <h3>{item?.price?.toFixed(2)} $</h3>
                                                        <div className="d-flex justify-content-start align-items-center">
                                                            <IconWrapper>
                                                                <div style={{ cursor: "pointer" }}>
                                                                    {heartIcon()}
                                                                </div>
                                                                <div data-tip="Delete" onClick={() => delFromWish(item)}>
                                                                    <IconHover className="rounded-circle p-1" whileHover={{ backgroundColor: "#212529" }} style={{ width: 30, height: 30 }} src={TrashPNG} />
                                                                </div>
                                                            </IconWrapper>
                                                        </div>
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <button onClick={() => { buyNow(item) }} className="btn btn-success mb-3">Buy Now</button>
                                                        {!item.isCart &&
                                                            <button onClick={() => addToCart(item)} className="btn btn-info">Add To Cart</button>
                                                        }
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>

                                            : null
                                        }
                                    </>
                                )
                            })}
                        </div>
                        <hr />
                    </>
                }
                {wishCleanProductData.length > 0 &&
                    <>
                        <div className="text-center mt-3 display-6">My Own Designs</div>
                        <div className="d-flex flex-wrap justify-content-center">
                            {wishCleanProductData.map((item?: IReadyproducts, i?: number) => {
                                return (
                                    <>
                                    {/* {(item?.s_id !== carts_ar[i!].s_id) ? :null} */}
                                    <>
                                        {(item?.isClean) &&
                                            <div className="col-lg-5 p-3 mt-3 mx-2">

                                                <div className="p-1 shadow border" style={{ minHeight: item.images.frontImage.height, minWidth: item.images.frontImage.width }}>
                                                    {item.sideToDesign === "front" ?
                                                        <ImageWrapper>
                                                            <ThirdDesignCanvas readyProductData={item} chosenSide={item.sideToDesign} />
                                                            {item?.images?.backImage.image.includes("http") ?
                                                                <ImageHover src={item?.images?.backImage.image} style={{ height: 500, width: 500 }} />
                                                                :
                                                                <ImageHover src={URL_API + item?.images?.backImage.image + "?" + Date.now()} style={{ height: 500, width: 500/*maxHeight:item.images.backImage.height, maxWidth:item.images.backImage.width*/ }} />
                                                            }
                                                        </ImageWrapper>
                                                        :
                                                        <ImageWrapper>
                                                            <ThirdDesignCanvas readyProductData={item} chosenSide={item.sideToDesign} />
                                                            {item?.images?.frontImage.image.includes("http") ?
                                                                <ImageHover src={item?.images?.frontImage.image} style={{ height: 500, width: 500 }} />
                                                                :
                                                                <ImageHover src={URL_API + item?.images?.frontImage.image + "?" + Date.now()} style={{ height: 500, width: 500 }} />
                                                            }
                                                        </ImageWrapper>
                                                    }
                                                    <div className="p-3 text-center">
                                                        <h3>{item?.product_name}</h3>
                                                        <div className="d-flex justify-content-center my-3">
                                                            <div className="me-2">Color:</div>
                                                            <button disabled className="rounded-circle shadow p-1" style={{ width: "20px", height: "20px", backgroundColor: `${item.color}` }} ></button>
                                                        </div>
                                                        <div className="d-flex justify-content-center my-3">
                                                            <div className="me-2">Size:</div>
                                                            <button disabled className="shadow text-dark" style={{ minWidth: "30px", height: "30px" }}>{item?.size}</button>
                                                        </div>
                                                        <div className="my-3">Category: {item.category_name}</div>
                                                        <div className="my-3">
                                                            Catalog Number: {item.s_id}
                                                        </div>
                                                        <h3>{item?.price?.toFixed(2)} $</h3>
                                                        {/* {item.isWish && */}
                                                        <div className="d-flex justify-content-start align-items-center">
                                                            <IconWrapper>
                                                                <div style={{ cursor: "pointer" }}>
                                                                    {heartIcon()}
                                                                </div>
                                                                <div data-tip="Delete" onClick={() => delFromWish(item)}>
                                                                    <IconHover className="rounded-circle p-1" whileHover={{ backgroundColor: "#212529" }} style={{ width: 30, height: 30 }} src={TrashPNG} />
                                                                </div>
                                                            </IconWrapper>
                                                        </div>
                                                        {/* } */}
                                                    </div>
                                                    <button onClick={() => { buyNow(item) }} className="btn btn-success mb-3">Buy Now</button>
                                                </div>

                                            </div>

                                        }
                                        </>

                                    </>
                                    
                                )
                            })}
                        </div>
                    </>
                }
                {
                    (wishCleanProductData.length <= 0 && wishProductData.length <= 0) &&
                    <h3 className="p-5 m-5">Time To Add Some Products...</h3>
                }
            </div>
            <Footer />
        </>
    )
}

export default UserDesigns