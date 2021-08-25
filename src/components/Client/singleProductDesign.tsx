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

interface SingleProductDesignParams {
    s_id: string;
};

type SingleProductDesignProps = RouteComponentProps<SingleProductDesignParams>

const StepsDiv = styled.div`
width:20%;
background-color: blanchedalmond;
min-height: 25px;
border-radius: 10px;
font-weight: bolder;
`;

const SingleProductDesign: React.FC<SingleProductDesignProps> = (props) => {
    let history = useHistory();
    const { register, handleSubmit, formState: { errors, isValid }, setValue, reset, unregister } = useForm<Partial<IReadyproducts>>({
        defaultValues: {
            sideToDesign: "front",
            // shirtDesigns.front.design.is_design: [true]
        },
        mode: 'all'
    });
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [readyProductData, setReadyProductData] = React.useState<Partial<IReadyproducts>>({});
    // let [readyProductData, setReadyProductData] = React.useState<Partial<IReadyproducts>>({});
    let [propertiesData, setPropertiesData] = React.useState<Property[]>([]);
    let [formStep, setFormStep] = React.useState<number>(0);
    let [isLoading, setIsLoading] = React.useState<boolean>(true);
    let [isFormStepThree, setIsFormStepThree] = React.useState<boolean>(false);
    let [indexPicked, setIndexPicked] = React.useState<number>(0);
    let [chosenSide, setChosenSide] = React.useState<string>("front");
    let [extraPriceOfProduct, setExtraPriceOfProduct] = React.useState<number | undefined>(0);
    let sum: number;


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
                console.log(readyProductData);
                if(readyProductData){
                    deleteReadyProductFromDb(readyProductData?.s_id!);
                }
                reset({ shirtDesigns: {} });
                setFormStep(cur => cur - 1);
                window.location.reload();
            }
        } else {
            setFormStep(cur => cur - 1);
        }
    }

    const addReadyProductDesign = async (dataBody: any) => {
        // if(formStep >= 1){
        //     setIsFormStepThree(true);
        // }
        // if(!isFormStepThree){
        // }
        // לטפל במקרי קצה של השליחה של הרדי פרודקטס!!!
            let url = URL_API + "/readyProducts"
            let data = await doApiMethod(url, "POST", dataBody);
            console.log(data);
            setReadyProductData(data);
    }

    const deleteReadyProductFromDb = async(s_id: number) => { 
        let url = URL_API + "/readyProducts/" + s_id
        let data = await doApiMethod(url, "DELETE", {});
    }

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
            if (chosenSide === "front") {
                // console.log(dataBody.shirtDesigns.front);
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
                    console.log(dataBody.shirtDesigns.front);
                }

            }
            if (chosenSide === "back") {
                if (dataBody.shirtDesigns === undefined) {
                    delete dataBody.shirtDesigns
                } else {
                    console.log(dataBody.shirtDesigns.back);
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

                    console.log(dataBody.shirtDesigns.back);
                }
            }
            console.log(dataBody);
            addReadyProductDesign(dataBody);
        }
    }


    const extraPrice = (amount: number) => {
        setExtraPriceOfProduct(amount);
    }

    const setSideAndPriceValues = () => {
        console.log(productData?.price! + extraPriceOfProduct!);
        setValue("price", productData?.price! + extraPriceOfProduct!);
        setValue("product_s_id", productData.s_id);
        setValue("product_name", productData.name);
        setValue("category_s_id", productData.category_s_id);
        setValue("category_name", productData.catName);
        setValue("info", productData.info);
    }

    return (
        <>
            <Header />
            <div style={{ width: "90%", height: "90%" }} className="mx-auto mt-5">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories/single/" + productData?.category_s_id}>{productData?.catName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{productData?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-around m-5">
                    {formStep === 0 ?
                        <StepsDiv className="bg-info">Step 1: Choose Your Product</StepsDiv>
                        : <StepsDiv>Step 1: Choose Your Product</StepsDiv>
                    }
                    <hr />
                    {formStep === 1 ?
                        <StepsDiv className="bg-info">Step 2: Design Your Shirt</StepsDiv>
                        : <StepsDiv>Step 2: Design Your Shirt</StepsDiv>
                    }
                    <hr />
                    {formStep === 2 ?
                        <StepsDiv className="bg-info">Step 3: Buy Your Masterpiece</StepsDiv>
                        : <StepsDiv>Step 3: Buy Your Masterpiece</StepsDiv>
                    }
                </div>
                {isLoading ? <Loading />
                    :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("isClean", { required: true })} name="isClean" id="isClean" className="d-none" />
                        {formStep >= 0 && (
                            <section className={formStep === 0 ? "d-block" : "d-none"}>
                                <FirstDesignStep extraPriceOfProduct={extraPriceOfProduct} extraPrice={extraPrice} chosenSide={chosenSide} setChosenSide={setChosenSide} indexPickedCallBack={indexPickedCallBack} errors={errors} register={register} productData={productData} />
                                <div className="d-flex justify-content-center align-items-end m-3">
                                    <button type="button" onClick={() => history.goBack()} className="btn btn-outline-danger mx-4">Back</button>
                                        <button disabled={!isValid} onClick={isValid ? () => { setSideAndPriceValues(); nextFormStep(); } : () => console.log("Not Valid!")} type="button" className="btn btn-outline-primary mx-4">Continue</button>
                                    
                                </div>
                            </section>
                        )}
                        {formStep >= 1 && (
                            <section className={formStep === 1 ? "d-block" : "d-none"}>
                                <SecondStepApp unregister={unregister} reset={reset} chosenSide={chosenSide} setValue={setValue} indexPicked={indexPicked} errors={errors} register={register} productData={productData} propertiesData={propertiesData} />
                                <div className="d-flex justify-content-center align-items-end m-3">
                                    <button type="button" onClick={backFormStep} className="btn btn-outline-danger mx-4">Back</button>
                                    <button onClick={localStorage["token"] && nextFormStep} type="submit" className="btn btn-outline-primary mx-4">Continue</button>
                                </div>
                            </section>
                        )}
                        {formStep >= 2 && (
                            <section className={formStep === 2 ? "d-block" : "d-none"}>
                                <ThirdDesignStep productData={productData} chosenSide={chosenSide} readyProductData={readyProductData} />
                                <div className="d-flex justify-content-center align-items-end m-3">
                                    <button type="button" onClick={backFormStep} className="btn btn-outline-danger mx-4">Back</button>
                                </div>
                            </section>
                        )}
                    </form>
                }
            </div>
        </>
    )
}

export default SingleProductDesign