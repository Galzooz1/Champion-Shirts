import { motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { doApiMethod, URL_API } from '../../services/apiService';
import { IUsers } from '../interfaces/users';
import UsersPages from './usersPages';

type UsersAdminParams = {
    page:string;
  };

type UsersAdminProps = RouteComponentProps<UsersAdminParams>

const UsersAdmin: React.FC<UsersAdminProps> = (props) => {
    let [usersAr, setUsersAr] = React.useState<IUsers[]>([]);
    let [isModalVisible, setisModalVisible] = React.useState<boolean>(false);

    useEffect(() => {
        getUsersData()
    }, [props.match]);

    const toggleModal = () => {
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
    }

    const getUsersData = async () => {
        let currentPage = props.match.params.page || 0;
        let url = URL_API + `/users?page=${currentPage}&sort=_id&reverse=yes&perPage=5`;
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUsersAr(data);
    }

    return (
        <div>
            <motion.div transition={{ delay: 0.2, duration: 1.2 }} initial={{ y: -200 }} animate={{ y: 0 }}>
                <motion.h1
                    transition={{ duration: 1, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pe-5 me-5"
                >Users</motion.h1>
                <div className="d-flex justify-content-between me-5">
                    <div className="d-flex p-3">
                        <UsersPages />
                    </div>
                </div>
                {/* <motion.button
           whileHover={{scale: 1.1}} onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Design</motion.button>
          <AddDesign isModalVisible={isModalVisible} onClose={onBackdropClick} />
        </div> */}
                <hr />
            </motion.div>
            {/* <Link to="/admin/addProd">add new prod</Link> */}
            <motion.table
                transition={{ duration: 1, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="table table-striped container">
                {/* TODO: mouseover will shoe info of prod */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Date Created</th>
                        <th>User ID</th>
                    </tr>
                </thead>
                {/* TODO: add pagenation */}
                <tbody>
                    {usersAr.map((item, i) => {
                        return (
                            <tr className="align-items-center" /*onClick={() => moreInfo(item.s_id)} key={item._id}*/>
                                <td className="number fw-bold">{i + 1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.address}</td>
                                <td>{item.status}</td>
                                {item.avatar_img?.includes("http") ?
                                    <td><img height="100" src={item.avatar_img} alt={item.firstName} /></td>
                                    :
                                    <img src={URL_API + item.avatar_img + "?" + Date.now()} height="100" alt={item.firstName} />
                                }
                                <td>{item.date_created.replace(/\D/g, ':').substring(11, 19)}<br />{item.date_created.replace(/\D/g, '/').substring(0, 10).split('/').reverse().join('/')} </td>
                                <td>{item._id}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </motion.table>
        </div>
    )
}

export default UsersAdmin