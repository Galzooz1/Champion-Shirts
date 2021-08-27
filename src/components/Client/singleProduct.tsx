import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { IProdItems, Property } from '../Admin/interfaces/prodItems';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import { SizeInput, SizeLabel, SizeSpan } from './designSteps/firstDesignStep';
import Header from './header';
import Loading from './loading';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';

interface SingleProductParams {
    s_id: string;
};

type SingleProductProps = RouteComponentProps<SingleProductParams>

function SampleArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, width: "20px", height: "20px", display: "block", borderRadius: "6px", background: "rgba(33, 37, 41, 0.397)" }}
            onClick={onClick}
        />
    );
}

const SliderSettings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

const ProdHeaderDiv = styled.div`
margin:8px;
`;
const ProdMainDiv = styled.div`
margin:8px;
`;

const SingleProduct: React.FC<SingleProductProps> = (props) => {
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<IReadyproducts>({ mode: 'all' });
    let history = useHistory();
    let dispatch = useDispatch();
    let carts_ar = useSelector<RootStateOrAny, any[]>(myStore => myStore.carts_ar);
    let isCart = useSelector<RootStateOrAny, boolean>(myStore => myStore.isCart);
    let isWish = useSelector<RootStateOrAny, boolean>(myStore => myStore.isWish);
    let [countCartItems, setCountCartItems] = React.useState<number>(0);
    let [countWishItems, setCountWishItems] = React.useState<number>(0);
    let [isAddToCart, setIsAddToCart] = React.useState<boolean>(false);
    let [isAddToWish, setIsAddToWish] = React.useState<boolean>(false);
    let [indexPicked, setIndexPicked] = React.useState<number>(555);
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [propertiesData, setPropertiesData] = React.useState<any[]>([]);
    let [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        getSingleProdData();
        console.log("useEffect singleProduct: ", carts_ar);
        carts_ar.map(prodItem => {
            console.log("map: ", prodItem);
            if (prodItem._id) {
                setCountCartItems(prodItem.count);
            }
        })
    }, [carts_ar])

    const getSingleProdData = async () => {
        let url = URL_API + "/products/single/" + props.match.params.s_id;
        let data = await doApiGet(url)
        console.log(data);
        setIsLoading(false)
        let url_cat = URL_API + "/categories/single/" + data.category_s_id;
        let dataCategory = await doApiGet(url_cat);
        console.log(dataCategory);
        data.catName = dataCategory.name;
        setProductData(data);
        setPropertiesData(data.properties);
    }


    const onSubmit = (dataBody: any) => {
        if (!localStorage["token"]) {
            toast.error("Please Login!");
        } else {
            console.log(dataBody)
            addReadyProduct(dataBody);
        }
    }

    const addReadyProduct = async (dataBody: any) => {
        console.log("dataBody: ", dataBody);
        let url = URL_API + "/readyProducts"
        let data = await doApiMethod(url, "POST", dataBody);
        data.count = 0;
        console.log("data: ", data);
        if (isAddToCart) {
            setCountCartItems(countCartItems + 1);
            data.count = countCartItems + 1;
            dispatch({ type: "UPDATE_THE_CART", data: data })
            console.log("data2: ", data);
            toast.success(productData.name + " Added to Cart!")
            setIsAddToCart(false);
        }
        else if (isAddToWish) {
            // if(!isWish){
            setCountWishItems(countWishItems + 1);
            data.count = countWishItems + 1;
            dispatch({ type: "UPDATE_IS_WISH", flag: true })
            dispatch({ type: "UPDATE_THE_WISH", data: data })
            console.log("data2: ", data);
            toast.success(productData.name + " Added to Wish!")
            setIsAddToWish(false);
            // }else{
            //     toast.error(productData.name + " is Already On Wish List!")
            // }
        }
    }

    const setValuesFunc = (i: any) => {
        console.log(propertiesData[i])
        setValue("isClean", false);
        setValue("price", productData?.price!);
        setValue("product_name", productData?.name!);
        setValue("product_s_id", productData?.s_id!);
        setValue("category_name", productData?.catName!);
        setValue("category_s_id", productData?.category_s_id!);
        // Front
        setValue("images.frontImage.image", propertiesData[i].frontImg);
        setValue("images.frontImage.width", 0)
        setValue("images.frontImage.height", 0)
        setValue("images.frontImage.x", 0)
        setValue("images.frontImage.y", 0)
        // Back
        setValue("images.backImage.image", propertiesData[i]?.backImg!);
        setValue("images.backImage.width", 0)
        setValue("images.backImage.height", 0)
        setValue("images.backImage.x", 0)
        setValue("images.backImage.y", 0)
        setIndexPicked(i);
    }

    return (
        <>
            <Header />
            <ProdHeaderDiv className="container p-3 mx-auto">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories/single/" + productData?.category_s_id}>{productData?.catName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{productData?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <HR />
                <H2HR>
                    <SpanH2>
                        {productData?.name}
                    </SpanH2>
                </H2HR>
            </ProdHeaderDiv>
            <ProdMainDiv className="container mx-auto">
                {isLoading ? <Loading /> :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <input {...register("isClean")} className="d-none" />
                    <input {...register("price")} id="price" className="d-none" />
                    <input {...register("product_name")} id="product_name" className="d-none" />
                    <input {...register("product_s_id")} id="product_s_id" className="d-none" />
                    <input {...register("category_name")} id="category_name" className="d-none" />
                    <input {...register("category_s_id")} id="category_s_id" className="d-none" /> */}
                        <div style={{ height: "600px" }} className="d-lg-flex justify-content-around border shadow p-4">
                            <div>
                                <h2>{productData?.name}</h2>
                                <h4>{productData?.info}</h4>
                                <div className="d-flex justify-content-center">
                                    <h4>Colors:</h4>
                                    {productData.properties?.map((item, i) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <div style={{ width: "66.63px" }}>
                                                    <input {...register("color", { required: true })} type="radio" value={`${item.color}`}
                                                        name="color" id="properties.color" onInput={() => { setValuesFunc(i) }}
                                                        className="form-check-input border border-dark rounded-circle m-1" style={{ backgroundColor: `${item?.color}`, width: "30px", height: "30px" }} />
                                                    <div className="my-2">
                                                        {indexPicked === i ?
                                                            <>
                                                                {/* <h3>Size:</h3> */}
                                                                <div className="d-block">
                                                                    {item?.amount.XS > 0 ?
                                                                        <SizeLabel>
                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"XS"} />
                                                                            <SizeSpan>XS</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.S > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"S"} />
                                                                            <SizeSpan>S</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.M > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"M"} />
                                                                            <SizeSpan>M</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.L > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"L"} />
                                                                            <SizeSpan>L</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.XL > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"XL"} />
                                                                            <SizeSpan>XL</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.XXL > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"XXL"} />
                                                                            <SizeSpan>XXL</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                    {item?.amount.XXXL > 0 ?
                                                                        <SizeLabel>

                                                                            <SizeInput {...register("size", { required: true })} name="size" type="radio" value={"XXXL"} />
                                                                            <SizeSpan>XXXL</SizeSpan>
                                                                        </SizeLabel>
                                                                        : null}
                                                                </div>
                                                            </>
                                                            : null
                                                        }
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}

                                </div>
                                {errors.color && <span className="text-danger m-2 text-center">Please Choose Color</span>}
                                {errors.size && <span className="text-danger m-2 text-center">Please Choose Size</span>}
                                <h3>
                                    Price: {productData.price} $
                                </h3>
                                <div className="d-flex justify-content-between mt-4">
                                    <button type="submit" onClick={() => { setValue("isCart", true); setIsAddToCart(true) }} className="btn btn-info me-5">Add to Cart</button>
                                    <button type="submit" onClick={() => { setValue("isWish", true); setIsAddToWish(true) }} className="btn btn-danger">Add to Wish</button>
                                </div>
                            </div>
                            <div style={{ width: "350px" }}>
                                <Slider {...SliderSettings}>
                                    {productData?.image?.includes("http") ?
                                        <img className="border rounded-2 shadow mb-4" src={productData?.image} alt={productData?.name} height="400px" width="100%" />
                                        :
                                        <img className="border rounded-2 shadow mb-4" src={URL_API + productData?.image + "?" + Date.now()} height="400px" width="100%" alt={productData?.name} />
                                    }
                                    {productData?.image?.includes("http") ?
                                        <img className="border rounded-2 shadow mb-4" src={productData?.image} alt={productData?.name} height="400px" width="100%" />
                                        :
                                        <img className="border rounded-2 shadow mb-4" src={URL_API + productData?.image + "?" + Date.now()} height="400px" width="100%" alt={productData?.name} />
                                    }

                                    {/* <img className="border rounded-2 shadow mb-4" src={productData.image} alt={productData?.name} /> */}
                                    {/* <img className="border rounded-2 shadow mb-4" src={productData.image} alt={productData?.name} /> */}
                                </Slider>
                            </div>
                        </div>
                    </form>
                }
            </ProdMainDiv>
        </>
    )
}

export default SingleProduct