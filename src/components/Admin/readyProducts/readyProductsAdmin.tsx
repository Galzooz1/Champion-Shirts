import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiService';
import { IReadyproducts } from '../interfaces/readyproducts';
import ReadyProductsPages from './readyProductsPages';

type readyProductsAdminParams = {
    page:string;
};

type ReadyProductsAdminProps = RouteComponentProps<readyProductsAdminParams>


const ReadyProductsAdmin: React.FC<ReadyProductsAdminProps> = (props) => {
    let history = useHistory();
    let [readyProdsAr, setReadyProdsAr] = useState<Partial<IReadyproducts[]>>([]);

    React.useEffect(() => {
        getReadyProdData();
      }, [props.match]);

      const getReadyProdData = async () => {
        let currentPage = props.match.params.page || 0;
        let url = URL_API + `/readyProducts?page=${currentPage}&sort=_id&reverse=yes&perPage=5`;
        let data = await doApiGet(url);
        setReadyProdsAr(data);
      }

    return(
        <div>
        <motion.div transition={{ delay:0.2, duration:1.2}} initial={{y: -200}} animate={{y: 0}}>
        <motion.h1
         transition={{duration:1, delay:0.5}} initial={{opacity: 0}} animate={{opacity: 1}} className="mt-3 pe-5 me-5"
        >Ready Products</motion.h1>
        <div className="d-flex justify-content-between me-5">
          <div className="d-flex p-3">
          <ReadyProductsPages/>
          </div>
          {/* <motion.button
           whileHover={{scale: 1.1}} onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Product</motion.button>
          <AddProduct isModalVisible={isModalVisible} onClose={onBackdropClick} /> */}
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
              <th>Price</th>
              <th>Size</th>
              <th>Color</th>
              <th>Product</th>
              <th>Category</th>
              {/* <th>Design Img</th>
              <th>Image</th> */}
              <th>Date created</th>
              <th>S_ID</th>
            </tr>
          </thead>
          {/* TODO: add pagenation */}
          <tbody>
            {readyProdsAr.map((item, i) => {
              return (
                <>
                <tr className="align-items-center" /*onClick={() => moreInfo(item.s_id)} */ key={item?._id}>
                  <td className="number fw-bold">{i + 1}</td>
                  <td>{item?.product_name}</td>
                  <td>{item?.price}</td>
                  <td>{item?.size}</td>
                  <td>{item?.color}</td>
                  <td>{item?.product_name}</td>
                  <td>{item?.category_name}</td>
                  {/* {item.design.front.map(front => {
                      return(
                          <>
                          <td>{front.image}</td>
                          {front.image?.includes("http") ?
                            <td><img height="100" src={front.image} alt={item.name} /></td>
                            :
                            <img src={URL_API + front.image + "?" + Date.now()} height="100" alt={item.name} />
                        }
                        </>
                      )
                  })} */}
                <td>{item?.date_created.replace(/\D/g, ':').substring(11, 19)}<br />{item?.date_created.replace(/\D/g, '/').substring(0, 10).split('/').reverse().join('/')} </td>
                <td>{item?.s_id}</td>
                </tr>
                  {/* <motion.button whileHover={{scale:1.1}} onClick={() => {deleteProduct(item.s_id, item.name)}} className="btn btn-danger">Delete</motion.button> */}
                </>
              )
            })}
  
          </tbody>
        </motion.table>
      </div>
    )
}

export default ReadyProductsAdmin