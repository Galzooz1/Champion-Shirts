import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';

interface CartItemProps {
    item: IReadyproducts;
};

const CartItem: React.FC<CartItemProps> = ({ item }, props) => {
    let dispatch = useDispatch();

    // React.useEffect(() => {
    //     item.product_name = item?.product_name.length > 11 ? item?.product_name.substr(0, 10) + "..." : item?.product_name;
    // }, [props])

    const delFromCart = () => {
        if(window.confirm("Are you sure you want to delete " + item.product_name + "?")){
            item.count = 0;
            dispatch({ type: "UPDATE_THE_CART", data: item })
        }
    }

    const renderTooltip = (props: any, color: any) => (
        <Tooltip {...props}>{color}</Tooltip>
    )

    return (
        <div style={{ borderBottom: "2px solid black" }} className="p-1">
            <h4>{item.product_name}</h4>
            <div className="w-50 mx-auto">
                <div className="d-flex justify-content-evenly" style={{ fontSize: "1.3em" }}>
                    Color:
                    <OverlayTrigger placement="left-start" overlay={renderTooltip(props, item.color)}>
                        <button data-tip={`${item.color}`} disabled className="rounded-circle p-3 ms-2" style={{ backgroundColor: `${item.color}`, width: "20px", height: "20px" }}></button>
                    </OverlayTrigger>
                    <div className="fw-bold ms-2">
                        {item.size}
                    </div>
                    -
                    <h5>
                        {item.price.toFixed(2)} $
                    </h5>
                <span onClick={delFromCart} style={{cursor:"pointer"}} className="float-end text-danger">x</span>
                </div>
            </div>
        </div>
    )
}

export default CartItem