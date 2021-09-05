import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IReadyproducts } from '../Admin/interfaces/readyproducts';
import { IUsers } from '../Admin/interfaces/users';
import { doApiMethod, URL_API } from '../services/apiService';
import PaypalBtn from './common/paypalBtn';
import Footer from './footer';
import Header from './header';
import { InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';
import { H2HR, HR, SpanH2 } from './styles/headerCategory';
import { DesignedH2, DesignedLine } from './userPanel';

interface CheckoutProps {

};


const Checkout: React.FC<CheckoutProps> = () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let [userInfo, setUserInfo] = React.useState<IUsers>();
    let carts_ar = useSelector<RootStateOrAny, any[]>(myStore => myStore.carts_ar);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<IUsers>>({ mode: 'all' });
    let totalCart = 0;

    React.useEffect(() => {
        if (!localStorage["token"]) {
            toast.error("Please Login!")
            history.goBack()
        } else {
            getUserData();
        }
    }, []);

    const checkoutReal = async (_id_paypalOrder: any = "00000") => {
        let temp_ar = new Array();
        carts_ar.map((item, i) => {
            temp_ar.push(item);
        })
        let obj = {
            carts_ar: temp_ar,
            total: totalCart,
            paypal_id: _id_paypalOrder
        }
        let url = URL_API + "/carts";
        try {
            let data = await doApiMethod(url, "POST", obj)
            console.log(JSON.stringify(data));
            if (data.n == 1) {
                toast.success("Your order been updated");
                dispatch({ type: "RESET_CARTS", carts_ar: [] });
            }
            else if (data._id) {
                toast.success("Your order on process we will contact you soon to get your money!")
            }
            else {
                toast.error("there problem come back tommrow")
            }
        }
        catch (err) {
            console.log(err);
            toast.error("there's a problem")
        }
    }

    const deleteProductFromCart = (item: IReadyproducts) => {
        console.log(item)
        if (window.confirm("Are you sure you want to delete " + item.product_name + "?")) {
            item.count = 0;
            dispatch({ type: "UPDATE_THE_CART", data: item })
        }
    }

    const getUserData = async () => {
        let url = URL_API + "/users/myInfo";
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUserInfo(data);
    }

    const onSubmit = (dataBody: Partial<IUsers>) => {
        console.log(dataBody);
        editUserInfo(dataBody);
    }

    const editUserInfo = async (dataBody: Partial<IUsers>) => {
        console.log(userInfo?._id);
        let url = URL_API + "/users/" + userInfo?._id;
        let data = await doApiMethod(url, "PUT", dataBody);
        console.log(data)
        if (data.n === 1) {
            toast.success("User Information Updated!");
            window.location.reload();
        } else {
            toast.error("There's an Error, Please contact the owner!");
        }
    }

    return (
        <>
            {!localStorage["token"] ?
                <>
                    <Header />
                    <h2>Please Login</h2>
                </>
                :
                <>
                    <Header />
                    <div className="container p-3 mx-auto">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to={"/categories"}>Categories</Link></Breadcrumb.Item>
                            <Breadcrumb.Item active>Checkout</Breadcrumb.Item>
                        </Breadcrumb>
                        <DesignedH2>Checkout</DesignedH2>
                        <DesignedLine></DesignedLine>
                    </div>
                    <div className="container mx-auto my-4">
                        <h3>Hello {userInfo?.firstName}, Here's Your Cart:</h3>
                        <div className="row my-4">
                            <div className="col-lg-12 p-2">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Image</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table container">
                                        {carts_ar.map((item: IReadyproducts, i) => {
                                            totalCart += item.price;
                                            return (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{item.product_name}</td>
                                                    <td><button disabled style={{ backgroundColor: `${item.color}`, width: "20px", height: "20px" }} className="rounded-circle"></button></td>
                                                    <td className="fw-bold">{item.size}</td>
                                                    <td>{(item.price).toFixed(2)} $</td>
                                                    <td className="w-25"><img src={item?.images.frontImage.image} alt={item.product_name} width="100px" /></td>
                                                    <td onClick={() => deleteProductFromCart(item)} className="btn btn-outline-danger btn-sm">Delete</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {userInfo?.address ?
                            <div className="col-lg-3 mx-auto p-2 d-flex justify-content-center align-items-start text-center" style={{ height: "300px" }}>
                                <div>
                                    <h3 className="mb-4">Total price: {totalCart.toFixed(2)} $</h3>
                                    {/* <button onClick={checkoutReal} className="btn btn-outline-info w-100">Commit buy</button> */}
                                    <PaypalBtn successFunc={checkoutReal} total={totalCart.toFixed(2)} clientId="AbiWx8wSIUBrmPTxcyHs8TTCHi1k6u9vYdGP4VvOsO42snOPp6hQ0WwKDvgr3berBD8LuqrNXhZ9793I" />
                                </div>
                            </div>
                            :
                            <form className="col-lg-6 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                                <div className="d-flex justify-content-between">
                                    <div className="me-3">
                                        <LabelContainer className="fw-bold mb-3">Enter First Name</LabelContainer>
                                        <InputContainer>
                                            <ModalInput {...register("firstName", { required: true, minLength: 2 })} defaultValue={userInfo?.firstName} type="text" name="firstName" className="form-control" />
                                            {errors.firstName && <span className="text-danger m-2 text-center">Please enter firstName!</span>}
                                        </InputContainer>
                                    </div>
                                    <div className="me-3">
                                        <LabelContainer className="fw-bold mb-3">Enter Last Name</LabelContainer>
                                        <InputContainer>
                                            <ModalInput {...register("lastName", { required: true, minLength: 2 })} defaultValue={userInfo?.lastName} type="text" name="lastName" className="form-control" />
                                            {errors.lastName && <span className="text-danger m-2 text-center">Please enter lastName!</span>}
                                        </InputContainer>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <LabelContainer className="fw-bold mb-3">Enter Phone</LabelContainer>
                                    <InputContainer>
                                        <ModalInput {...register("phone", { required: true, minLength: 2 })} defaultValue={userInfo?.phone} type="text" name="phone" className="form-control" />
                                        {errors.phone && <span className="text-danger m-2 text-center">Please enter phone!</span>}
                                    </InputContainer>
                                </div>
                                <div className="mb-3">
                                    <LabelContainer className="fw-bold mb-3">Enter Address</LabelContainer>
                                    <InputContainer>
                                        <ModalInput {...register("address", { required: true, minLength: 2 })} type="text" name="address" className="form-control" />
                                        {errors.address && <span className="text-danger m-2 text-center">Please enter Address!</span>}
                                    </InputContainer>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-primary">Update Address</button>
                                </div>
                            </form>
                        }
                    </div>
                </>
            }
            <Footer />
        </>
    )
}

export default Checkout