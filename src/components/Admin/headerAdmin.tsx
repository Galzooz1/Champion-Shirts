import { motion } from 'framer-motion';
import React from 'react';
import { Link, useHistory } from "react-router-dom"
import { toast } from 'react-toastify';
import NavBar from '../../assets/menubaradmin.png';

interface HeaderAdminProps {
  showHideNav: () => void;
};

const HeaderAdmin: React.FC<HeaderAdminProps> = ({ showHideNav }) => {
  let history = useHistory();

  const logOut = () => {
    localStorage.removeItem("token");
    toast.error("You logged out!");
    history.push("/")
  }

  return (
    <div className="container-fluid bg-dark text-light" data-type="info" data-tip="Work on CSS">
      <div>
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-3 me-5">
            <img onClick={showHideNav} src={NavBar} alt="navBar" width="64px" style={{ cursor: "pointer" }} />
          </div>
          <div className="col-lg-3 ms-5">
            <h2 className="text-center">Admin Panel</h2>
          </div>
          <div className="col-lg-3 me-5">
          <Link to="/home" className="btn btn-success me-4">Home</Link>
            {localStorage["token"] ?
              <React.Fragment>
                <motion.button whileHover={{ scale: 1.1 }} onClick={logOut} className="btn btn-danger">Log out</motion.button>
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