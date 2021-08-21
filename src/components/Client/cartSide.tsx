import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './css/cart.css';


interface CartSideProps {

};

const CartSide: React.FC<CartSideProps> = () => {
    let dispatch = useDispatch();
    let [animClassCss, setAnimCss] = React.useState<string>("");
    let total = 0;

    let showCart = useSelector((myStore: any) => myStore.showCart);
    let carts_ar = useSelector((myStore: any) => myStore.carts_ar);

    React.useEffect(() => {
        console.log("show")
        if(showCart){
          setAnimCss("cart_side_start");
        }
        else{
          setAnimCss("cart_side_out")
        }
      }, [showCart])
    
    return (
        <React.Fragment>
            {
                // todo: enter in animation from right side
                <div className={"cart_side p-3 " + animClassCss}>
                    <button onClick={() => {
                        dispatch({ type: "SHOW_HIDE_CART", flag: false })
                    }} className="btn btn-danger float-end">X</button>
                    <h2>Cart:</h2>
                    <div className="cart_items">
                        {/* {carts_ar.map(item => {
              
              if (item.count > 0) {
                total += item.price * item.count;
                return (
                  <CartItem key={item._id} item={item} />
                )
              }
            })} */}
                    </div>
                    <div className="d-flex justify-content-between mt-2 align-items-center">
                        <h4 className="mt-2">Total: {total.toFixed(2)} Nis</h4>
                        {/* {(localStorage["token"]) ?
                            <Link to="/checkout" className="btn btn-outline-success me-2">Checkout</Link>
                            :

                            <Link to="/login" className="btn btn-outline-danger">
                                Login for checkout
                            </Link>
                        } */}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default CartSide