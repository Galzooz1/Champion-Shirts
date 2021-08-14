import React from 'react';
import Header from './header';
import HowItWorks from './howItWorks';
import Categories from './categories';
import Strip from './strip';

interface HomePageProps {
    
};

const HomePage: React.FC<HomePageProps> = () => {
    return(
        <>
        <Header />
        <Strip/>
        <HowItWorks />
        <Categories />
        <div>
            HomePage work
        </div>
        </>
    )
}

export default HomePage