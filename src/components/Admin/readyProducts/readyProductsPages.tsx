import React from 'react';
import { Link } from 'react-router-dom';
import { doApiGet, URL_API } from '../../services/apiService';

interface ReadyProductsPagesProps {
    
};

const ReadyProductsPages: React.FC<ReadyProductsPagesProps> = () => {
    let [pages, setPages] = React.useState(0);
    let perPage = 5;

    React.useEffect(() => {
        doCountApi();
    }, []);

    const doCountApi = async () => {
        let data = await doApiGet(URL_API + "/readyProducts/count");
        setPages(Math.ceil(data.count / perPage));
    }
    return(
        <>
            <span>Page:</span>
            {[...Array(pages)].map((item, i) => {
                return (
                    <>
                        <Link key={i} to={"/admin/readyProducts/" + i} className="btn btn-dark">{i + 1}</Link>
                    </>
                )
            })}
        </>
    )
}

export default ReadyProductsPages