import React from 'react';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { MainImgDiv } from './secondStepWorkspace';
import ThirdDesignCanvasBack from './thirdDesignCanvasBack';
import ThirdDesignCanvasFront from './thirdDesignCanvasFront';

interface ThirdDesignCanvasProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
};

const ThirdDesignCanvas: React.FC<ThirdDesignCanvasProps> = ({ readyProductData, chosenSide, productData }) => {
    let [isFrontMain, setIsFrontMain] = React.useState<boolean>();
    React.useEffect(() => {
        console.log(readyProductData)
        if (chosenSide != "back") {
            setIsFrontMain(true);
        } else {
            setIsFrontMain(false);
        }
    }, [])
    return (
        <div className="d-flex justify-content-center">
            {isFrontMain ?
                <ThirdDesignCanvasFront readyProductData={readyProductData} productData={productData} chosenSide={chosenSide} />
                :
                <ThirdDesignCanvasBack readyProductData={readyProductData} productData={productData} chosenSide={chosenSide} />
            }
        </div>
    )
}

export default ThirdDesignCanvas