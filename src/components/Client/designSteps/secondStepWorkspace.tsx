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
    reset?: any;
    unregister?: any;
    backFlag?: boolean;
};

export const MainImgDiv = styled.div`
border: 1px solid red;
background-position:center top;
background-size:cover;
width: 500px;
height: 500px;
padding-top: 100px;
`;

export const SecondImgDiv = styled.div`
width:150px;
height:150px;
border:1px solid black;
margin-left: 6px;
`;

export const SecondImgImg = styled.img`
width:100%;
height:100%;
`;

const SecondStepWorkspace: React.FC<SecondStepWorkspaceProps> = ({ backFlag ,unregister, reset, chosenSide, setValue, errors, register, isImageFileClicked, filesAr, setFilesAr, designsAr, setDesignAr, productData, propertiesData, indexPicked, designsData, isDesignClicked }) => {
    let [isFrontMain, setIsFrontMain] = React.useState<boolean>();
    let stageRef = React.useRef<any>();
    let [bothSidesStep, setBothSidesStep] = React.useState<number>(1);
    const [selectedDesign, setSelectDesign] = React.useState<any>();

    React.useEffect(() => {
                // Front
                setValue("images.frontImage.image", propertiesData[indexPicked]?.frontImg);
                setValue("images.frontImage.width", propertiesData[indexPicked]?.sizeOfCanvasFront.width)
                setValue("images.frontImage.height", propertiesData[indexPicked]?.sizeOfCanvasFront.height)
                setValue("images.frontImage.x", propertiesData[indexPicked]?.positionOfCanvasFront.x)
                setValue("images.frontImage.y", propertiesData[indexPicked]?.positionOfCanvasFront.y)
                // Back
                setValue("images.backImage.image", propertiesData[indexPicked]?.backImg);
                setValue("images.backImage.width", propertiesData[indexPicked]?.sizeOfCanvasBack.width)
                setValue("images.backImage.height", propertiesData[indexPicked]?.sizeOfCanvasBack.height)
                setValue("images.backImage.x", propertiesData[indexPicked]?.positionOfCanvasBack.x)
                setValue("images.backImage.y", propertiesData[indexPicked]?.positionOfCanvasBack.y)
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

    const SetCordsValues = (_width: any, _height: any, _x: any, _y: any, _rotation: any, key: any, isDesign?: boolean, isCostume?: boolean) => {
        if (chosenSide === "front" || (chosenSide === "both" && bothSidesStep === 1)) {
            if (isDesign) {
                setValue(`shirtDesigns.front.${key}.design.sizeOfDesign.width`, _width);
                setValue(`shirtDesigns.front.${key}.design.sizeOfDesign.height`, _height);
                setValue(`shirtDesigns.front.${key}.design.positionOfDesign.x`, _x);
                setValue(`shirtDesigns.front.${key}.design.positionOfDesign.y`, _y);
                setValue(`shirtDesigns.front.${key}.design.positionOfDesign.rotation`, _rotation);
            }
            if (isCostume) {
                setValue(`shirtDesigns.front.${key}.costume.sizeOfCostume.width`, _width);
                setValue(`shirtDesigns.front.${key}.costume.sizeOfCostume.height`, _height);
                setValue(`shirtDesigns.front.${key}.costume.positionOfCostume.x`, _x);
                setValue(`shirtDesigns.front.${key}.costume.positionOfCostume.y`, _y);
                setValue(`shirtDesigns.front.${key}.costume.positionOfCostume.rotation`, _rotation);
            }
        }
        if (chosenSide === "back" || (chosenSide === "both" && bothSidesStep === 2)) {
            if (isDesign) {
                setValue(`shirtDesigns.back.[${key}].design.sizeOfDesign.width`, _width);
                setValue(`shirtDesigns.back.[${key}].design.sizeOfDesign.height`, _height);
                setValue(`shirtDesigns.back.[${key}].design.positionOfDesign.x`, _x);
                setValue(`shirtDesigns.back.[${key}].design.positionOfDesign.y`, _y);
                setValue(`shirtDesigns.back.[${key}].design.positionOfDesign.rotation`, _rotation);
            }
            if (isCostume) {
                setValue(`shirtDesigns.back.[${key}].costume.sizeOfCostume.width`, _width);
                setValue(`shirtDesigns.back.[${key}].costume.sizeOfCostume.height`, _height);
                setValue(`shirtDesigns.back.[${key}].costume.positionOfCostume.x`, _x);
                setValue(`shirtDesigns.back.[${key}].costume.positionOfCostume.y`, _y);
                setValue(`shirtDesigns.back.[${key}].costume.positionOfCostume.rotation`, _rotation);
            }
        }
    }

    const setValueIsDesignBoolean = (key: any, s_id?: any, image?: any, isDesign?: boolean, isCostume?: boolean) => {
        if (chosenSide === "front" || (chosenSide === "both" && bothSidesStep === 1)) {
            if (isDesign) {
                if (key != null && s_id != null) {
                    setValue(`shirtDesigns.front[${key}].design.is_design`, true);
                    setValue(`shirtDesigns.front[${key}].design.design_s_id`, s_id);
                    setValue(`shirtDesigns.front[${key}].design.designImage`, image);
                }
            }
            if (isCostume) {
                if (key != null) {
                    setValue(`shirtDesigns.front[${key}].costume.is_costume`, true);
                    setValue(`shirtDesigns.front[${key}].costume.costumeImage`, image);
                }
            }
        }
        if (chosenSide === "back" || (chosenSide === "both" && bothSidesStep === 2)) {
            if (isDesign) {
                if (key != null && s_id != null) {
                    setValue(`shirtDesigns.back[${key}].design.is_design`, true);
                    setValue(`shirtDesigns.back[${key}].design.design_s_id`, s_id);
                    setValue(`shirtDesigns.back[${key}].design.designImage`, image);
                }
            }
            if (isCostume) {
                if (key != null) {
                    setValue(`shirtDesigns.back[${key}].costume.is_costume`, true);
                    setValue(`shirtDesigns.back[${key}].costume.costumeImage`, image);
                }
            }

        }
    }

    const unRegisterFunc = (key: any, isDesign?: boolean, isCostume?: boolean) => {
        if (isDesign) {
            if (chosenSide === "front" || (chosenSide === "both" && bothSidesStep === 1)) {
                setValue(`shirtDesigns.front[${key}].design`, null)
            }
            if (chosenSide === "back" || (chosenSide === "both" && bothSidesStep === 2)) {
                setValue(`shirtDesigns.back[${key}].design`, null)
            }
        }
        if (isCostume) {
            if (chosenSide === "front" || (chosenSide === "both" && bothSidesStep === 1)) {
                setValue(`shirtDesigns.front[${key}].costume`, null)
            }
            if (chosenSide === "back" || (chosenSide === "both" && bothSidesStep === 2)) {
                setValue(`shirtDesigns.back[${key}].costume`, null)
            }
        }
    }

    const saveAndDesignBackBtn = () => {
        document.querySelector<HTMLElement>("#mainImgDiv")!.style.background = `url(${propertiesData[indexPicked]?.backImg})`
        setIsFrontMain(false);
        setBothSidesStep(2);
    }

    // const setValuesAndContinue = () => {
    //     setValue("")
    // }

    // const renderRegisterForm = () => {
    //     console.log("work")
    // }
    return (
        <>
            <div className="d-flex justify-content-center">
                <MainImgDiv id="mainImgDiv" style={{ backgroundImage: isFrontMain ? `url(${propertiesData[indexPicked]?.frontImg})` : `url(${propertiesData[indexPicked]?.backImg})` }}>
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
                                {(isDesignClicked || backFlag) ?
                                    <>
                                        {designsAr.map((item: any, key: any) => {
                                            let isDesign: boolean | undefined = true;
                                            return (
                                                <>
                                                    <SecondStepImage
                                                        key={key}
                                                        designProps={item}
                                                        isSelected={key === selectedDesign}
                                                        onSelect={() => {
                                                            console.log(key);
                                                            setSelectDesign(key)
                                                        }}
                                                        onChange={(newAttrs) => {
                                                            const imgs = designsAr.slice();
                                                            imgs[key] = newAttrs;
                                                            setDesignAr(imgs);
                                                        }}
                                                        unRegister={() => unRegisterFunc(key, isDesign)}
                                                        setIsDesignValue={() => setValueIsDesignBoolean(key, item.s_id, item.image, isDesign)}
                                                        SetStatesValues={(_width, _height, _x, _y, _rotation) => SetCordsValues(_width, _height, _x, _y, _rotation, key, isDesign)}
                                                        setValue={setValue}
                                                    />
                                                    {/* Design */}
                                                    {chosenSide === "front" || chosenSide === "both" &&
                                                        <>
                                                            <input {...register(`shirtDesigns.front.${key}.design.is_design`, { required: true })} className="d-none" id="id_design" />
                                                            <input {...register(`shirtDesigns.front.${key}.design.design_s_id`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.designImage`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.sizeOfDesign.width`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.sizeOfDesign.height`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.positionOfDesign.x`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.positionOfDesign.y`, { required: true })} className="d-none"  />
                                                            <input {...register(`shirtDesigns.front.${key}.design.positionOfDesign.rotation`, { required: true })} className="d-none"  />
                                                        </>
                                                    }
                                                    {chosenSide === "back" || chosenSide === "both" &&
                                                        <>
                                                            <input {...register(`shirtDesigns.back[${key}].design.is_design`, { required: true })} className="d-none" name={`shirtDesigns.back[${key}].design.is_design`} id="id_design" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.design_s_id`, { required: true })} className="d-none" name="design_s_id" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.designImage`, { required: true })} className="d-none" name="designImage" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.sizeOfDesign.width`, { required: true })} className="d-none" name="sizeOfDesign.width" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.sizeOfDesign.height`, { required: true })} className="d-none" name="sizeOfDesign.height" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.positionOfDesign.x`, { required: true })} className="d-none" name="positionOfDesign.x" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.positionOfDesign.y`, { required: true })} className="d-none" name="positionOfDesign.y" />
                                                            <input {...register(`shirtDesigns.back[${key}].design.positionOfDesign.rotation`, { required: true })} className="d-none" name="positionOfDesign.rotation" />
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </>
                                    : null}
                                {isImageFileClicked ?
                                    <>
                                        {filesAr.map((item: any, i: any) => {
                                            let isCostume: boolean | undefined = true;
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
                                                        unRegister={() => unRegisterFunc(i, undefined, isCostume)}
                                                        setIsDesignValue={() => setValueIsDesignBoolean(i, undefined, item.image, undefined, isCostume)}
                                                        SetStatesValues={(_width, _height, _x, _y, _rotation) => SetCordsValues(_width, _height, _x, _y, _rotation, i, undefined, isCostume)}
                                                        setValue={setValue}
                                                    />
                                                    {/* {chosenSide === "front" || chosenSide === "both" &&
                                                        <>
                                                            <input {...register(`shirtDesigns.front[${i}].costume.is_costume`, { required: true })} className="d-none" name="is_costume" id="id_costume" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.costumeImage`, { required: true })} className="d-none" name="costumeImage" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.sizeOfCostume.width`, { required: true })} className="d-none" name="sizeOfCostume.width" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.sizeOfCostume.height`, { required: true })} className="d-none" name="sizeOfCostume.height" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.positionOfCostume.x`, { required: true })} className="d-none" name="positionOfCostume.x" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.positionOfCostume.y`, { required: true })} className="d-none" name="positionOfCostume.y" />
                                                            <input {...register(`shirtDesigns.front[${i}].costume.positionOfCostume.rotation`, { required: true })} className="d-none" name="positionOfCostume.rotation" />
                                                        </>
                                                    }
                                                    {chosenSide === "back" || chosenSide === "both" &&
                                                        <>
                                                            <input {...register(`shirtDesigns.back[${i}].costume.is_costume`, { required: true })} className="d-none" name="is_costume" id="id_costume" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.costumeImage`, { required: true })} className="d-none" name="costumeImage" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.sizeOfCostume.width`, { required: true })} className="d-none" name="sizeOfCostume.width" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.sizeOfCostume.height`, { required: true })} className="d-none" name="sizeOfCostume.height" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.positionOfCostume.x`, { required: true })} className="d-none" name="positionOfCostume.x" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.positionOfCostume.y`, { required: true })} className="d-none" name="positionOfCostume.y" />
                                                            <input {...register(`shirtDesigns.back[${i}].costume.positionOfCostume.rotation`, { required: true })} className="d-none" name="positionOfCostume.rotation" />
                                                        </>
                                                    } */}
                                                </React.Fragment>
                                            )
                                        })}
                                    </>
                                    : null
                                }
                            </Layer>
                            {(chosenSide === "both" && bothSidesStep === 2) &&
                                <Layer>
                                    {isDesignClicked ?
                                        <>
                                            {designsAr.map((item: any, key: any) => {
                                                let isDesign: boolean | undefined = true;
                                                return (
                                                    <>
                                                        <SecondStepImage
                                                            key={key}
                                                            designProps={item}
                                                            isSelected={key === selectedDesign}
                                                            onSelect={() => {
                                                                console.log(key);
                                                                setSelectDesign(key)
                                                            }}
                                                            onChange={(newAttrs) => {
                                                                const imgs = designsAr.slice();
                                                                imgs[key] = newAttrs;
                                                                setDesignAr(imgs);
                                                            }}
                                                            unRegister={() => unRegisterFunc(key, isDesign)}
                                                            setIsDesignValue={() => setValueIsDesignBoolean(key, item.s_id, item.image, isDesign)}
                                                            SetStatesValues={(_width, _height, _x, _y, _rotation) => SetCordsValues(_width, _height, _x, _y, _rotation, key, isDesign)}
                                                            setValue={setValue}
                                                        />
                                                    </>
                                                )
                                            })}
                                        </>
                                        : null}
                                    {isImageFileClicked ?
                                        <>
                                            {filesAr.map((item: any, i: any) => {
                                                let isCostume: boolean | undefined = true;
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
                                                            unRegister={() => unRegisterFunc(i, undefined, isCostume)}
                                                            setIsDesignValue={() => setValueIsDesignBoolean(i, undefined, item.image, undefined, isCostume)}
                                                            SetStatesValues={(_width, _height, _x, _y, _rotation) => SetCordsValues(_width, _height, _x, _y, _rotation, i, undefined, isCostume)}
                                                            setValue={setValue}
                                                        />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </>
                                        : null
                                    }
                                </Layer>
                            }
                        </Stage>
                    </div>
                </MainImgDiv>
                <SecondImgDiv /*onClick={chosenSide === "both" ? changeMainImg : () => null}*/>
                    <SecondImgImg src={isFrontMain ? propertiesData[indexPicked]?.backImg : propertiesData[indexPicked]?.frontImg} alt={propertiesData[indexPicked]?._id} />
                </SecondImgDiv>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                {chosenSide === "both" &&
                    <button onClick={() => saveAndDesignBackBtn()} type="button" className="btn btn-outline-success">Save and design back side</button>
                }
            </div>
        </>
    )
}

export default SecondStepWorkspace