import React from 'react';
import { Tooltip } from 'react-bootstrap';
import { Breadcrumb, OverlayTrigger } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { IProdItems, Property } from '../Admin/interfaces/prodItems';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { doApiGet, URL_API } from '../services/apiService';
import FirstDesignStep from './designSteps/firstDesignStep';
import SecondStepApp from './designSteps/secondStepApp';
import Header from './header';
import Loading from './loading';

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
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<IReadyproducts>>({ 
        defaultValues: {
            sideToDesign: "front"
        },
        mode: 'all' });
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [propertiesData, setPropertiesData] = React.useState<Property[]>([]);
    let [formStep, setFormStep] = React.useState<number>(0);
    let [isLoading, setIsLoading] = React.useState<boolean>(true);
    let [indexPicked, setIndexPicked] = React.useState<number>(0);
    let [chosenSide, setChosenSide] = React.useState<string>("front");
    let [extraPriceOfProduct, setExtraPriceOfProduct] = React.useState<number | undefined>(0);
    let sum: number;
    
    
    React.useEffect(() => {
        getSingleProdData();
        sum = extraPriceOfProduct!;
    }, []);

    const indexPickedCallBack = (_value: number) => {
        setIndexPicked(_value);
    }

    const nextFormStep = () => {
        setFormStep(cur => cur + 1);
    }
    const backFormStep = () => {
        setFormStep(cur => cur - 1);
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
        console.log(dataBody);
    }

    const extraPrice = (amount: number) => { 
        setExtraPriceOfProduct(amount);
    }

    const setSideAndPriceValues = () => { 
        console.log(productData?.price!+extraPriceOfProduct!);
        setValue("price", productData?.price!+extraPriceOfProduct!);
        setValue("product_s_id", productData.s_id);
        setValue("product_name", productData.name);
        setValue("category_s_id", productData.category_s_id);
        setValue("category_name", productData.catName);
    }

    const renderTooltip = (props: any) => (
        <Tooltip {...props}>Please set all the fields</Tooltip>
    )

    return (
        <>
            <Header />
            <div style={{width:"90%", height:"90%"}} className="mx-auto mt-5">
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
                        {formStep >= 0 && (
                            <section className={formStep === 0 ? "d-block" : "d-none"}>
                                <FirstDesignStep extraPriceOfProduct={extraPriceOfProduct} extraPrice={extraPrice} chosenSide={chosenSide} setChosenSide={setChosenSide} indexPickedCallBack={indexPickedCallBack} errors={errors} register={register} productData={productData} />
                                <div className="d-flex justify-content-center align-items-end m-3">
                                    <button type="button" onClick={() => history.goBack()} className="btn btn-outline-danger mx-4">Back</button>
                                    {!isValid ? 
                                    <OverlayTrigger delay={{ show: 250, hide: 500 }} placement="left-start" overlay={renderTooltip(props)}>
                                    <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-outline-primary mx-4">Continue</button>
                                    </OverlayTrigger>
                                    :
                                    <button onClick={isValid ? () => {setSideAndPriceValues(); nextFormStep();} : () => console.log("work")} type="button" className="btn btn-outline-primary mx-4">Continue</button>
                                    }
                                    {/* <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-outline-primary mx-4">Continue</button> */}
                                </div>
                            </section>
                        )}
                        {formStep >= 1 && (
                            <section className={formStep === 1 ? "d-block" : "d-none"}>
                                <SecondStepApp chosenSide={chosenSide} setValue={setValue} indexPicked={indexPicked} errors={errors} register={register} productData={productData} propertiesData={propertiesData} />
                                <div className="d-flex justify-content-center align-items-end m-3">
                                    <button type="button" onClick={backFormStep} className="btn btn-outline-danger mx-4">Back</button>
                                    {!isValid ? 
                                    <OverlayTrigger delay={{ show: 250, hide: 500 }} placement="left-start" overlay={renderTooltip(props)}>
                                    <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-outline-primary mx-4">Continue</button>
                                    </OverlayTrigger>
                                    :
                                    <button onClick={nextFormStep} type="button" className="btn btn-outline-primary mx-4">Continue</button>
                                    }
                                </div>
                            </section>
                        )}
                        <button type="submit">Send</button>
                    </form>
                }
            </div>
        </>
    )
}

export default SingleProductDesign