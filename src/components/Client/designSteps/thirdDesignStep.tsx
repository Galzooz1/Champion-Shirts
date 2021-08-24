import React from 'react';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import ThirdDesignCanvas from './thirdDesignCanvas';

interface ThirdDesignStepProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
};

const ThirdDesignStep: React.FC<ThirdDesignStepProps> = ({readyProductData, chosenSide, productData}) => {
    return(
        <div style={{height:"600px"}} className="d-flex justify-content-around shadow p-3">

            <div className="col-lg-6">

            ThirdDesignStep work
            {readyProductData.product_name}

            </div>
            <div className="col-lg-6">
            <ThirdDesignCanvas readyProductData={readyProductData} productData={productData} chosenSide={chosenSide} />
            </div>
        </div>
    )
}

export default ThirdDesignStep