import React from 'react';
import { Layer, Stage } from 'react-konva';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { URL_API } from '../../services/apiService';
import { MainImgDiv } from './secondStepWorkspace';
import { INewImagesDesign } from './thirdDesignCanvas';
import ThirdDesignCanvasImage from './thirdDesignCanvasImage';

interface ThirdDesignCanvasFrontProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide?: string;
    imagesDesignsAr: Partial<INewImagesDesign[]>;
    imagesCostumesAr: Partial<INewImagesDesign[]>;
};

const ThirdDesignCanvasFront: React.FC<ThirdDesignCanvasFrontProps> = ({ imagesCostumesAr, imagesDesignsAr, readyProductData }) => {
    return (
        <>
            <MainImgDiv id="mainImgDiv" style={{ backgroundImage:
            readyProductData.images?.frontImage.image.includes("http") ?
                 `url(${readyProductData.images?.frontImage.image})` 
                 :
                 `url(${URL_API + readyProductData.images?.frontImage.image + "?"})`
                 }}>
                <div className="d-flex justify-content-center">
                    <Stage
                            style={{position:"relative"
                            , left:
                            readyProductData.images?.frontImage.x,
                            top:
                            readyProductData.images?.frontImage.y
                            }}
                            width={
                                readyProductData.images?.frontImage.width
                            }
                            height={
                                readyProductData.images?.frontImage.height
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
        </>
    )
}

export default ThirdDesignCanvasFront