import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { IProdItems } from '../Admin/interfaces/prodItems';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { doApiGet, URL_API } from '../services/apiService';
import FirstDesignStep from './designSteps/firstDesignStep';
import Header from './header';

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
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<IReadyproducts>>({ mode: 'all' });
    let [productData, setProductData] = React.useState<Partial<IProdItems>>({});
    let [formStep, setFormStep] = React.useState<number>(0);

    React.useEffect(() => {
        getSingleProdData();
    }, []);

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
        let url_cat = URL_API + "/categories/single/" + data.category_s_id;
        let dataCategory = await doApiGet(url_cat);
        console.log(dataCategory);
        data.catName = dataCategory.name;

        setProductData(data);
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/categories/single/" + productData?.category_s_id}>{productData?.catName}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>{productData?.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="d-flex justify-content-around m-5 pb-5">
                    {formStep >= 0 ?
                        <StepsDiv className="bg-info">Step 1: Choose Your Product</StepsDiv>
                        : <StepsDiv>Step 1: Choose Your Product</StepsDiv>
                    }
                    <hr/>
                    {formStep >= 1 ?
                        <StepsDiv className="bg-info">Step 2: Design Your Shirt</StepsDiv>
                        : <StepsDiv>Step 2: Design Your Shirt</StepsDiv>
                    }
                    <hr/>
                    {formStep >= 2 ?
                        <StepsDiv className="bg-info">Step 3: Buy Your Masterpiece</StepsDiv>
                        : <StepsDiv>Step 3: Buy Your Masterpiece</StepsDiv>
                    }
                </div>
                <form>
                    {formStep >= 0 && (
                        <section className={formStep === 0 ? "d-block" : "d-none"}>
                            <FirstDesignStep errors={errors} register={register} productData={productData} />
                        </section>
                    )}
                </form>
            </div>
        </>
    )
}

export default SingleProductDesign