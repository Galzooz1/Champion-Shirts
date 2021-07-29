import React from 'react';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom"
import { toast } from 'react-toastify';

const HeaderAdmin = () => {
    let history = useHistory();

    const logOut = () => { 
      localStorage.removeItem("token");
      toast.error("You logged out!");
      history.push("/")
    }
    return(
        <div className="container-fluid bg-dark text-light" data-type="info" data-tip="Work on CSS">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-3">
              <h2 className="text-center">Admin Panel</h2>
            </div>
            <div className="col-lg-6 text-end">
              {localStorage["token"] ? 
              <React.Fragment>
                <Link to="#" onClick={logOut} className="btn btn-danger">Log out</Link>
              </React.Fragment>
              : ""
            }
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeaderAdmin