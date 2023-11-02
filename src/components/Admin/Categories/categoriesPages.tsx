import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiService';

interface CategoriesPagesProps {

};


const CategoriesPages: React.FC<CategoriesPagesProps> = () => {
    let [pages, setPages] = React.useState(0);
    let perPage = 5;

    useEffect(() => {
        doCountApi();
    }, []);

    const doCountApi = async () => {
        let data = await doApiGet(URL_API + "/categories/count");
        setPages(Math.ceil(data.count / perPage));
    }
    return (
        <>
            <span>Page:</span>
            {[...Array(pages)].map((item, i) => {
                return (
                    <>
                        <Link key={i} to={"/admin/categories/" + i} className="btn btn-dark">{i + 1}</Link>
                    </>
                )
            })}
        </>
    )
}

export default CategoriesPages