import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useMediaQuery from '../services/useMediaQuery';

interface StripProps {

};

const StripDiv = styled.div`
background-image: url("/images/strip3.jpeg");
background-position: center;
background-size: cover;
height: 700px;
/* display: flex; */
/* align-items: center; */
/* justify-content: center; */
/* -bottom:12px; */

`;

const StripBtn = styled.div`
display: flex;
align-items: center;
justify-content: center;
min-height: 450px;
padding-bottom: 50px;
`;

const StripH1 = styled.div`
/* min-height: 100px; */
display: flex;
font-family: 'Allison', sans-serif;
align-items: flex-end;
justify-content: center;
padding: 50px 0;
`;

const H1 = styled.h1`
font-family: cursive;
font-weight: 400;
color:#000000;
font-style: italic;
font-family: 'Allison', sans-serif;
/* font-family: 'streamster-regular', sans-serif; */
font-size: 200px;
line-height: 252px;
letter-spacing: 5%;
transition: all 0.4s ease-in;
&:hover{
color:white;
}
/* text-shadow: 1.2em aquamarine; */
`;

const StripTopDiv = styled.div`
    min-height: 400px;
    /* background: linear-gradient(to top, rgba(76, 76, 76, 0.55) 100%, rgba(28, 28, 28, 1) 9%, rgba(17, 17, 17, 1) 40%, rgba(0, 0, 0, 1) 49%, rgba(43, 43, 43, 0.55) 63%, rgba(71, 71, 71, 0.55) 73%, rgba(102, 102, 102, 0.55) 81%, rgba(89, 89, 89, 0.55) 88%, rgba(76, 76, 76, 0.55) 100%); */
    border-radius: 20px;
    opacity: 0.8;
    padding: 12px;
    text-align: center;
    transition: all 0.7s ease-in;
    &:hover{
        opacity: 1;
        color:white;
        /* background: linear-gradient(to top, rgba(214, 62, 201, 0.55) 100%, #7d388376 9%, #b3224d 40%, #fa316758, #fa316760, #fa31678d, #fa31676a, rgba(89, 89, 89, 0.55) 88%, rgba(76, 76, 76, 0.55) 100%); */
    }
`;

const Strip: React.FC<StripProps> = () => {
    const isDesktop = useMediaQuery('(min-width:900px)');
    return (
        <StripDiv>
            <StripTopDiv>

                <StripH1>
                    <H1>Design Your Style</H1>
                </StripH1>
                {isDesktop &&
                    <StripBtn>
                        <Link to="/categories" style={{ borderRadius: "32px", fontSize: "1.5em", padding: "16px 100px", border: "2px solid #FA3165" }} className="fw-bold btn btn-outline-light">
                            Start Now!
                        </Link>
                    </StripBtn>
                }
            </StripTopDiv>
        </StripDiv>
    )
}

export default Strip