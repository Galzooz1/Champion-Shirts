import React from 'react';
import styled from 'styled-components';
import Infinity from '../../assets/Infinity.gif';

interface LoadingProps {
    
};

const LoadingDiv = styled.div`
    position:fixed;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: #353434ac;
`;

const LoadingImg = styled.img`
    top:30%;
    left:44%;
    z-index: 999;
    position: absolute;
`;

const Loading: React.FC<LoadingProps> = () => {
    return(
        <LoadingDiv>
            <LoadingImg src={Infinity} alt="loading" />
        </LoadingDiv>
    )
}

export default Loading