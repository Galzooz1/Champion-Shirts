import React, { useEffect } from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { doApiGet, URL_API } from '../services/apiService';

type SingleProductParams = {
    s_id:string;
}

type SingleProductProps = RouteComponentProps<SingleProductParams>

// type getDataFunction = () => Promise<void>;

const SingleProduct: React.FC<SingleProductProps> = (props) => {
    let [productData, setProductData] = useState<any>();
    useEffect( () => { 
        getSingleProductData();
        console.log(productData);
        console.log(props.match.params.s_id);
    },[props]);
    
    const getSingleProductData = async() => { 
        let url = URL_API + "/products/single/" + props.match.params.s_id;
        let data = await doApiGet(url);
        console.log(data);
        setProductData(data);
    }
    return(
        <>
            <div className="container">
                {/* <h1>{productData.name}</h1>
                <div>
                    <h3>Product Info:</h3>
                    <div>{productData.info}</div>
                    <div>Price: {productData.price}</div>
                    <div>Price: {productData.colors[0].color}</div>
                    <div>Short ID: {productData.s_id}</div>
                </div> */}
            </div>
        </>
    )
}

export default SingleProduct