import React from 'react';
import Header from './header';
import HowItWorks from './howItWorks';
import Categories from './categories';
import Strip from './strip';
import CartSide from './cartSide';

interface HomePageProps {
    
};

const HomePage: React.FC<HomePageProps> = () => {
    return(
        <>
        <Header />
        <Strip/>
        <HowItWorks />
        <Categories />
        </>
    )
}

export default HomePage