import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { doApiGet, URL_API } from '../services/apiService';
import './css/products.css';


interface ProductsAdminProps {
    
};

interface amountOfSizes {
  XS:number;
  S:number;
  M:number;
  L:number;
  XL:number;
  XXL:number;
  XXXL:number;
}

interface colors {
  color:string;
  amount_of_size: {
    [size:string]: amountOfSizes
  };
}

interface products {
    _id: string;
    name:string;
    info:string;
    image:string;
    price:number;
    category_s_id:number;
    quantity_sold:number;
    colors:colors;
    s_id:string;
    user_id:string;
    date_created:string;
}

const ProductsAdmin: React.FC<ProductsAdminProps> = () => {
    let history = useHistory();
    let [prodsAr, setProdsAr] = useState<products[]>([]);
    useEffect( () => { 
    getProdData();
    },[]);

    const getProdData = async() => { 
        let url = URL_API + "/products?sort=_id&reverse=yes&perPage=200";
        let data = await doApiGet(url);
        console.log(data);
        setProdsAr(data);
    }

    const moreInfo = (s_id:string) => { 
      history.push("/admin/single/"+s_id);
    }
    
    return(
        <div>
        <h1>List of Prod in shop:</h1>
        {/* <Link to="/admin/addProd">add new prod</Link> */}
        <table className="table table-striped container">
          {/* TODO: mouseover will shoe info of prod */}
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>Category ID</th>
              <th>price</th>
              <th>date created</th>
              <th>Product ID</th>
              <th>Added By</th>
              <th>del/edit</th>
            </tr>
          </thead>
          {/* TODO: add pagenation */}
          <tbody>
            {prodsAr.map((item,i) => {
              return (
                <tr onClick={() => moreInfo(item.s_id)} key={item._id}>
                  <td className="number">{i+1}</td>
                  <td>{item.name}</td>
                  <td>{item.category_s_id}</td>
                  <td>{item.price}</td>
                  <td>{item.date_created.replace(/\D/g,':').substring(11,19)}<br/>{item.date_created.replace(/\D/g,'/').substring(0,10).split('/').reverse().join('/')} </td>
                  <td>{item.s_id}</td>
                  <td><small>{item.user_id}</small></td>
                  <td>
                    <button className="btn btn-danger">del</button>
                    {/* <Link to={"/admin/editProd/"+item._id} className="btn btn-dark">edit</Link> */}
                  </td>
                </tr>
              )
            })}
  
          </tbody>
        </table>
      </div>
    )
}

export default ProductsAdmin