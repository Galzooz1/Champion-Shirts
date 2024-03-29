import React from 'react';
import styled from 'styled-components';
import { IDesigns } from '../../Admin/interfaces/designs';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import DesignsPng from '../../../assets/designs.png';
import UploadsPng from '../../../assets/upload.png';
import PremiumPng from '../../../assets/diamond.png';
import { URL_API } from '../../services/apiService';

interface SecondStepPanelProps {
    productData: Partial<IProdItems>;
    designsData: Partial<IDesigns[]>;
    handleDesignClicked: (_image: any, _height: any, _width: any, _name: any, _s_id: any) => void;
    setSelectedFiles?: any;
    selectedFiles: any[];
    handleFileClicked: (_image: any) => void;
    premuimExtraPrice:(_price: number, _clicks: number) => void;
};

const RightSideDiv = styled.div`
flex:1;
display: flex;
align-items: center;
max-width: 35%;
`;

const LeftSideDiv = styled.div`
flex:1;
display: flex;
flex-direction: column;
`;

const MethodsDiv = styled.div`
/* min-height:100%; */
flex: 1;
height: 500px;
display: block;
border:1px solid black;
border-radius: 10px;
padding:12px;
background-color: #F9D2D4;
color:black;
font-weight: bolder;
font-family: Alata;
margin-right: 16px;
overflow-y: auto;
&::-webkit-scrollbar{
    width:0.3em;
  }
  &::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #D4AA70;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 100px;
    /* background-color: darkgrey; */
    background-image: linear-gradient(180deg, #D0368A 0%, #708AD4 99%);

  outline: 1px solid slategrey;
  }
`;

const DesignsDiv = styled.div`
height: 450px;
width: 100%;
display:flex;
align-content: flex-start;
/* align-items: flex-start; */
flex-wrap: wrap;
/* flex-direction: column; */
justify-content: center;
padding:12px;
/* border:1px solid black; */
overflow-y: auto;
&::-webkit-scrollbar{
    width:0.3em;
  }
  &::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #D4AA70;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 100px;
    /* background-color: darkgrey; */
    background-image: linear-gradient(180deg, #D0368A 0%, #708AD4 99%);

  outline: 1px solid slategrey;
  }
`;

const DesignBox = styled.div`
min-height:118px;
min-width:118px;
border:1px solid black;
padding:8px;
border-radius: 5px;
height: fit-content;
width: fit-content;
margin: 6px;
`;

const ArrowDiv = styled.div`
/* flex: 0 0 60%; */
display: flex;
justify-content: center;
align-items: center;
height: 60px;
`;

const SecondStepPanel: React.FC<SecondStepPanelProps> = ({ premuimExtraPrice ,setSelectedFiles, selectedFiles, productData, designsData, handleDesignClicked, handleFileClicked }) => {
    let [chooseMethod, setChooseMethod] = React.useState<number>(0);
    let [isImageUploaded, setIsImageUploaded] = React.useState<boolean>(false);
    let [premiumClicks, setPremiumClicks] = React.useState<number>(0);
    const fileRef = React.useRef<any>(null);
    const UploadedImageRef = React.useRef<any>(null);
    // const [ selectedFiles, setSelectedFiles ] = React.useState<any[]>([]);

    React.useEffect(() => {

    }, [selectedFiles]);

    //Method 1

    // const handleImageUpload = (e: any) => {
    //     const [file] = e.target.files;
    //     if (file) {
    //         let newState = [...files, file];
    //         const reader = new FileReader();
    //         const { current } = UploadedImageRef;
    //         current.file = file;
    //         reader.onload = e => {
    //             current.src = e.target?.result;
    //         };
    //         reader.readAsDataURL(file);
    //     }

    //     console.log(file);
    // };

    // Method 2

    const handleImageChange = (e: any) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file: any) => URL.createObjectURL(file));

            setSelectedFiles((prevImages: any) => prevImages.concat(filesArray));
            Array.from(e.target.files).map(
                (file: any) => URL.revokeObjectURL(file) // avoid memory leak
            );
        }
    };


    // מרנדר קוד HTML כאן!
    const renderPhotos = (source: any) => {
        return source.map((photo: any) => {
            return <DesignBox onClick={() => handleFileClicked(photo)}> <img src={photo} alt="" key={photo} width="100" height="100" /></DesignBox>;
        });
    };

    return (
        <>
            <div style={{ display: "hidden" }} className="d-flex flex-wrap">
                <RightSideDiv>
                    <MethodsDiv>
                        <div style={{ cursor: "pointer" }} onClick={() => { setChooseMethod(1) }} className="premuim my-2 p-3 shadow">
                            <img src={PremiumPng} alt="premium" width="50" />
                            <h4 className="mt-2 w-100" style={{ fontSize: "28px" }}>Premium (5$)</h4>
                        </div>
                        <div style={{ cursor: "pointer" }} onClick={() => { setChooseMethod(0) }} className="designs my-2 p-3 shadow">
                            <img src={DesignsPng} alt="designs" width="50" />
                            <h4 className="mt-2 w-100" style={{ fontSize: "28px" }}>Designs</h4>
                        </div>
                        {/* <div onClick={() => { setChooseMethod(1) }} className="upload p-3 shadow">
                            <img src={DesignsPng} alt="upload" width="50" />
                            <h4 className="mt-2 w-100" style={{ fontSize: "28px" }}>Upload</h4>
                        </div> */}
                        <div style={{ cursor: "pointer" }} onClick={() => { setChooseMethod(2) }} className="upload p-3 shadow">
                            <img src={UploadsPng} alt="upload" width="50" />
                            <h4 className="mt-2 w-100" style={{ fontSize: "28px" }}>Uploads</h4>
                        </div>
                    </MethodsDiv>
                </RightSideDiv>
                <LeftSideDiv>

                    <ArrowDiv>
                        <i className="fa fa-angle-up fa-5x" aria-hidden="true"></i>
                    </ArrowDiv>
                    {chooseMethod === 1 &&
                        <>
                            <DesignsDiv>
                                {designsData.map((item, i) => {
                                    return (
                                        <>
                                            {item!.price > 0 &&
                                                <DesignBox key={i} onClick={() => {setPremiumClicks(++premiumClicks);handleDesignClicked(item?.image, item?.height, item?.width, item?.name, item?.s_id); premuimExtraPrice(item!.price, premiumClicks)}}>
                                                    {item?.image?.includes("http") ?
                                                        <img src={item?.image} alt={item?.name} width="100" height="100" />
                                                        :
                                                        <img src={URL_API + item?.image + "?" + Date.now()} height="100" width="100" alt={item?.name} />
                                                    }
                                                </DesignBox>
                                            }
                                        </>
                                    )
                                })}
                            </DesignsDiv>
                        </>
                    }
                    {chooseMethod === 0 &&
                        <>
                            <DesignsDiv>
                                {designsData.map((item, i) => {
                                    return (
                                        <>
                                            {
                                                item!.price === 0 || item?.price === null &&
                                                <DesignBox key={i} onClick={() => handleDesignClicked(item?.image, item?.height, item?.width, item?.name, item?.s_id)}>
                                                    {item?.image?.includes("http") ?
                                                        <img src={item?.image} alt={item?.name} width="100" height="100" />
                                                        :
                                                        <img src={URL_API + item?.image + "?" + Date.now()} height="100" width="100" alt={item?.name} />
                                                    }
                                                    {/* <img src={item?.image} alt="design" width="100" height="100" /> */}
                                                </DesignBox>
                                            }
                                        </>
                                    )
                                })}
                            </DesignsDiv>
                        </>
                    }

                    {chooseMethod === 2 &&
                        <DesignsDiv>
                            <DesignBox>
                                <input onChange={handleImageChange} ref={fileRef} type="file" ng-multiple="allowMultiple" accept="image/*" style={{ display: "none" }} />
                                <div
                                    style={{
                                        height: "100px",
                                        width: "100px",
                                        border: "1px dashed black"
                                    }}
                                    onClick={() => { fileRef.current.click() }}
                                >
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex", alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <i className="fa fa-upload fa-3x" aria-hidden="true"></i>
                                    </div>
                                </div>
                                {/* <button className="btn btn-primary btn-sm m-2">Add</button> */}
                            </DesignBox>
                            {renderPhotos(selectedFiles)}
                        </DesignsDiv>
                    }
                    <ArrowDiv>
                        <i className="fa fa-angle-down fa-5x" aria-hidden="true"></i>
                    </ArrowDiv>
                </LeftSideDiv>
            </div>
        </>
    )
}

export default SecondStepPanel