import React, { useEffect } from 'react';
import { useState } from 'react';
import { doApiGet, URL_API } from '../services/apiService';

interface ProductsAdminProps {
    
};

interface products {
    _id: string;
    name:string;
    price:number;
    quantity:number;
    user_id:string;
}

const ProductsAdmin: React.FC<ProductsAdminProps> = () => {
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
    
    return(
        <div>
        <h1>List of Prod in shop:</h1>
        {/* <Link to="/admin/addProd">add new prod</Link> */}
        <table className="table table-striped">
          {/* TODO: mouseover will shoe info of prod */}
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>category</th>
              <th>price</th>
              <th>qty</th>
              <th>user</th>
              <th>del/edit</th>
            </tr>
          </thead>
          {/* TODO: add pagenation */}
          <tbody>
            {prodsAr.map((item,i) => {
              return (
                <tr key={item._id}>
                  <td>{i+1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.user_id}</td>
                  {/* <td>
                    <button onClick={() => {
                      delProd(item._id);
                    }} className="btn btn-danger">del</button>
                    <Link to={"/admin/editProd/"+item._id} className="btn btn-dark">edit</Link>
                  </td> */}
                </tr>
              )
            })}
  
          </tbody>
        </table>
      </div>
    )
}

export default ProductsAdmin