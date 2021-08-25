import React from 'react';
import { Layer, Stage } from 'react-konva';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { MainImgDiv } from './secondStepWorkspace';
import { INewImagesDesign } from './thirdDesignCanvas';
import ThirdDesignCanvasImage from './thirdDesignCanvasImage';

interface ThirdDesignCanvasBackProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
    imagesDesignsAr: Partial<INewImagesDesign[]>;
    imagesCostumesAr: Partial<INewImagesDesign[]>;
};

const ThirdDesignCanvasBack: React.FC<ThirdDesignCanvasBackProps> = ({ imagesCostumesAr, imagesDesignsAr, readyProductData, chosenSide, productData }) => {
    return (
        <MainImgDiv id="mainImgDiv" style={{ backgroundImage: `url(${readyProductData.images?.backImage.image})` }}>
            <div className="d-flex justify-content-center">
                <Stage
                    // style={{ border: "1px solid black" }}
                    width={readyProductData.images?.backImage.width}
                    height={readyProductData.images?.backImage.height}
                >
                    <Layer>
                        {imagesDesignsAr.map((item?: Partial<INewImagesDesign>, i?: number) => {
                            return (
                                <>
                                    <ThirdDesignCanvasImage key={i} item={item} />
                                </>
                            )
                        })}
                        {imagesCostumesAr.map((item?: Partial<INewImagesDesign>, i?: number) => {
                            return (
                                <>
                                    <ThirdDesignCanvasImage key={i} item={item} />
                                </>
                            )
                        })}
                    </Layer>
                </Stage>
            </div>
        </MainImgDiv>
    )
}

export default ThirdDesignCanvasBack