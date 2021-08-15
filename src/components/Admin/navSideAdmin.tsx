import { motion } from 'framer-motion';
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

const Links = {
    visible: {
        backgroundImage:"linear-gradient(180deg, #D0368A 0%, #708AD4 99%)"
    },
    hidden:{
        backgroundImage:'linear-gradient(180deg, #222021 0%, #404142 99%)'
    }
}


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
            <motion.div variants={Links} initial="hidden" transition={{duration:0.7, delay:0.1}} whileHover="visible" className="border p-4">
            <Link className="d-block text-white" to="/admin/products">Products</Link>
            </motion.div>
            <motion.div variants={Links} initial="hidden" transition={{duration:0.7, delay:0.1}} whileHover="visible" className="border p-4">
            <Link className="d-block text-white" to="/admin/categories">Categories</Link>
            </motion.div>
            <motion.div variants={Links} initial="hidden" transition={{duration:0.7, delay:0.1}} whileHover="visible" className="border p-4">
            <Link className="d-block text-white" to="/admin/designs">Designs</Link>
            </motion.div>
            <motion.div variants={Links} initial="hidden" transition={{duration:0.7, delay:0.1}} whileHover="visible" className="border p-4">
            <Link className="d-block text-white" to="/admin/users">Users</Link>
            </motion.div>
            <motion.div variants={Links} initial="hidden" transition={{duration:0.7, delay:0.1}} whileHover="visible" className="border p-4">
            <Link className="d-block text-white" to="/admin/readyProducts">Ready Products</Link>
            </motion.div>
        </NavAdmin>
        </WrapperDiv>
    )
}

export default NavSideAdmin