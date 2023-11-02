import React from 'react';
import { Front, IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { URL_API } from '../../services/apiService';
import { ImageHover, ImageWrapper } from '../userDesigns';
import ThirdDesignCanvasBack from './thirdDesignCanvasBack';
import ThirdDesignCanvasFront from './thirdDesignCanvasFront';

interface ThirdDesignCanvasProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide?: string;
};

export interface INewImagesDesign {
    image: any;
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
}

const newImage = (_image: any, _width: any, _height: any, _x: any, _y: any, _rotation: any) => ({
    image: _image,
    width: _width,
    height: _height,
    x: _x,
    y: _y,
    rotation: _rotation,
})


const ThirdDesignCanvas: React.FC<ThirdDesignCanvasProps> = ({ readyProductData, chosenSide }) => {
    let [isFrontMain, setIsFrontMain] = React.useState<boolean>();
    let [imagesDesignsAr, setImagesDesignsAr] = React.useState<Partial<INewImagesDesign[]>>([]);
    let [imagesCostumesAr, setImagesCostumesAr] = React.useState<Partial<INewImagesDesign[]>>([]);
    let designsLength: number = 0;
    let costumesLength: number = 0;
    React.useEffect(() => {
        if (chosenSide !== "back") {
            //determine the length of design or costume
            readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
                if (item.design?.designImage) {
                    designsLength++;
                }
                if (item.costume?.costumeImage) {
                    costumesLength++;
                }
            })
            // set Designs Images for front side
            for (let i = 0; i < designsLength; i++) {
                let myImage = newImage(readyProductData.shirtDesigns?.front[i].design?.designImage, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.width, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.height, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.x, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.y, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.rotation)
                setImagesDesignsAr(imagesDesignsAr => [...imagesDesignsAr, { ...myImage }]);
            }
            // set Costumes Images for front side
            for (let i = 0; i < costumesLength; i++) {
                let myImage = newImage(readyProductData.shirtDesigns?.front[i].costume?.costumeImage, readyProductData.shirtDesigns?.front[i].costume?.sizeOfCostume?.width, readyProductData.shirtDesigns?.front[i].costume?.sizeOfCostume?.height, readyProductData.shirtDesigns?.front[i].costume?.positionOfCostume?.x, readyProductData.shirtDesigns?.front[i].costume?.positionOfCostume?.y, readyProductData.shirtDesigns?.front[i].costume?.positionOfCostume?.rotation)
                setImagesCostumesAr(imagesCostumesAr => [...imagesCostumesAr, { ...myImage }]);
            }
            setIsFrontMain(true);
        } else {
            //determine the length of design or costume
            readyProductData.shirtDesigns?.back.map((item: Partial<Front>, i: number) => {
                if (item.design?.is_design) {
                    designsLength++;
                }
                if (item.costume?.is_costume) {
                    costumesLength++;
                }
            })
            // set Designs Images for back side
            for (let i = 0; i < designsLength; i++) {
                let myImage = newImage(readyProductData.shirtDesigns?.back[i].design?.designImage, readyProductData.shirtDesigns?.back[i].design?.sizeOfDesign?.width, readyProductData.shirtDesigns?.back[i].design?.sizeOfDesign?.height, readyProductData.shirtDesigns?.back[i].design?.positionOfDesign?.x, readyProductData.shirtDesigns?.back[i].design?.positionOfDesign?.y, readyProductData.shirtDesigns?.back[i].design?.positionOfDesign?.rotation)
                setImagesDesignsAr(imagesDesignsAr => [...imagesDesignsAr, { ...myImage }]);
            }
            // set Costumes Images for back side
            for (let i = 0; i < costumesLength; i++) {
                let myImage = newImage(readyProductData.shirtDesigns?.back[i].costume?.costumeImage, readyProductData.shirtDesigns?.back[i].costume?.sizeOfCostume?.width, readyProductData.shirtDesigns?.back[i].costume?.sizeOfCostume?.height, readyProductData.shirtDesigns?.back[i].costume?.positionOfCostume?.x, readyProductData.shirtDesigns?.back[i].costume?.positionOfCostume?.y, readyProductData.shirtDesigns?.back[i].costume?.positionOfCostume?.rotation)
                setImagesCostumesAr(imagesCostumesAr => [...imagesCostumesAr, { ...myImage }]);
            }
            setIsFrontMain(false);
        }
    }, [readyProductData])
    if(!imagesDesignsAr || !imagesCostumesAr) return null;
    return (
        <div className="d-flex justify-content-center">
            <ImageWrapper>
            {isFrontMain ?
                <>
                <ThirdDesignCanvasFront imagesCostumesAr={imagesCostumesAr} imagesDesignsAr={imagesDesignsAr} readyProductData={readyProductData} chosenSide={chosenSide} />
                
                <ImageHover 
                src={readyProductData?.images?.backImage.image.includes("http") ?
                 readyProductData?.images?.backImage.image
                 :
                 URL_API + readyProductData?.images?.backImage.image + "?" + Date.now()
                } style={{ height: 500, width: 500 }} />
                </>
                :
                <>
                <ThirdDesignCanvasBack imagesCostumesAr={imagesCostumesAr} imagesDesignsAr={imagesDesignsAr} readyProductData={readyProductData} chosenSide={chosenSide} />
                <ImageHover
                 src={readyProductData?.images?.frontImage.image.includes("http") ?
                 readyProductData?.images?.frontImage.image
                 :
                 URL_API + readyProductData?.images?.frontImage.image + "?" + Date.now()
                }
                  style={{ height: 500, width: 500 }} />
                </>
            }
            </ImageWrapper>
        </div>
    )
}

export default ThirdDesignCanvas