import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
// import AuthAdmin from './authAdmin';
import CategoriesAdmin from './categoriesAdmin';
import EditProduct from './editProduct';
import HeaderAdmin from './headerAdmin';
import NavSideAdmin from './navSideAdmin';
import ProductsAdmin from './productsAdmin';
import SingleProduct from './singleProducts';

interface HomeAdminProps {

};

const HomeAdmin: React.FC<HomeAdminProps> = () => {
    let [isNavSideShown, setIsNavSideShown] = useState<boolean>(false);

    const showHideNav = () => {
        setIsNavSideShown(wasNavSideShown => !wasNavSideShown);
        console.log(isNavSideShown);
    }

    return (
        <>
            {/* <Route strict path={`/admin/`} component={AuthAdmin} /> */}
            <HeaderAdmin showHideNav={showHideNav} />
            <div className="d-flex">
                {/* {isNavSideShown ? 
                <> */}
                <div className="col-2">
                    <NavSideAdmin isNavSideShown={isNavSideShown} />
                </div>
                <div className="col-9">
                    <Switch>
                        <Route exact path={`/admin`} component={ProductsAdmin} />
                        <Route exact path={`/admin/products`} component={ProductsAdmin} />
                        <Route path="/admin/single/:s_id" component={SingleProduct} />
                        <Route path="/admin/single/edit/:s_id" component={EditProduct} />
                        <Route exact path={`/admin/categories`} component={CategoriesAdmin} />
                    </Switch>
                </div>
                {/* </> */}
                {/* :
                <div className="col-12">
                <Switch>
                    <Route exact path={`/admin`} component={ProductsAdmin} />
                    <Route exact path={`/admin/products`} component={ProductsAdmin} />
                    <Route path="/admin/single/:s_id" component={SingleProduct} />
                    <Route path="/admin/single/edit/:s_id" component={EditProduct} />
                    <Route exact path={`/admin/categories`} component={CategoriesAdmin} />
                </Switch>
                </div>
                } */}
            </div>
            <ReactTooltip />
        </>
    )
}

export default HomeAdmin