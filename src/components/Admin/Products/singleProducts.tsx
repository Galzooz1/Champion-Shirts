import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiService';
import EditProduct from './editProduct';
import { IProdItems, Property, Sale } from '../interfaces/prodItems';

type SingleProductParams = {
    s_id: string;
}

type SingleProductProps = RouteComponentProps<SingleProductParams>

const SingleProduct: React.FC<SingleProductProps> = (props) => {
    let history = useHistory()
    let [productData, setProductData] = useState<Partial<IProdItems>>({});
    // let [propertyData, setPropertyData] = useState<Partial<Property[]>>([])
    let [isProductOnSale, setIsProductOnSale] = useState<Sale['onSale']>();
    let [isModalVisible, setisModalVisible] = useState<boolean>(false);

    const toggleModal = () => {
        //Just another way of -> isModalVisible ? setisModalVisible(false) : setisModalVisible(true);
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
    }

    useEffect(() => {
        getSingleProductData();
    }, [])

    useEffect(() => {
        setIsProductOnSale(productData.sale?.onSale);
    }, [productData]);


    const getSingleProductData = async () => {
        let url = URL_API + "/products/single/" + props.match.params.s_id;
        let data = await doApiGet(url);
        console.log(data);
        setProductData(data);
        // setPropertyData(data.properties);
    }

    const deleteProduct = async () => {
        if (window.confirm("Are you sure you want to delete " + productData.name + " ?")) {
            let url = URL_API + "/products/" + props.match.params.s_id;
            let data = await doApiMethod(url, "DELETE", {});
            console.log(data);
            if (data.n === 1) {
                toast.success(productData.name + " Deleted Successfuly!");
                history.push("/admin");
            } else {
                console.log(data);
                toast.error("Error occuired, time to check the code.");
            }
        }
    }



    return (
        <>
            <div className="container mx-auto p-3 border rounded-3">
                <div className="d-flex justify-content-start">
                    <Link to="/admin" className="btn btn-danger">Back</Link>
                </div>
                <h1>{productData.name}</h1>
                <div className="p-3 d-flex justify-content-center mt-3 flex-wrap">
                    <div className="border text-start p-3">
                        <h3 className="text-center">Product Info</h3>
                        <hr />
                        <div>{productData.info}</div>
                        <div>Price: {productData.price}</div>
                        <div>Category ID: {productData.category_s_id}</div>
                        <div>Quantity sold: {productData.quantity_sold}</div>
                        {
                            isProductOnSale ?
                                <div>
                                    <div>The product is currently on sale!</div>
                                    <div>Amount of sale: {productData.sale?.amount}%</div>
                                    <div>Time of sale: {productData.sale?.timeInHours}</div>
                                </div>
                                :
                                <div>Not on sale currently!</div>
                        }
                        <div>
                            Added on: {productData.date_created?.replace(/\D/g, ':').substring(11, 19)}, {productData.date_created?.replace(/\D/g, '/').substring(0, 10).split('/').reverse().join('/')}
                        </div>
                        <div>Short ID of Prod: {productData.s_id}</div>
                        <div>Added By User ID: {productData.user_id}</div>
                    </div>
                    <div className="border text-start p-3">
                        <h3 className="text-center">Canvas Proprities</h3>
                        <table className="table table-bordered table-dark table-hover container">
                            <thead>
                                <tr>
                                    <th scope="col">Direction</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Width</th>
                                    <th scope="col">X</th>
                                    <th scope="col">Y</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.properties?.map((item, i) => {
                                    return (
                                        <tr className="p-3 rounded-3 text-center bg-info" key={i}>
                                            <th>Front</th>
                                            <td><img src={item?.frontImg} alt={productData?.name} width="50" /></td>
                                            <td>{item.sizeOfCanvasFront?.height}</td>
                                            <td>{item.sizeOfCanvasFront?.width}</td>
                                            <td>{item.positionOfCanvasFront?.x}</td>
                                            <td>{item.positionOfCanvasFront?.y}</td>
                                        </tr>
                                    )
                                })}
                                {productData.properties?.map((item, i) => {
                                    return (
                                        <tr className="p-3 rounded-3 text-center bg-info">
                                            <th>Back</th>
                                            <td><img src={item?.backImg} alt={productData?.name} width="50" /></td>
                                            <td>{item.sizeOfCanvasBack?.height}</td>
                                            <td>{item.sizeOfCanvasBack?.width}</td>
                                            <td>{item.positionOfCanvasBack?.x}</td>
                                            <td>{item.positionOfCanvasBack?.y}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border text-start p-3">
                        <h3 className="text-center">Colors and amount of sizes</h3>
                        <table className="table table-bordered table-dark table-hover container">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Color</th>
                                    <th scope="col">Amount of XS</th>
                                    <th scope="col">Amount of S</th>
                                    <th scope="col">Amount of M</th>
                                    <th scope="col">Amount of L</th>
                                    <th scope="col">Amount of XL</th>
                                    <th scope="col">Amount of XXL</th>
                                    <th scope="col">Amount of XXXL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.properties?.map((item, i) => {
                                    return (
                                        <tr className="p-3 rounded-3 text-center" key={i}>
                                            <th className="number">{i + 1}</th>
                                            <td className="fw-bold">{item.color}</td>
                                            <td>{item.amount?.XS}</td>
                                            <td>{item.amount?.S}</td>
                                            <td>{item.amount?.M}</td>
                                            <td>{item.amount?.L}</td>
                                            <td>{item.amount?.XL}</td>
                                            <td>{item.amount?.XXL}</td>
                                            <td>{item.amount?.XXXL}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="d-flex justify-content-around flex-wrap">
                            {productData.image?.includes("http") ?
                                <img src={productData.image} alt={productData.name} width="300px" className="border border-dark" />
                                :
                                <img src={URL_API + productData.image + "?" + Date.now()} height="150" alt={productData.name} />
                            }
                            {productData.properties?.map((item, i) => {
                                return (
                                    <>
                                        {item.frontImg?.includes("http") ?
                                            <img src={item.frontImg} alt={productData.name} width="300px" className="border border-dark" />
                                            :
                                            <img src={URL_API + item.frontImg + "?" + Date.now()} height="150" alt={productData.name} />
                                        }
                                        {item.backImg?.includes("http") ?
                                            <img src={item.backImg} alt={productData.name} width="300px" className="border border-dark" />
                                            :
                                            <img src={URL_API + item.backImg + "?" + Date.now()} height="150" alt={productData.name} />
                                        }
                                    </>
                                )
                            })}
                        </div>
                        <div className="mt-4 d-flex justify-content-around">
                            <button onClick={toggleModal} className="btn btn-info">Edit</button>
                            <EditProduct isModalVisible={isModalVisible} onClose={onBackdropClick} productData={productData} getSingleProductData={getSingleProductData} params={props.match.params.s_id} />
                            <button onClick={deleteProduct} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-start">
                </div>
            </div>
        </>
    )
}

export default SingleProduct