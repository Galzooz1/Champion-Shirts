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
    isDesignClicked: boolean;
    designsAr: any[];
    setDesignAr?: any;
    filesAr: any;
    setFilesAr?: any;
    isImageFileClicked: boolean;
    register: any;
    errors: any;
    setValue?: any;
    chosenSide?: string;
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

const SecondStepWorkspace: React.FC<SecondStepWorkspaceProps> = ({ chosenSide, setValue, errors, register, isImageFileClicked, filesAr, setFilesAr, designsAr, setDesignAr, productData, propertiesData, indexPicked, designsData, isDesignClicked }) => {
    let [isFrontMain, setIsFrontMain] = React.useState<boolean>();
    let stageRef = React.useRef<any>();
    const [selectedDesign, setSelectDesign] = React.useState<any>();
    let [designWidth, setDesignWidth] = React.useState<number>();
    let [designHeight, setDesignHeight] = React.useState<number>();
    let [designX, setDesignX] = React.useState<number>();
    let [designY, setDesignY] = React.useState<number>();
    let [designRotation, setDesignRotation] = React.useState<number>();

    React.useEffect(() => {
        if (chosenSide != "back") {
            setIsFrontMain(true);
        } else {
            setIsFrontMain(false);
        }
    }, []);


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

    const SetStatesValues = (_width: any, _height: any, _x: any, _y: any, _rotation: any) => {
        setDesignWidth(_width);
        setDesignHeight(_height);
        setDesignX(_x);
        setDesignY(_y);
        setDesignRotation(_rotation);
    }

    const setValuesAndContinue = () => {
        setValue("")
    }

    const renderRegisterForm = () => {
        console.log("work")
    }
    return (
        <>
            <div className="d-flex justify-content-center">
                <MainImgDiv style={{ backgroundImage: isFrontMain ? `url(${propertiesData[indexPicked]?.frontImg})` : `url(${propertiesData[indexPicked]?.backImg})` }}>
                    <div className="d-flex justify-content-center">
                        <Stage
                            style={{ border: "1px solid black" }}
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
                                            return (
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
                                                        SetStatesValues={SetStatesValues}
                                                    />
                                                    {/* Design */}
                                                    {chosenSide === "front" && 
                                                    <>
                                                    {key ?
                                                     <input {...register(`shirtDesigns.front[${key}].design.is_design`, { required: false })} value={true} className="d-none" name={`shirtDesigns.front[${key}].design.is_design`} id="id_design" />
                                                     :
                                                     <input {...register(`shirtDesigns.front[${key}].design.is_design`, { required: false })} value={false} className="d-none" name={`shirtDesigns.front[${key}].design.is_design`} id="id_design" />
                                                      }
                                                    <input className="d-none" name="design_s_id" />
                                                    <input className="d-none" name="designImage" />
                                                    <input className="d-none" name="width" />
                                                    <input className="d-none" name="height" />
                                                    <input className="d-none" name="x" />
                                                    <input className="d-none" name="y" />
                                                    </>
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </>
                                    : null}
                                {isImageFileClicked ?
                                    <>
                                        {filesAr.map((item: any, i: any) => {
                                            // key += 10;
                                            // if(key === 0){
                                            //     key=100;
                                            //     // --key;
                                            // }
                                            // key *= -1;
                                            return (
                                                <React.Fragment key={i + 100}>
                                                    <SecondStepImage
                                                        key={i + 100}
                                                        designProps={item}
                                                        isSelected={i + 100 === selectedDesign}
                                                        onSelect={() => {
                                                            setSelectDesign(i + 100)
                                                        }}
                                                        onChange={(newAttrs) => {
                                                            const imgs = filesAr.slice();
                                                            imgs[i] = newAttrs;
                                                            setFilesAr(imgs);
                                                        }}
                                                        SetStatesValues={SetStatesValues}
                                                    />
                                                    {/* Costume */}
                                                    <input className="d-none" name="is_costume" />
                                                    <input className="d-none" name="costumeImage" />
                                                    <input className="d-none" name="width" />
                                                    <input className="d-none" name="height" />
                                                    <input className="d-none" name="x" />
                                                    <input className="d-none" name="y" />
                                                </React.Fragment>
                                            )
                                        })}
                                    </>
                                    : null
                                }
                            </Layer>
                        </Stage>
                    </div>
                </MainImgDiv>
                <SecondImgDiv onClick={chosenSide === "both" ? changeMainImg : () => console.log("work")}>
                    <SecondImgImg src={isFrontMain ? propertiesData[indexPicked]?.backImg : propertiesData[indexPicked]?.frontImg} alt={propertiesData[indexPicked]?._id} />
                </SecondImgDiv>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                {chosenSide === "both" ?
                    <button onClick={() => renderRegisterForm} type="button" className="btn btn-outline-success">Save and design back side</button>
                    :
                    <button onClick={() => renderRegisterForm} type="button" className="btn btn-outline-success">Save and continue</button>
                }
            </div>
        </>
    )
}

export default SecondStepWorkspace