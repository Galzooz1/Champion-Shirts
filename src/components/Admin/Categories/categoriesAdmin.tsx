import { motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiService';
import { ICategories } from '../interfaces/categoriesArgs';
import AddCategory from './addCategory';
import CategoriesPages from './categoriesPages';

type CategoriesAdminParams = {
    page:string;
  };

type CategoriesAdminProps = RouteComponentProps<CategoriesAdminParams>

const CategoriesAdmin: React.FC<CategoriesAdminProps> = (props) => {
    let [categoriesAr, setCategoriesAr] = useState<ICategories[]>([]);
    let [isModalVisible, setisModalVisible] = useState<boolean>(false);

    useEffect(() => {
        getCategoriesData();
    }, [props.match]);

    const toggleModal = () => {
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
    }

    const getCategoriesData = async () => {
        let currentPage = props.match.params.page || 0;
        let url = URL_API + `/categories?page=${currentPage}&sort=_id&reverse=yes&perPage=5`
        let data = await doApiGet(url);
        console.log(data);
        setCategoriesAr(data);
    }

    const deleteCategory = async (s_id: number) => {
        if (window.confirm("Are you sure you want to delete?")) {
            let url = URL_API + "/categories/" + s_id;
            let data = await doApiMethod(url, "DELETE", {});
            console.log(data);
            if (data.n === 1) {
                toast.success("Deleted Successfuly!");
                window.location.reload();
            } else {
                console.log(data);
                toast.error("Error occuired, time to check the code.");
            }
        }
    }

    return (
        <div>
            <motion.div transition={{ delay: 0.2, duration: 1.2 }} initial={{ y: -200 }} animate={{ y: 0 }}>
                <motion.h1
                    transition={{ duration: 1, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pe-5 me-5"
                >Categories</motion.h1>
                <div className="d-flex justify-content-between me-5">
                <div className="d-flex p-3">
                        <CategoriesPages />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }} onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Category</motion.button>
                    <AddCategory isModalVisible={isModalVisible} onClose={onBackdropClick} />
                </div>
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
                        <th>Name</th>
                        <th>Info</th>
                        <th>Date created</th>
                        <th>Category ID</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                {/* TODO: add pagenation */}
                <tbody>
                    {categoriesAr.map((item, i) => {
                        return (
                            <tr className="align-items-center"/* onClick={() => moreInfo(item.s_id)} key={item._id} */ >
                                <td className="number fw-bold">{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.info}</td>
                                <td>{item.date_created.replace(/\D/g, ':').substring(11, 19)}<br />{item.date_created.replace(/\D/g, '/').substring(0, 10).split('/').reverse().join('/')} </td>
                                <td>{item.s_id}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => { deleteCategory(item.s_id) }}>Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-info">Edit</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </motion.table>
        </div>
    )
}

export default CategoriesAdmin