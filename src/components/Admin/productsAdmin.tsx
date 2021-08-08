import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doApiGet, URL_API } from '../services/apiService';
import AddProduct from './addProduct';
import './css/products.css';


interface ProductsAdminProps {

};

interface products {
  _id: string;
  name: string;
  info: string;
  image: string;
  price: number;
  category_s_id: number;
  quantity_sold: number;
  s_id: string;
  user_id: string;
  date_created: string;
}

const ProductsAdmin: React.FC<ProductsAdminProps> = () => {
  let history = useHistory();
  let [prodsAr, setProdsAr] = useState<products[]>([]);
  let [isModalVisible, setisModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getProdData();
  }, []);

  const toggleModal = () => { 
    //Just another way of -> isModalVisible ? setisModalVisible(false) : setisModalVisible(true);
    setisModalVisible(wasModalVisible => !wasModalVisible);
}

const onBackdropClick = () => {
    setisModalVisible(false)
  }

  const getProdData = async () => {
    let url = URL_API + "/products?sort=_id&reverse=yes&perPage=200";
    let data = await doApiGet(url);
    console.log(data);
    setProdsAr(data);
  }

  const moreInfo = (s_id: string) => {
    history.push("/admin/single/" + s_id);
  }

  return (
    <div>
      <h1 className="mt-3 pe-5 me-5">Products</h1>
      <div className="d-flex justify-content-end me-5">
        <button onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Product</button>
        <AddProduct isModalVisible={isModalVisible} onClose={onBackdropClick} />
      </div>
      <hr />
      {/* <Link to="/admin/addProd">add new prod</Link> */}
      <table className="table table-striped container">
        {/* TODO: mouseover will shoe info of prod */}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Category ID</th>
            <th>Price</th>
            <th>Date created</th>
            <th>Product ID</th>
            <th>Image</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prodsAr.map((item, i) => {
            return (
              <tr className="align-items-center" onClick={() => moreInfo(item.s_id)} key={item._id}>
                <td className="number fw-bold">{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.category_s_id}</td>
                <td>{item.price}</td>
                <td>{item.date_created.replace(/\D/g, ':').substring(11, 19)}<br />{item.date_created.replace(/\D/g, '/').substring(0, 10).split('/').reverse().join('/')} </td>
                <td>{item.s_id}</td>
                {item.image?.includes("http") ?
                  <td><img height="100" src={item.image} alt={item.name} /></td>
                  :
                  <img src={URL_API + item.image + "?" + Date.now()} height="100" alt={item.name} />
                }
              </tr>
            )
          })}

        </tbody>
      </table>
    </div>
  )
}

export default ProductsAdmin