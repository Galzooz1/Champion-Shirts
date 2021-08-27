import React from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartItem from './cartItem';
import './css/cart.css';


interface CartSideProps {

};

const CartSide: React.FC<CartSideProps> = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  let [animClassCss, setAnimCss] = React.useState<string>("");
  let total = 0;

  let showCart = useSelector<RootStateOrAny, any[]>((myStore: any) => myStore.showCart);
  let carts_ar = useSelector<RootStateOrAny, any[]>((myStore: any) => myStore.carts_ar);

  const goToCheckout = () => { 
    if(!localStorage["token"]){
      toast.error("Please Login before buying!");
    }else{
      history.push("/checkout");
    }
  }

  React.useEffect(() => {
    console.log("show")
    if (showCart) {
      setAnimCss("cart_side_start");
    }
    else {
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
          <h2 className="p-3">Cart:</h2>
          <hr />
          <div className="cart_items">
            {carts_ar.map(item => {
              // console.log("item:" , item)
              if (item.count > 0) {
                total += item.price;
                return (
                  <>
                  {item!.isCart &&
                    <CartItem key={item._id} item={item} />
                  }
                    </>
                )
              }
            })}
          </div>
          <hr />
          <div className="d-flex justify-content-between mt-2 align-items-center">
            <button onClick={goToCheckout} className="btn btn-success">Checkout</button>
            <h4 className="mt-2 mx-auto">Total: {total.toFixed(2)} $</h4>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default CartSide