import React from 'react';
import { Layer, Stage } from 'react-konva';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { Front ,IReadyproducts } from '../../Admin/interfaces/readyproducts';
import { MainImgDiv } from './secondStepWorkspace';

interface ThirdDesignCanvasFrontProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
};

const newImage = (_image: any, _width: any, _height: any, _x:any, _y:any, _rotation:any) => ({
    image: _image,
    width: _width,
    height: _height,
    x: _x,
    y: _y,
    rotation: _rotation,
})

const ThirdDesignCanvasFront: React.FC<ThirdDesignCanvasFrontProps> = ({ readyProductData, chosenSide, productData }) => {
    let [imagesDesignsAr, setImagesDesignsAr] = React.useState<Partial<any[]>>([]);
    let [imagesCostumesAr, setImagesCostumesAr] = React.useState<Partial<any[]>>([{}]);
    let designsLength: number = 0;
    let costumesLength: number = 0;
    let images_design_ar = new Array();
    let images_costume_ar = new Array();

    React.useEffect( () => { 
        // const interval = setInterval(() => {

        //     console.log(designsLength);
        //     console.log(costumesLength);
        //     console.log(imagesDesignsAr);
            
        // }, 500)
        readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
            if(item.design?.designImage){
                designsLength++;
            }
            if(item.costume?.costumeImage){
                costumesLength++;
            }
        })
        // for (let i = 0; i < designsLength; i++) {
            // alert("work")
            // setImagesDesignsAr([...imagesDesignsAr, {...newImage(readyProductData.shirtDesigns?.front[i].design?.designImage, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.width, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.height,readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.x, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.y, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.rotation)}])
        // }
        // initialImages();
        console.log(imagesDesignsAr);
        console.log(images_design_ar);
        console.log(images_costume_ar);
    },[]);
    
    
    const initialImages = () => { 
        // readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
        //     if(item.design?.designImage){
        //         designsLength++;
        //     }
        //     if(item.costume?.costumeImage){
        //         costumesLength++;
        //     }
        // })
        
        // for (let i = 0; i < designsLength; i++) {
        //     alert("work")
        //     setImagesDesignsAr([...imagesDesignsAr, {...newImage(readyProductData.shirtDesigns?.front[i].design?.designImage, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.width, readyProductData.shirtDesigns?.front[i].design?.sizeOfDesign?.height,readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.x, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.y, readyProductData.shirtDesigns?.front[i].design?.positionOfDesign?.rotation)}])
        // }

        // readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
            //     setImagesDesignsAr([...imagesDesignsAr, {...newImage(item.design?.designImage, item.design?.sizeOfDesign?.width, item.design?.sizeOfDesign?.height,item.design?.positionOfDesign?.x, item.design?.positionOfDesign?.y, item.design?.positionOfDesign?.rotation)}])
        // })
        // console.log(imagesDesignsAr);
        // readyProductData.shirtDesigns?.front.map((item: Partial<Front>, i: number) => {
        //     images_costume_ar.push(item.costume?.costumeImage);
        // })
        console.log(images_design_ar);
    }
    return (
        <MainImgDiv id="mainImgDiv" style={{ backgroundImage: `url(${readyProductData.images?.frontImage.image})` }}>
            <div className="d-flex justify-content-center">
                <Stage
                    style={{ border: "1px solid black" }}
                    width={readyProductData.images?.frontImage.width}
                    height={readyProductData.images?.frontImage.height}
                >
                    <Layer>

                    </Layer>
                </Stage>
            </div>
            ThirdDesignCanvas work
        </MainImgDiv>
    )
}

export default ThirdDesignCanvasFront