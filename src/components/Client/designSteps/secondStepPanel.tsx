import React from 'react';
import styled from 'styled-components';
import { IDesigns } from '../../Admin/interfaces/designs';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import DesignsPng from '../../../assets/designs.png';
import { URL_API } from '../../services/apiService';
import { IDesignsArr } from './secondStepApp';

interface SecondStepPanelProps {
    productData: Partial<IProdItems>;
    designsData: Partial<IDesigns[]>;
    handleDesignClicked:(_image: any, _height: any, _width: any, _name: any) => void;
};

const MethodsDiv = styled.div`
height: 400px;
display: block;
border:1px solid black;
border-radius: 10px;
padding:12px;
background-color: #F9D2D4;
color:black;
font-weight: bolder;
font-family: Alata;
margin-right: 16px;
`;

const DesignsDiv = styled.div`
height: 500px;
width: 100%;
display:flex;
align-content: flex-start;
/* align-items: flex-start; */
flex-wrap: wrap;
/* flex-direction: column; */
justify-content: space-around;
padding:12px;
`;

const DesignBox = styled.div`
border:1px solid black;
padding:8px;
border-radius: 5px;
height: fit-content;
width: fit-content;
margin: 6px 0;
`;

const SecondStepPanel: React.FC<SecondStepPanelProps> = ({ productData, designsData, handleDesignClicked }) => {
    return (
        <>
            <div className="d-flex">
                <div style={{ width: "60%" }} className="d-flex align-items-center">
                    <MethodsDiv>
                        <div className="designs p-3 shadow">
                            <img src={DesignsPng} alt="designs" width="50" />
                            <h4 className="mt-2 w-100" style={{ fontSize: "28px" }}>designs</h4>
                        </div>
                    </MethodsDiv>
                </div>
                <DesignsDiv>
                    {designsData.map((item, i) => {
                        return (
                            <DesignBox key={i} onClick={() => handleDesignClicked(item?.image, item?.height, item?.width, item?.name)}>
                                {item?.image?.includes("http") ?
                                    <img src={item?.image} alt={item?.name} width="100" height="100" />
                                    :
                                    <img src={URL_API + item?.image + "?" + Date.now()} height="100" width="100" alt={item?.name} />
                                }
                                {/* <img src={item?.image} alt="design" width="100" height="100" /> */}
                            </DesignBox>
                        )
                    })}
                </DesignsDiv>
            </div>
        </>
    )
}

export default SecondStepPanel