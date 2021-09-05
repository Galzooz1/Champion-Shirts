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
    // let [isDesignClicked, setIsDesignClicked] = React.useState<any>(false);
    // let [isImageFileClicked, setIsImageFileClicked] = React.useState<any>(false);
    let [designsAr, setDesignsAr] = React.useState<any[]>([{}]);
    let [filesAr, setFilesAr] = React.useState<any[]>([{}]);
    const [selectedFiles, setSelectedFiles ] = React.useState<any[]>([]);

    // let DesignsArr:IDesignsArr[] = [];
    React.useEffect(() => {
        getDesignsData();
        console.log(selectedFiles);
        
        // fixDesignsData();
        // console.log(DesignsArr);
    }, [selectedFiles]);
    
    
    const getDesignsData = async () => {
        let url = URL_API + "/designs";
        let data = await doApiGet(url);
        console.log("Designssss",data);
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
        console.log(_clicks)
        console.log(_price)
        let sum = _price;
        if(_clicks > 0){
            sum *= _clicks
        }
        // alert(sum + " " + _clicks)
        if(_price < 0){
            // alert(sum + " " + _clicks)
        } 
        console.log(sum)
        extraPrice(sum);
    }

    // const fixDesignsData = () => {
    //     for (let i = 0; i < designsData.length; i++) {
    //         const newOb = {
    //             image:designsData[i]?.image,
    //             width:designsData[i]?.width,
    //             height:designsData[i]?.height,
    //             name:designsData[i]?.name
    //         }
    //         DesignsArr.push(newOb)
    //     }
    //     for (let i = 0; i < DesignsArr.length; i++) {
    //         if(!DesignsArr[i].image.includes("http")){
    //             DesignsArr[i].image = URL_API + DesignsArr[i].image + "?" + Date.now();
    //         }
    //     }
    //     console.log('asd - ',DesignsArr)
    // }
    
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