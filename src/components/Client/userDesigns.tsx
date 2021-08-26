import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { IUsers } from '../Admin/interfaces/users';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import Header from './header';
import { DesignedH1, DesignedLine } from './userPanel';

interface UserDesignsParams {
    _id: string;
};

type UserDesignsProps = RouteComponentProps<UserDesignsParams>


const UserDesigns: React.FC<UserDesignsProps> = (props) => {
    let [userInfo, setUserInfo] = React.useState<IUsers>();
    let carts_ar = useSelector<RootStateOrAny, IReadyproducts[]>((myStore: any) => myStore.carts_ar);
    let wish_ar = useSelector<RootStateOrAny, IReadyproducts[]>((myStore: any) => myStore.wish_ar);
    let [readyProductData, setReadyProductData] = React.useState<Partial<IReadyproducts[]>>([]);

    React.useEffect(() => {
        if (localStorage["token"]) {
            getUserData();
        }
    }, []);
    
    const getUserData = async () => {
        let url = URL_API + "/users/myInfo";
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUserInfo(data);
        getReadyProductsData(data._id);
    }

    const getReadyProductsData = async (_id: string) => {
        let url = URL_API + "/readyProducts/" + _id;
        let data = await doApiMethod(url, "GET");
        console.log(data)
        setReadyProductData(data);
    }

    return (
        <>
            <Header />
            <div className="mx-auto mt-4 container">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>User Panel</Breadcrumb.Item>
                    <Breadcrumb.Item active>My Designs</Breadcrumb.Item>
                </Breadcrumb>
                <DesignedH1>My Designs</DesignedH1>
                <DesignedLine>
                </DesignedLine>
                <div className="text-center mt-3 display-6">Favourite Products</div>
                <div className="col-lg-6 border p-3 d-flex">
                    <div>
                        <h3>Name</h3>
                        <h3>Color</h3>
                        <h3>Size</h3>
                        <h3>Name</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDesigns