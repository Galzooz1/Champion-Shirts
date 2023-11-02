import React from 'react';
import { IDesigns } from '../../Admin/interfaces/designs';
import { IProdItems, Property } from '../../Admin/interfaces/prodItems';
import { doApiGet, URL_API } from '../../services/apiService';
import Loading from '../loading';
import SecondStepPanel from './secondStepPanel';
import SecondStepWorkspace from './secondStepWorkspace';

interface SecondStepAppProps {
    errors: any;
    register: any;
    productData: Partial<IProdItems>;
    propertiesData: Partial<Property[]>;
    indexPicked: number;
    setValue?:any;
    chosenSide?:string;
    reset?:any;
    unregister?:any;
    setIsDesignClicked?:any;
    isDesignClicked?:any;
    backFlag:boolean;
    extraPrice: (amount: number) => void;
    isImageFileClicked?:any;
    setIsImageFileClicked?:any;
};

export interface IDesignsArr {
    image:any;
    width:any;
    height:any;
    name:any;
}

const newDesign = (_image: any, _width: number, _height: number, _name: string, _s_id: number) => ({
    image: _image,
    width: _width,
    height: _height,
    name: _name,
    s_id: _s_id
})

const newUploadedImage = (_image: any) => ({
    image: _image,
    width: 100,
    height: 100,
})

const SecondStepApp: React.FC<SecondStepAppProps> = ({isImageFileClicked, setIsImageFileClicked ,extraPrice ,backFlag ,isDesignClicked, setIsDesignClicked, unregister ,reset ,chosenSide ,setValue ,productData, propertiesData, indexPicked, errors, register }) => {
    let [designsData, setDesignsData] = React.useState<Partial<IDesigns[]>>([]);
    let [designsAr, setDesignsAr] = React.useState<any[]>([{}]);
    let [filesAr, setFilesAr] = React.useState<any[]>([{}]);
    const [selectedFiles, setSelectedFiles ] = React.useState<any[]>([]);

    React.useEffect(() => {
        getDesignsData();
        
    }, [selectedFiles]);
    
    
    const getDesignsData = async () => {
        let url = URL_API + "/designs";
        let data = await doApiGet(url);
        setDesignsData(data);
    }
    
    const handleDesignClicked = (_image: any, _height: any, _width: any, _name: any, _s_id: number) => { 
        if(!_image.includes("http")){
            _image = URL_API + _image + "?" + Date.now();
        }
        setDesignsAr([...designsAr,{...newDesign(_image,_width,_height,_name, _s_id)}]);
        setIsDesignClicked(true);
    }

    const handleFileClicked = (_image: any) => { 
        if(!_image.includes("http")){
            _image = URL_API + _image + "?" + Date.now();
        }
        setFilesAr([...filesAr,{...newUploadedImage(_image)}])
        setIsImageFileClicked(true);
    }

    const premuimExtraPrice = (_price: number, _clicks: number) => {
        let sum = _price;
        if(_clicks > 0){
            sum *= _clicks
        }

        extraPrice(sum);
    }
    
    return (    
        <div style={{ height: "600px" }} className="d-flex justify-content-between p-3">
            {designsData.length === 0 && <Loading />}
            <div className="col-lg-4">
                <SecondStepPanel premuimExtraPrice={premuimExtraPrice} handleFileClicked={handleFileClicked} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} designsData={designsData} productData={productData} handleDesignClicked={handleDesignClicked} />
            </div>
            <div className="col-lg-8">
                <SecondStepWorkspace premuimExtraPrice={premuimExtraPrice} backFlag={backFlag} unregister={unregister} reset={reset} chosenSide={chosenSide} setValue={setValue} register={register} errors={errors} filesAr={filesAr} setFilesAr={setFilesAr} setDesignAr={setDesignsAr} designsAr={designsAr} isImageFileClicked={isImageFileClicked} isDesignClicked={isDesignClicked} designsData={designsData} propertiesData={propertiesData} indexPicked={indexPicked} productData={productData} />
            </div>
        </div>
    )
}

export default SecondStepApp