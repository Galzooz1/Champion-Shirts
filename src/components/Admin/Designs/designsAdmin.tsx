import { motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiService';
import { IDesigns } from '../interfaces/designs';
import AddDesign from './addDesign';
import DesignsPages from './designsPages';

type DesignsAdminParams = {
    page: string;
};

type DesignsAdminProps = RouteComponentProps<DesignsAdminParams>

const DesignsAdmin: React.FC<DesignsAdminProps> = (props) => {
    let [designsAr, setDesignsAr] = React.useState<IDesigns[]>([]);
    let [isModalVisible, setisModalVisible] = React.useState<boolean>(false);

    useEffect(() => {
        getDesignsData()
    }, [props.match]);

    const toggleModal = () => {
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
    }

    const getDesignsData = async () => {
        let currentPage = props.match.params.page || 0;
        let url = URL_API + `/designs?page=${currentPage}&sort=_id&reverse=yes&perPage=5`;
        let data = await doApiGet(url);
        console.log(data);
        setDesignsAr(data);
    }

    return (
        <div>
            <motion.div transition={{ delay: 0.2, duration: 1.2 }} initial={{ y: -200 }} animate={{ y: 0 }}>
                <motion.h1
                    transition={{ duration: 1, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 pe-5 me-5"
                >Designs</motion.h1>
                <div className="d-flex justify-content-between me-5">
                    <div className="d-flex p-3">
                        <DesignsPages />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1 }} onClick={toggleModal} className="btn btn-success me-3 mb-3">Add Design</motion.button>
                    <AddDesign isModalVisible={isModalVisible} onClose={onBackdropClick} />
                </div>
                <hr />
            </motion.div>
            <motion.table
                transition={{ duration: 1, delay: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="table table-striped container">
                {/* TODO: mouseover will shoe info of prod */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Info</th>
                        <th>Price</th>
                        <th>Likes</th>
                        <th>Date created</th>
                        <th>Design ID</th>
                        <th>Image</th>
                    </tr>
                </thead>
                {/* TODO: add pagenation */}
                <tbody>
                    {designsAr.map((item, i) => {
                        return (
                            <tr className="align-items-center" /*onClick={() => moreInfo(item.s_id)} key={item._id}*/>
                                <td className="number fw-bold">{i + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.info}</td>
                                <td>{item.price}</td>
                                <td>{item.likes}</td>
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
            </motion.table>
        </div>
    )
}

export default DesignsAdmin