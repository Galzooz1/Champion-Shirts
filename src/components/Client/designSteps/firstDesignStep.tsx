import React from 'react';
import styled from 'styled-components';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import Slider from "react-slick";
import FirstDesignStepCarousel from './firstDesignStepCarousel';
import { useHistory } from 'react-router-dom';

interface FirstDesignStepProps {
    errors: any;
    register: any;
    productData: Partial<IProdItems>;
    indexPickedCallBack:(_value: number) => void;
};

const SizeInput = styled.input`
		position: absolute;
		left: -9999px;
		&:checked + span {
			background-color: mix(#fff, #00005c, 84%);
			&:before {
				box-shadow: inset 0 0 0 0.4375em #00005c;
			}
		}
`;

const SizeLabel = styled.label`
display: flex;
	cursor: pointer;
	font-weight: 500;
	position: relative;
	overflow: hidden;
	margin-bottom: 0.375em;
`;

const SizeSpan = styled.span`
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

const FirstDesignStep: React.FC<FirstDesignStepProps> = ({ productData, errors, register, indexPickedCallBack }) => {
    let [indexPicked, setIndexPicked] = React.useState<number>(555);
    let history = useHistory();
    React.useEffect(() => {
        // console.log(JSON.stringify(productData));
        // initialArray()
    }, []);
    const handleChange = (i: number) => {
        setIndexPicked(i)
        indexPickedCallBack(i);
    }

    return (
        <>
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
                                            name="color" id="properties.color" onInput={() => handleChange(i)}
                                            className="form-check-input border border-dark rounded-circle m-1" style={{ backgroundColor: `${item?.color}`, width: "30px", height: "30px" }} data-tip={`${item?.color}`} />
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
                    <div>
                        <h3>Price: {productData?.price} $</h3>
                    </div>
                </div>
                <div>
                    {indexPicked === 555 ?
                        <img className="border rounded-2 shadow mb-4" width="300px" src={productData.image} alt={productData?.name} />
                        :
                        <FirstDesignStepCarousel productData={productData} indexPicked={indexPicked} />
                    }
                </div>
            </div>
        </>
    )
}

export default FirstDesignStep