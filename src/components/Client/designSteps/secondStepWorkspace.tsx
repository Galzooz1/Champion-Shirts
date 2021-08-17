import React from 'react';
import { Layer, Stage } from 'react-konva';
import styled from 'styled-components';
import { IDesigns } from '../../Admin/interfaces/designs';
import { IProdItems, Property } from '../../Admin/interfaces/prodItems';
// import { IDesignsArr } from './secondStepApp';
import SecondStepImage from './secondStepImage';

interface SecondStepWorkspaceProps {
    productData: Partial<IProdItems>;
    propertiesData: Partial<Property[]>;
    designsData: Partial<IDesigns[]>;
    indexPicked: number;
    // DesignsArr: IDesignsArr[];
    isDesignClicked:boolean;
    designsAr:any[];
    setDesignAr?:any;
};

const MainImgDiv = styled.div`
border: 1px solid red;
background-position:center top;
width: 500px;
height: 500px;
padding-top: 100px;
`;

const SecondImgDiv = styled.div`
width:150px;
height:150px;
border:1px solid black;
margin-left: 6px;
`;

const SecondImgImg = styled.img`
width:100%;
height:100%;
`;

const SecondStepWorkspace: React.FC<SecondStepWorkspaceProps> = ({designsAr, setDesignAr ,productData, propertiesData, indexPicked, designsData, isDesignClicked}) => {
    let [isFrontMain, setIsFrontMain] = React.useState<boolean>(true);
    let stageRef = React.useRef<any>();
    const [selectedDesign, setSelectDesign] = React.useState<any>();

    const changeMainImg = () => { 
        setIsFrontMain(wasFrontMain => !wasFrontMain);
    }

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectDesign(null)
        }
    }
    return(
        <div className="d-flex justify-content-center">
            <MainImgDiv style={{backgroundImage:isFrontMain ? `url(${propertiesData[indexPicked]?.frontImg})` : `url(${propertiesData[indexPicked]?.backImg})`}}>
                <div className="d-flex justify-content-center">
                    <Stage
                    style={{border:"1px solid black"}}
                    width={propertiesData[indexPicked]?.sizeOfCanvasFront.width}
                    height={propertiesData[indexPicked]?.sizeOfCanvasFront.height}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    ref={stageRef}
                    >
                        <Layer>
                            {isDesignClicked ? 
                            <>
                            {designsAr.map((item, key) => {
                                return(
                                    <React.Fragment key={key}>
                                    <SecondStepImage
                                    key={key}
                                    designProps={item}
                                    isSelected={key === selectedDesign}
                                    onSelect={() => {
                                        setSelectDesign(key)
                                    }}
                                    onChange={(newAttrs) => {
                                        const imgs = designsAr.slice();
                                        imgs[key] = newAttrs;
                                        setDesignAr(imgs);
                                    }}
                                    />
                                    </React.Fragment>
                                    )
                                })}
                            </>
                            : null}
                                </Layer>
                    </Stage>
                </div>
            </MainImgDiv>
            <SecondImgDiv onClick={changeMainImg}>
                <SecondImgImg src={isFrontMain ? propertiesData[indexPicked]?.backImg : propertiesData[indexPicked]?.frontImg} alt={propertiesData[indexPicked]?._id}/>
            </SecondImgDiv>
        </div>
    )
}

export default SecondStepWorkspace