import React from 'react';
import { useDispatch } from 'react-redux';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';

interface CartItemProps {
    item: IReadyproducts;
};

const CartItem: React.FC<CartItemProps> = ({ item }, props) => {
    let dispatch = useDispatch();

    React.useEffect(() => {
        item.product_name = item.product_name.length > 11 ? item.product_name.substr(0, 10) + "..." : item.product_name;
    }, [props])

    const delFromCart = () => {
        item.count = 0;
        dispatch({ type: "UPDATE_THE_CART", data: item })
    }

    return (
        <div style={{borderBottom:"2px solid black"}} className="p-1">
        {item.product_name} : {item.count} , {item.price} Nis
      <span onClick={delFromCart} className="float-end text-danger">x</span>
      </div> 
    )
}

export default CartItem