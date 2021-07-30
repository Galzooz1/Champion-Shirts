import React from 'react';
import HeaderAdmin from './headerAdmin';

interface HomeAdminProps {

};

const HomeAdmin: React.FC<HomeAdminProps> = () => {
    return(
        <React.Fragment>
            <HeaderAdmin/>
            HomeAdmin work
        </React.Fragment>
    )
}

export default HomeAdmin