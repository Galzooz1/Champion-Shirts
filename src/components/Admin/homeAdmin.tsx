import React from 'react';
import ReactTooltip from 'react-tooltip';
import HeaderAdmin from './headerAdmin';

interface HomeAdminProps {

};

const HomeAdmin: React.FC<HomeAdminProps> = () => {
    return(
        <React.Fragment>
            <HeaderAdmin/>
            HomeAdmin work
            <ReactTooltip/>
        </React.Fragment>
    )
}

export default HomeAdmin