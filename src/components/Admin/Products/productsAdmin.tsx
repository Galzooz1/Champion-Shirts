import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiService';
import AddProduct from './addProduct';
import './css/products.css';
import ProductsPages from './productsPages';

type ProductAdminParams = {
  page:string;
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

type ProductsAdminProps = RouteComponentProps<ProductAdminParams>

const ProductsAdmin: React.FC<ProductsAdminProps> = (props) => {
  let history = useHistory();
  let [prodsAr, setProdsAr] = useState<products[]>([]);
  let [isModalVisible, setisModalVisible] = useState<boolean>(false);

  useEffect(() => {
    getProdData();
  }, [props.match]);

  const toggleModal = () => { 
    //Just another way of -> isModalVisible ? setisModalVisible(false) : setisModalVisible(true);
    setisModalVisible(wasModalVisible => !wasModalVisible);
}

const onBackdropClick = () => {
    setisModalVisible(false)
  }

  const getProdData = async () => {
    let currentPage = props.match.params.page || 0;
    let url = URL_API + `/products?page=${currentPage}&sort=_id&reverse=yes&perPage=5`;
    let data = await doApiGet(url);
    console.log(data);
    setProdsAr(data);
  }

  const moreInfo = (s_id: string) => {
    history.push("/admin/single/" + s_id);
  }

  const deleteProduct = async(_s_id: any, _name: string) => {
    if (window.confirm("Are you sure you want to delete " + _name + " ?")) {
        let url = URL_API + "/products/" + _s_id;
        let data = await doApiMethod(url, "DELETE", {});
        console.log(data);
        if (data.n === 1) {
            toast.success(_name + " Deleted Successfuly!");
            // window.location.reload()
            history.push("/admin");
        } else {
            console.log(data);
            toast.error("Error occuired, time to check the code.");
        }
    }
}

  return (
    <div>
      <motion.div transition={{ delay:0.2, duration:1.2}} initial={{y: -200}} animate={{y: 0}}>
      <motion.h1
       transition={{duration:1, delay:0.5}} initial={{opacity: 0}} animate={{opacity: 1}} className="mt-3 pe-5 me-5"
      >Products</motion.h1>
      <div className="d-flex justify-content-between me-5">
        <div className="d-flex p-3">
        <ProductsPages/>
        </div>
        <motion.button
         whileHover={{scale: 1.1}} onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Product</motion.button>
        <AddProduct isModalVisible={isModalVisible} onClose={onBackdropClick} />
      </div>
      <hr />
      </motion.div>
      {/* <Link to="/admin/addProd">add new prod</Link> */}
      <motion.table
      transition={{duration:1, delay:0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
      className="table table-striped container">
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
            <th>Image</th>
          </tr>
        </thead>
        {/* TODO: add pagenation */}
        <tbody>
          {prodsAr.map((item, i) => {
            return (
              <>
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
                <motion.button whileHover={{scale:1.1}} onClick={() => {deleteProduct(item.s_id, item.name)}} className="btn btn-danger">Delete</motion.button>
              </>
            )
          })}

        </tbody>
      </motion.table>
    </div>
  )
}

export default ProductsAdmin