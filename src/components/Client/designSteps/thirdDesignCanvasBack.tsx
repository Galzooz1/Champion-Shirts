import React from 'react';
import { Layer, Stage } from 'react-konva';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { URL_API } from '../../services/apiService';
import { MainImgDiv } from './secondStepWorkspace';
import { INewImagesDesign } from './thirdDesignCanvas';
import ThirdDesignCanvasImage from './thirdDesignCanvasImage';

interface ThirdDesignCanvasBackProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide?: string;
    imagesDesignsAr: Partial<INewImagesDesign[]>;
    imagesCostumesAr: Partial<INewImagesDesign[]>;
};

const ThirdDesignCanvasBack: React.FC<ThirdDesignCanvasBackProps> = ({ imagesCostumesAr, imagesDesignsAr, readyProductData, chosenSide }) => {
    return (
        <MainImgDiv id="mainImgDiv" style={{
            backgroundImage:
                readyProductData.images?.backImage.image.includes("http") ?
                    `url(${readyProductData.images?.backImage.image})`
                    :
                    `url(${URL_API + readyProductData.images?.backImage.image + "?"})`
        }}>
            <div className="d-flex justify-content-center">
                <Stage
                    style={{
                    position: "relative", left:
                            readyProductData.images?.backImage.x,
                        top: readyProductData.images?.backImage.y
                    }}
                    width={readyProductData.images?.backImage.width
                    }
                    height={readyProductData.images?.backImage.height
                    }
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