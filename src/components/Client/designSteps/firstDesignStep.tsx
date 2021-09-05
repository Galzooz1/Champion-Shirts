import React from 'react';
import styled from 'styled-components';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import Slider from "react-slick";
import FirstDesignStepCarousel from './firstDesignStepCarousel';
import { useHistory } from 'react-router-dom';
import { URL_API } from '../../services/apiService';

interface FirstDesignStepProps {
    errors: any;
    register: any;
    productData: Partial<IProdItems>;
    indexPickedCallBack: (_value: number) => void;
    setChosenSide?: any;
    chosenSide: string;
    extraPrice: (amount: number) => void;
    extraPriceOfProduct?: number | undefined;
};

export const SizeInput = styled.input`
		position: absolute;
		left: -9999px;
		&:checked + span {
			background-color: mix(#fff, #00005c, 84%);
			&:before {
				box-shadow: inset 0 0 0 0.4375em #00005c;
			}
		}
`;

export const SizeLabel = styled.label`
    display: flex;
	cursor: pointer;
	font-weight: 500;
	position: relative;
	overflow: hidden;
	margin-bottom: 0.375em;
`;

export const SizeSpan = styled.span`
		display: flex;
		align-items: center;
		padding: 0.375em 0.75em 0.375em 0.375em;
		border-radius: 99em; // or something higher...
		transition: 0.25s ease;
		&:hover {
			background-color: mix(#fff, $primary-color, 84%);
		}
		&:before {
			display: flex;
			flex-shrink: 0;
			content: "";
			background-color: #fff;
			width: 1.5em;
			height: 1.5em;
			border-radius: 50%;
			margin-right: 0.375em;
			transition: 0.25s ease;
			box-shadow: inset 0 0 0 0.125em #00005c;
        }
`;

const FirstDesignStep: React.FC<FirstDesignStepProps> = ({ extraPriceOfProduct, extraPrice, chosenSide, setChosenSide, productData, errors, register, indexPickedCallBack }) => {
    let [indexPicked, setIndexPicked] = React.useState<number>(555);
    let selectSideRef = React.useRef<HTMLSelectElement>(null);
    let history = useHistory();
    React.useEffect(() => {
    }, []);
    const handleChange = (i: number) => {
        setIndexPicked(i)
        indexPickedCallBack(i);
    }

    const chooseSide = (e: any) => {
        setChosenSide(e.target.value)
        if (e.target.value === "both") {
            extraPrice(10);
        } else {
            extraPrice(0)
        }
    }

    return (
        <>
            <div style={{ height: "600px",fontFamily:"Alata"}} className="d-lg-flex align-items-start justify-content-around p-4 container">
                <div className="col-lg-6 p-5">
                    <h2 className="text-start fw-bolder">{productData?.name}</h2>
                    <div className="text-start fw-bold">{productData?.info}
                        <br />
                        Machine Wash
                        <br />
                        100% Cotton
                        <br />
                        Imported
                    </div>
                    <div className="text-start">
                        <div style={{ fontSize: "1.2em" }} className="fw-bold mt-3 text-decoration-underline">Colors:</div>
                        <div className="d-flex mt-1">
                        {productData.properties?.map((item, i) => {
                            return (
                                <React.Fragment key={i}>
                                    <div style={{ width: "66.63px" }}>
                                        <input {...register("color", { required: true })} type="radio" value={`${item.color}`}
                                            name="color" id="properties.color" onInput={() => handleChange(i)}
                                            className="form-check-input border border-dark rounded-circle m-1" style={{ backgroundColor: `${item?.color}`, width: "30px", height: "30px" }} data-tip={`${item?.color}`} />
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        </div>
                        <div style={{ fontSize: "1.2em" }} className="fw-bold mt-3 text-decoration-underline">Size:</div>
                        {productData.properties?.map((item, i) => {
                            return (
                                <div className="ms-2">
                                    {indexPicked === i ?
                                        <>
                                            {/* <h3>Size:</h3> */}
                                            <div className="d-flex">
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
                            )
                        })}



                    </div>
                    {errors.color && <span className="text-danger m-2 text-center">Please Choose Color</span>}
                    {errors.size && <span className="text-danger m-2 text-center">Please Choose Size</span>}
                    <div>
                        <select {...register("sideToDesign", { required: true })} value={chosenSide} name="sideToDesign" id="sideToDesign" className="form-select w-50 mt-3" ref={selectSideRef} onChange={chooseSide}>
                            <option value="front">Front</option>
                            <option value="back">Back</option>
                            <option disabled value="both">Both (+10$)</option>
                        </select>
                    </div>
                    {errors.price && <span className="text-danger m-2 text-center">Please choose side to design!</span>}
                    <div className="mt-5 text-start">
                        {chosenSide === "both" ?
                            <h3>Price: {productData?.price! + extraPriceOfProduct!} $</h3>
                            :
                            <h3>Price: {productData?.price} $</h3>
                        }
                    </div>
                </div>
                <div className="col-lg-6">
                    {indexPicked === 555 ?
                        <div>

                            {productData?.image?.includes("http") ?
                                <img src={productData?.image} alt={productData?.name} height="350px" width="300px" />
                                :
                                <img src={URL_API + productData?.image + "?" + Date.now()} height="350px" width="300px" alt={productData?.name} />
                            }
                        </div>
                        // <img className="border rounded-2 shadow mb-4" width="300px" src={productData.image} alt={productData?.name} />
                        :
                        <FirstDesignStepCarousel productData={productData} indexPicked={indexPicked} />
                    }
                </div>
            </div>
        </>
    )
}

export default FirstDesignStep