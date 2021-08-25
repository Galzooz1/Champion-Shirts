import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { IReadyproducts } from '../../Admin/interfaces/readyproducts';
import ThirdDesignCanvas from './thirdDesignCanvas';

interface ThirdDesignStepProps {
    readyProductData: Partial<IReadyproducts>;
    chosenSide: string;
    productData: Partial<IProdItems>;
};

const ThirdDesignStep: React.FC<ThirdDesignStepProps> = ({ readyProductData, chosenSide, productData }) => {
    let dispatch = useDispatch();
    let [countCartItems,setCountCartItems] = React.useState<number>(0);
    let [countWishItems,setCountWishItems] = React.useState<number>(0);

// לסדר נזילה מהרדי פרודקטס!!!!!
    const addToCart = () => { 
        setCountCartItems(countCartItems+1);
        readyProductData.count = countCartItems+1;
        dispatch({type:"UPDATE_THE_CART", data:readyProductData})
        toast.success(productData.name + " Added to Cart!")
   }
    const addToWish = () => { 
        setCountWishItems(countWishItems+1);
        readyProductData.count = countWishItems+1;
        dispatch({type:"UPDATE_THE_WISH", data:readyProductData})
        toast.success(productData.name + " Added to Wish List!")
   }
    return (
        <div style={{ height: "600px" }} className="d-flex justify-content-around shadow p-3">
            <div className="col-lg-6">
                <div className="text-start m-5 ps-5">
                    <h2 className="my-3">{readyProductData.product_name}</h2>
                    <h5 className="my-3">{readyProductData.info}</h5>
                    <div className="d-flex my-3">
                        <h5 className="me-3">Color</h5> 
                        <button disabled className="shadow rounded-circle" style={{width:"30px", height:"30px", backgroundColor:`${readyProductData.color}`}}></button>
                    </div>
                    <div className="d-flex">
                        <h5 className="me-3">Size</h5> 
                        <button disabled className="shadow text-dark" style={{width:"30px", height:"30px"}}>{readyProductData.size}</button>
                    </div>
                    <h4 className="my-3">{readyProductData.price?.toFixed(2)} $</h4>
                    <div className="d-flex">
                    <button onClick={addToCart} className="btn btn-info me-4">Add to Cart</button>
                    <button onClick={addToWish} className="btn btn-danger">Add to Wish</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <ThirdDesignCanvas readyProductData={readyProductData} productData={productData} chosenSide={chosenSide} />
            </div>
        </div>
    )
}

export default ThirdDesignStep