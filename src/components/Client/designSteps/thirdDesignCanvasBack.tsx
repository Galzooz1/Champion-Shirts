import React from 'react';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { MainImgDiv } from './secondStepWorkspace';

interface ThirdDesignCanvasBackProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
};

const ThirdDesignCanvasBack: React.FC<ThirdDesignCanvasBackProps> = ({ readyProductData, chosenSide, productData }) => {
    return(
        <MainImgDiv id="mainImgDiv" style={{ backgroundImage: `url(${readyProductData.images?.backImage.image})` }}>

            ThirdDesignCanvas work
        </MainImgDiv>
    )
}

export default ThirdDesignCanvasBack