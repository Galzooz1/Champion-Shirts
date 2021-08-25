import React from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { Front, IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { MainImgDiv } from './secondStepWorkspace';
import { INewImagesDesign } from './thirdDesignCanvas';
import ThirdDesignCanvasImage from './thirdDesignCanvasImage';

interface ThirdDesignCanvasFrontProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
    imagesDesignsAr: Partial<INewImagesDesign[]>;
    imagesCostumesAr: Partial<INewImagesDesign[]>;
};

const ThirdDesignCanvasFront: React.FC<ThirdDesignCanvasFrontProps> = ({ imagesCostumesAr, imagesDesignsAr, readyProductData, chosenSide, productData }) => {

    // React.useEffect( () => { 
    //     // const interval = setInterval(() => {

    //     //     console.log(designsLength);
    //     //     console.log(costumesLength);
    //     //     console.log(imagesDesignsAr);

    //     // }, 500)
    //     readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
    //         if(item.design?.designImage){
    //             designsLength++;
    //         }
    //         if(item.costume?.costumeImage){
    //             costumesLength++;
    //         }
    //     })
    //     // for (let i = 0; i < designsLength; i++) {
    //         // alert("work")
    //         // setImagesDesignsAr([...imagesDesignsAr, {...newImage(readyProductData.shirtDesigns?.front[i].design?.designImage, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.width, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.height,readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.x, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.y, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.rotation)}])
    //     // }
    //     // initialImages();
    //     console.log(imagesDesignsAr);
    //     console.log(images_design_ar);
    //     console.log(images_costume_ar);
    // },[]);
    return (
        <>
            <MainImgDiv id="mainImgDiv" style={{ backgroundImage: `url(${readyProductData.images?.frontImage.image})` }}>
                <div className="d-flex justify-content-center">
                    <Stage
                        // style={{ border: "1px solid black" }}
                        width={readyProductData.images?.frontImage.width}
                        height={readyProductData.images?.frontImage.height}
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