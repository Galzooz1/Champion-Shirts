import React from 'react';
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

    return (
        <div style={{ height: "600px",fontFamily:"Alata" }} className="d-flex justify-content-around p-3 container">
            <div className="col-lg-6">
                <div className="text-start m-5 ps-5">
                <h2 className="text-start fw-bolder">{productData?.name}</h2>
                    <div className="text-start fw-bold">{productData?.info}
                        <br />
                        Machine Wash
                        <br />
                        100% Cotton
                        <br />
                        Imported
                    </div>
                    <div className="d-flex my-3">
                        <h5 className="me-3">Color</h5> 
                        <button disabled className="shadow rounded-circle" style={{width:"30px", height:"30px", backgroundColor:`${readyProductData.color}`}}></button>
                    </div>
                    <div className="d-flex">
                        <h5 className="me-3">Size</h5> 
                        <button disabled className="shadow text-dark" style={{minWidth:"30px", height:"30px"}}>{readyProductData.size}</button>
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