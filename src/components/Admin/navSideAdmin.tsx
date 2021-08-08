import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './css/navSideAdmin.css';


interface NavSideAdminProps {
    isNavSideShown:boolean;
};

const WrapperDiv = styled.div`
display: flex;
width: 100%;
height: 100%;
transition: 1s;
`;

const NavAdmin = styled.nav`
position: relative;
width:350px;
background-color:black ;
min-height: 100vh;
border:1px solid black;
`;


const NavSideAdmin: React.FC<NavSideAdminProps> = ({isNavSideShown}) => {
    let [animationCss, setAnimationCss] = useState<string>("");
    useEffect( () => { 
        console.log(isNavSideShown);
      if(isNavSideShown){
          setAnimationCss("nav_side_in")
      }else{
          setAnimationCss("nav_side_out")
      }
    },[isNavSideShown]);
    
    return(
        <WrapperDiv className={animationCss}>
        <NavAdmin>
            <Link className="d-block border p-4 text-white" to="/admin/products">Products</Link>
            <Link className="d-block border p-4 text-white" to="/admin/categories">Categories</Link>
        </NavAdmin>
        </WrapperDiv>
    )
}

export default NavSideAdmin