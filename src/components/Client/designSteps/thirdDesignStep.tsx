import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import ThirdDesignCanvas from './thirdDesignCanvas';

interface ThirdDesignStepProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
    isWish:boolean;
    isCart:boolean;
    setIsWish?:any;
    setIsCart?:any;
    // setIsAddToCart?:any;
    setIsAddToWish?:any;
};

const ThirdDesignStep: React.FC<ThirdDesignStepProps> = ({ setIsAddToWish ,setIsCart ,setIsWish ,isCart ,isWish ,readyProductData, chosenSide, productData }) => {
    let dispatch = useDispatch();
    // let isCart = useSelector<RootStateOrAny, boolean>(myStore => myStore.isCart);
    // let isWish = useSelector<RootStateOrAny, boolean>(myStore => myStore.isWish);


    return (
        <div style={{ height: "600px" }} className="d-flex justify-content-around shadow p-3">
            <div className="col-lg-6">
                <div className="text-start m-5 ps-5">
                    <h2 className="my-3">{readyProductData.product_name}</h2>
                    <h5 className="my-3">{readyProductData.info}</h5>
                    <div className="d-flex my-3">
                        <h5 className="me-3">Color</h5> 
                        <button disabled className="shadow rounded-circle" style={{width:"30px", height:"30px", backgroundColor:`${readyProductData.color}`}}></button>
                    </div>
                    <div className="d-flex">
                        <h5 className="me-3">Size</h5> 
                        <button disabled className="shadow text-dark" style={{width:"30px", height:"30px"}}>{readyProductData.size}</button>
                    </div>
                    <h4 className="my-3">{readyProductData.price?.toFixed(2)} $</h4>
                </div>
            </div>
            <div className="col-lg-6">
                <ThirdDesignCanvas readyProductData={readyProductData} chosenSide={chosenSide} />
            </div>
        </div>
    )
}

export default ThirdDesignStep