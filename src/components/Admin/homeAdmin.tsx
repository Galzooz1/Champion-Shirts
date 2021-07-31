import React from 'react';
import ReactTooltip from 'react-tooltip';
import HeaderAdmin from './headerAdmin';
import ProductsAdmin from './productsAdmin';

interface HomeAdminProps {

};

const HomeAdmin: React.FC<HomeAdminProps> = () => {
    return(
        <React.Fragment>
            <HeaderAdmin/>
            <ProductsAdmin/>
            HomeAdmin work
            <ReactTooltip/>
        </React.Fragment>
    )
}

export default HomeAdmin