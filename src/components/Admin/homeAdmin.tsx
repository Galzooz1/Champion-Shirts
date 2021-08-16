import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
// import AuthAdmin from './authAdmin';
import CategoriesAdmin from './Categories/categoriesAdmin';
import EditProduct from './Products/editProduct';
import HeaderAdmin from './headerAdmin';
import NavSideAdmin from './navSideAdmin';
import ProductsAdmin from './Products/productsAdmin';
import SingleProduct from './Products/singleProducts';
import DesignsAdmin from './Designs/designsAdmin';
import UsersAdmin from './Users/usersAdmin';
import ReadyProductsAdmin from './readyProducts/readyProductsAdmin';
import AuthAdmin from './authAdmin';

interface HomeAdminProps {

};

const HomeAdmin: React.FC<HomeAdminProps> = () => {
    let [isNavSideShown, setIsNavSideShown] = useState<boolean>(true);

    const showHideNav = () => {
        setIsNavSideShown(wasNavSideShown => !wasNavSideShown);
        console.log(isNavSideShown);
    }

    return (
        <>
            <Route strict path={`/admin`} component={AuthAdmin} />
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
                        <Route exact path={`/admin/products/:page`} component={ProductsAdmin} />
                        <Route path="/admin/single/:s_id" component={SingleProduct} />
                        <Route path="/admin/single/edit/:s_id" component={EditProduct} />
                        <Route exact path={`/admin/categories`} component={CategoriesAdmin} />
                        <Route exact path={`/admin/categories/:page`} component={CategoriesAdmin} />
                        <Route exact path={`/admin/designs`} component={DesignsAdmin} />
                        <Route exact path={`/admin/designs/:page`} component={DesignsAdmin} />
                        <Route exact path={`/admin/users`} component={UsersAdmin} />
                        <Route exact path={`/admin/users/:page`} component={UsersAdmin} />
                        <Route exact path={`/admin/readyProducts`} component={ReadyProductsAdmin} />
                        <Route exact path={`/admin/readyProducts/:page`} component={ReadyProductsAdmin} />
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