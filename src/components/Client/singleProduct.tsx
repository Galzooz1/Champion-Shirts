import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import { IProdItems } from '../Admin/interfaces/prodItems';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { doApiGet, URL_API } from '../services/apiService';
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
    const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<Partial<IReadyproducts>>({ mode: 'all' });
    let history = useHistory();
    let [indexPicked, setIndexPicked] = React.useState<number>(555);
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [isLoading, setIsLoading] = React.useState<boolean>(true);
    
    React.useEffect(() => {
        getSingleProdData();  

    }, [])

    React.useEffect(() => {

    },[])

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
    }

    const onSubmit = (dataBody: any) => {
        alert("wow")
        console.log(dataBody)
    }

    const testFunc = (i: any) => { 
        setValue("isClean", false);
        setValue("price", productData.price);
        setValue("product_name", productData.name);
        setValue("product_s_id", productData.s_id);
        setValue("category_name", productData.catName);
        setValue("category_s_id", productData.category_s_id);   
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
                                                    name="color" id="properties.color" onInput={() => { testFunc(i) }}
                                                    className="form-check-input border border-dark rounded-circle m-1" style={{ backgroundColor: `${item?.color}`, width: "30px", height: "30px" }} />
                                                <div className="my-2">
                                                    {indexPicked === i ?
                                                        <>
                                                            <h3>Size:</h3>
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
                        </div>
                        <div style={{ width: "350px" }}>
                            <Slider {...SliderSettings}>
                                <img className="border rounded-2 shadow mb-4" src={productData.image} alt={productData?.name} />
                                <img className="border rounded-2 shadow mb-4" src={productData.image} alt={productData?.name} />
                            </Slider>
                        </div>
                    </div>
                    <button type="submit">Send</button>
                </form>
            }
            </ProdMainDiv>
        </>
    )
}

export default SingleProduct