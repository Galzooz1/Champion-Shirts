import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StripImg from "../../../public/images/strip.jpeg";

interface StripProps {

};

const StripDiv = styled.div`
background-image: url("/images/strip.jpeg");
background-position: center;
background-size: cover;
min-height: 400px;
/* display: flex; */
/* align-items: center; */
/* justify-content: center; */
/* -bottom:12px; */

`;

const StripBtn = styled.div`
display: flex;
align-items: flex-end;
justify-content: center;
min-height: 450px;
padding-bottom: 50px;
`;

const StripH1 = styled.div`
/* min-height: 100px; */
display: flex;
align-items: center;
justify-content: center;
padding: 50px 0;
`;

const H1 = styled.h1`
font-family: cursive;
font-weight: 500;
font-style: italic;
/* text-shadow: 1.2em aquamarine; */
`;

const Strip: React.FC<StripProps> = () => {
    return (
        <StripDiv>
            <StripH1>
                <H1 className="text-white">Design Your Style</H1>
            </StripH1>
            <StripBtn>
                <Link to="/categories" className="btn btn-outline-light">
                    Start Now
                </Link>
            </StripBtn>
        </StripDiv>
    )
}

export default Strip