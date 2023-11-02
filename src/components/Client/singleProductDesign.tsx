import React from 'react';
import _compact from 'lodash.compact'
import { Tooltip } from 'react-bootstrap';
import { Breadcrumb, OverlayTrigger } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { IProdItems, Property } from '../Admin/interfaces/prodItems';
import { Front, IReadyproducts } from '../Admin/interfaces/readyproducts';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import FirstDesignStep from './designSteps/firstDesignStep';
import SecondStepApp from './designSteps/secondStepApp';
import ThirdDesignStep from './designSteps/thirdDesignStep';
import Header from './header';
import Loading from './loading';
import _ from 'lodash';
import ArrowStepIcon from '../../assets/arrowsteps.svg'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { DesignedLine } from './userPanel';
import Footer from './footer';
import './css/singleProductDesign.css';


interface SingleProductDesignParams {
    s_id: string;
};

type SingleProductDesignProps = RouteComponentProps<SingleProductDesignParams>

const StepsDiv = styled.div`
/* width:20%; */
/* background-color: blanchedalmond; */
background-size: 100%;
width:20%;
background-repeat: no-repeat;
background-position: center;
min-height: 60px;
font-family: "Alata";
font-size: 17px;
padding-left:10px;
background-color: #C4C4C4;
clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
/* width:20%; */
/* min-height: 25px; */

/* border-radius: 10px; */
font-weight: bolder;
`;

const StepsHeader = styled.h2`
/* word-spacing: 24px; */
letter-spacing: 0.3em;
font-size: 32px;
line-height: 32px;
font-weight: 800;
font-family: "Alata";
position: relative;
top:15px;
display: flex;
justify-content: flex-start;
align-items: flex-end;
/* z-index:1; */
`;

let isAddToCart: boolean;
let isAddToWish: boolean;
let isFirstContinue: boolean;
let backFlag: boolean;

const SingleProductDesign: React.FC<SingleProductDesignProps> = (props) => {
    let history = useHistory();
    const { register, handleSubmit, formState: { errors, isValid }, setValue, reset, unregister } = useForm<Partial<IReadyproducts>>({
        defaultValues: {
            sideToDesign: "front",
        },
        mode: 'all'
    });
    let dispatch = useDispatch();
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [readyProductData, setReadyProductData] = React.useState<Partial<IReadyproducts>>({});
    let [propertiesData, setPropertiesData] = React.useState<Property[]>([]);
    let [countCartItems, setCountCartItems] = React.useState<number>(0);
    let [countWishItems, setCountWishItems] = React.useState<number>(0);
    let [isDesignClicked, setIsDesignClicked] = React.useState<any>(false);
    let [isImageFileClicked, setIsImageFileClicked] = React.useState<any>(false);
    let [formStep, setFormStep] = React.useState<number>(0);
    let [isLoading, setIsLoading] = React.useState<boolean>(true);
    let [isCart, setIsCart] = React.useState<boolean>(false);
    let [isWish, setIsWish] = React.useState<boolean>(false);
    let [indexPicked, setIndexPicked] = React.useState<number>(0);
    let [chosenSide, setChosenSide] = React.useState<string>("front");
    let [extraPriceOfProduct, setExtraPriceOfProduct] = React.useState<number | undefined>(0);
    let sum: number;
    let isFormStepThree: boolean = false;

    React.useEffect(() => {
        getSingleProdData();
        sum = extraPriceOfProduct!;
        setValue("isClean", true);
    }, []);

    const indexPickedCallBack = (_value: number) => {
        setIndexPicked(_value);
    }

    const nextFormStep = () => {
        setFormStep(cur => cur + 1);
    }
    const backFormStep = () => {
        if (formStep === 1) {
            if (window.confirm("Your Data will be lost, Are you sure?")) {
                if (readyProductData) {
                    readyProductData.count = 0;
                    if (isCart) {
                        dispatch({ type: "UPDATE_IS_CART", flag: false })
                        dispatch({ type: "UPDATE_THE_CART", data: readyProductData })
                    }
                    if (isWish) {
                        dispatch({ type: "UPDATE_IS_WISH", flag: false })
                        dispatch({ type: "UPDATE_THE_WISH", data: readyProductData })
                    }
                    deleteReadyProductFromDb(readyProductData?.s_id!);
                }
                reset({ shirtDesigns: {} });
                reset({ size: undefined }, {
                    keepErrors: true,
                    keepDirty: true,
                    keepValues: false
                });
                reset({ color: undefined }, {
                    keepErrors: true,
                    keepDirty: true,
                    keepValues: false
                });
                reset({ sideToDesign: undefined }, {
                    keepErrors: true,
                    keepDirty: true,
                    keepValues: false
                });
                setFormStep(cur => cur - 1);
                window.location.reload();
            }
        }
        else {
            setFormStep(cur => cur - 1);
        }
    }



    const addReadyProductDesign = async (dataBody: any) => {
        if (isFirstContinue) {
            isAddToCart = false;
            isAddToWish = false;
        }
        if (!isAddToCart && !isAddToWish && !backFlag) {
            isFirstContinue = true;
        }
        if (isDesignClicked && !backFlag) {
            isFirstContinue = true;
            isAddToCart = false;
            isAddToWish = false
            setIsDesignClicked(false);
        }
        if (isImageFileClicked && !backFlag) {
            isFirstContinue = true;
            isAddToCart = false;
            isAddToWish = false
            setIsImageFileClicked(false);
        }

        if (!isFirstContinue && !isAddToCart && !isAddToWish && backFlag) {
            alert(readyProductData?.s_id);
            let url = URL_API + "/readyProducts/" + readyProductData?.s_id;
            let data = await doApiMethod(url, "PUT", dataBody);
            let url2 = URL_API + "/readyProducts/single/" + readyProductData?.s_id;
            let data2 = await doApiMethod(url2, "GET");
            setReadyProductData(data2);
        }
        if (isFirstContinue && !isAddToCart && !isAddToWish) {
            let url = URL_API + "/readyProducts"
            let data = await doApiMethod(url, "POST", dataBody);
            setReadyProductData(data);
        }
        if (isAddToCart && !isFirstContinue && !isAddToWish) {
            let url = URL_API + "/readyProducts"
            let data = await doApiMethod(url, "POST", dataBody);
            setReadyProductData(data);
            setCountCartItems(countCartItems + 1);
            data.count = countCartItems + 1;
            dispatch({ type: "UPDATE_THE_CART", data: data })
            toast.success(productData.name + " Added to Cart!");
        }
        if (isAddToWish && !isFirstContinue && !isAddToCart) {
            if (!isWish) {
                let url = URL_API + "/readyProducts"
                let data = await doApiMethod(url, "POST", dataBody);
                setReadyProductData(data);
                setCountWishItems(countWishItems + 1);
                data.count = countWishItems + 1;
                dispatch({ type: "UPDATE_THE_WISH", data: data })
                toast.success(productData.name + " Added to Wish List!");
                setIsWish(true);
            } else {
                toast.error(productData.name + " is Already On Wish List!")
            }
        }
        backFlag = false;
        isFirstContinue = false;
        isAddToCart = true;
        isAddToWish = true;
    }

    const deleteReadyProductFromDb = async (s_id: number) => {
        let url = URL_API + "/readyProducts/" + s_id
        let data = await doApiMethod(url, "DELETE", {});
    }

    const getSingleProdData = async () => {
        let url = URL_API + "/products/single/" + props.match.params.s_id;
        let data = await doApiGet(url)
        setIsLoading(false)
        let url_cat = URL_API + "/categories/single/" + data.category_s_id;
        let dataCategory = await doApiGet(url_cat);
        data.catName = dataCategory.name;
        setProductData(data);
        setPropertiesData(data.properties);
    }



    const onSubmit = (dataBody: any) => {

        if (!localStorage["token"]) {
            toast.error("Please Login!");
        } else {
            if (chosenSide === "front") {
                if (dataBody.shirtDesigns === undefined) {
                    delete dataBody.shirtDesigns
                } else {
                    if (dataBody.shirtDesigns.front !== undefined) {
                        //delete the first object
                        dataBody.shirtDesigns.front.shift();
                    }
                    // Front!
                    //delete attributes null from an object 
                    dataBody.shirtDesigns.front = dataBody.shirtDesigns.front.filter(Boolean).map((i: any, index: number) => {
                        const result: any = {};
                        for (const [key, value] of Object.entries(i)) if (value !== null) result[key] = value;
                        return result;
                    })

                    //empty the object with no attributes
                    for (var k in dataBody.shirtDesigns.front) {
                        if (!dataBody.shirtDesigns.front[k] || typeof dataBody.shirtDesigns.front[k] !== "object") {
                            continue // If null or not an object, skip to the next iteration
                        }

                        // The property is an object
                        if (Object.keys(dataBody.shirtDesigns.front[k]).length === 0) {
                            delete dataBody.shirtDesigns.front[k]; // The object had no properties, so delete that property
                        }
                    }
                    //delete all empty objects
                    dataBody.shirtDesigns.front = _.compact(dataBody.shirtDesigns.front)
                }

            }
            if (chosenSide === "back") {
                if (dataBody.shirtDesigns === undefined) {
                    delete dataBody.shirtDesigns
                } else {
                    // Back!
                    if (dataBody.shirtDesigns.back !== undefined) {
                        //delete the first object
                        dataBody.shirtDesigns.back.shift();
                    }
                    //delete attributes null from an object 
                    dataBody.shirtDesigns.back = dataBody.shirtDesigns.back.filter(Boolean).map((i: any) => {
                        const result: any = {};
                        for (const [key, value] of Object.entries(i)) if (value !== null) result[key] = value;
                        return result;
                    })

                    //empty the object with no attributes
                    for (var k in dataBody.shirtDesigns.back) {
                        if (!dataBody.shirtDesigns.back[k] || typeof dataBody.shirtDesigns.back[k] !== "object") {
                            continue // If null or not an object, skip to the next iteration
                        }

                        // The property is an object
                        if (Object.keys(dataBody.shirtDesigns.back[k]).length === 0) {
                            delete dataBody.shirtDesigns.back[k]; // The object had no properties, so delete that property
                        }
                    }
                    //delete all empty objects
                    dataBody.shirtDesigns.back = _.compact(dataBody.shirtDesigns.back)

                }
            }
            addReadyProductDesign(dataBody);
        }
    }


    const extraPrice = (amount: number) => {
        setExtraPriceOfProduct(amount);
    }

    const setSideAndPriceValues = () => {
        setValue("price", productData?.price! + extraPriceOfProduct!);
        setValue("product_s_id", productData.s_id);
        setValue("product_name", productData.name);
        setValue("category_s_id", productData.category_s_id);
        setValue("category_name", productData.catName);
        setValue("info", productData.info);
    }

    const buyNow = (item: Partial<IReadyproducts>) => {
        if (!item?.isCart) {
            item!.count = 1;
            dispatch({ type: "UPDATE_THE_CART", data: item })
        }
        history.push("/checkout")
    }

    return (
        <>
            <Header />
            <div style={{ width: "80%", height: "90%" }} className="mx-auto mt-5">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories/single/" + productData?.category_s_id}>{productData?.catName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{productData?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <StepsHeader>
                    The way to your special shirt
                </StepsHeader>
                <DesignedLine style={{ position: "relative", top: "5px" }}></DesignedLine>
                <div className="d-flex justify-content-evenly m-5">
                    {formStep === 0 ?
                        <>
                            <StepsDiv className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FA3165" }}>
                                Step 1:<br /> Choose Your Product
                            </StepsDiv>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                            </div>

                        </>
                        :
                        <>
                            <StepsDiv className="d-flex justify-content-center align-items-center">Step 1:<br />Choose Your Product</StepsDiv>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                            </div>
                        </>
                    }
                    <hr />
                    {formStep === 1 ?
                        <>
                            <StepsDiv className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FA3165" }}>Step 2:<br /> Design Your Shirt</StepsDiv>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                            </div>
                        </>
                        :
                        <>
                            <StepsDiv className="d-flex justify-content-center align-items-center">Step 2:<br /> Design Your Shirt</StepsDiv>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                                <i className="fa fa-angle-right fa-2x" aria-hidden="true"></i>
                            </div>
                        </>
                    }
                    <hr />
                    {formStep === 2 ?
                        <StepsDiv className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#FA3165" }} >Step 3:<br /> Buy Your Masterpiece</StepsDiv>
                        : <StepsDiv className="d-flex justify-content-center align-items-center">Step 3:<br /> Order Summary</StepsDiv>
                    }
                </div>
                {isLoading ? <Loading />
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("isClean", { required: true })} name="isClean" id="isClean" className="d-none" />
                        {formStep >= 0 && (
                            <section className={formStep === 0 ? "d-block" : "d-none"}>
                                <FirstDesignStep extraPriceOfProduct={extraPriceOfProduct} extraPrice={extraPrice} chosenSide={chosenSide} setChosenSide={setChosenSide} indexPickedCallBack={indexPickedCallBack} errors={errors} register={register} productData={productData} />
                                <div className="d-flex justify-content-evenly align-items-end m-3">
                                    <button type="button" onClick={() => history.goBack()} style={{ borderRadius: "19px", backgroundColor: "#998C8F", width: "223px", height: "63px", border: "none", color: "white" }}>Back</button>

                                </div>
                            </section>
                        )}
                        {formStep >= 1 && (
                            <section className={formStep === 1 ? "d-block" : "d-none"}>
                                <SecondStepApp isImageFileClicked={isImageFileClicked} setIsImageFileClicked={setIsImageFileClicked} extraPrice={extraPrice} backFlag={backFlag} isDesignClicked={isDesignClicked} setIsDesignClicked={setIsDesignClicked} unregister={unregister} reset={reset} chosenSide={chosenSide} setValue={setValue} indexPicked={indexPicked} errors={errors} register={register} productData={productData} propertiesData={propertiesData} />
                                <div className="d-flex justify-content-evenly align-items-end m-3">
                                    <button type="button" onClick={backFormStep} style={{ borderRadius: "19px", backgroundColor: "#998C8F", width: "223px", height: "63px", border: "none", color: "white" }}>Back</button>
                                    <button onClick={() => { localStorage["token"] && nextFormStep(); setSideAndPriceValues(); }} type="submit" style={{ borderRadius: "19px", backgroundColor: !isValid ? "#998C8F" : "#FA3165", width: "223px", height: "63px", border: "none", color: "white" }}>Continue</button>
                                </div>
                            </section>
                        )}
                        {formStep >= 2 && (
                            <section className={formStep === 2 ? "d-block" : "d-none"}>
                                <ThirdDesignStep isWish={isWish} isCart={isCart} setIsWish={setIsWish} setIsCart={setIsCart} productData={productData} chosenSide={chosenSide} readyProductData={readyProductData} />
                                <div className="d-flex justify-content-center mt-3">
                                    <button onClick={() => buyNow(readyProductData)} className="btn btn-success me-4">Buy Now</button>
                                </div>
                                <div className="d-flex justify-content-start align-items-center m-3">
                                    <button type="button"  onClick={() => { backFlag = true; isFirstContinue = false; isAddToCart = false; isAddToWish = false; backFormStep(); }}  style={{ borderRadius: "19px", backgroundColor: "#998C8F", width: "223px", height: "63px", border: "none", color: "white" }}>Back</button>
                                </div>
                            </section>
                        )}
                    </form>
                }
            </div>
            <Footer />
        </>
    )
}

export default SingleProductDesign