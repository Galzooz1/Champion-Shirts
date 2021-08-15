import React from 'react';
import { IProdItems } from '../../Admin/interfaces/prodItems';

interface FirstDesignStepProps {
    errors: any;
    register: any;
    productData: Partial<IProdItems>;
};

interface colorSizeAr {
    color:string;
    sizes:string[];
}

const FirstDesignStep: React.FC<FirstDesignStepProps> = ({ productData, errors, register }) => {

    // React.useEffect( () => { 
    // initialArray()
    // },[]);
    
    // let colorSizeAr:any[] = [{
    // }];
    // // let data_array = [];
    // // let my_object = {};
    // const initialArray = () => {
    //     productData.properties?.forEach((item, i) => {
    //         console.log(item.amount.XS);
    //         colorSizeAr[i].color = item.color
    //         if(item.amount.XS > 0){
    //             colorSizeAr[i].sizes.push("XS");
    //         }
    //         if(item.amount.S > 0){
    //             colorSizeAr[i].sizes.push("S");
    //         }
    //         if(item.amount.M > 0){
    //             colorSizeAr[i].sizes.push("M");
    //         }
    //         if(item.amount.L > 0){
    //             colorSizeAr[i].sizes.push("L");
    //         }
    //         if(item.amount.XL > 0){
    //             colorSizeAr[i].sizes.push("XL");
    //         }
    //         if(item.amount.XXL > 0){
    //             colorSizeAr[i].sizes.push("XXL");
    //         }
    //         if(item.amount.XXXL > 0){
    //             colorSizeAr[i].sizes.push("XXXL");
    //         }
    //     });
    //     console.log(colorSizeAr);
    // }
    // let colorsAr = [
    //     {
    //         color:"pink",
    //         sizes:["XS","M"]
    //     }
    // ]
    // let sizeAr: string[] = [];
    // let colorAr: string[] = [];
    return (
        <>
            <div className="d-flex justify-content-center">
                <div>
                    <h2>{productData?.name}</h2>
                    <h4>{productData?.info}</h4>
                    <div className="d-flex">
                        <h4>Colors:</h4>
                        {productData.properties?.map((item, i) => {
                            // { sizeAr.push(...colorAr) };
                            return (
                                <>
                                {/* { colorsAr.push({color:`${item?.color}`, sizes:[]}) } */}
                                    <div className="form-check">
                                        <input {...register("color", { required: true })} type="radio" value={`${item?.color}`}
                                            name="flexRadioDisabled" id="properties.color"
                                            className="form-check-input border border-dark rounded-circle p-3 m-1" style={{ backgroundColor: `${item?.color}`, width: "30px", height: "30px" }} data-tip={`${item?.color}`} />
                                    </div>
                                    {errors.color && <span className="text-danger m-2 text-center">Please Choose Color</span>}
                                    {/* {item.amount.XS > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."XS"]}) : null}
                                    {item.amount.S > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."S"]}) : null}
                                    {item.amount.M > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."M"]}) : null}
                                    {item.amount.L > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."L"]}) : null}
                                    {item.amount.XL > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."XL"]}) : null}
                                    {item.amount.XXL > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."XXL"]}) : null}
                                    {item.amount.XXXL > 0 ? colorsAr.push({color:`${item?.color}`, sizes:[..."XXXL"]}) : null}
                                    {console.log(colorsAr)} */}
                                </>
                            )
                        })}
                        {/* SIZES */}
                        {/* {sizeAr.map((item, i) => {
                            return (
                                <>
                                <div className="form-check">
                                <label>
                                {item}
                                <input type="radio" value={`${item}`}
                                name="flexRadioDisabled" id="properties.color"
                                className="form-check-input border border-dark p-3 m-1" />
                                </label>
                                </div>
                                </>
                                )
                            })} */}
                        {/* {productData?.properties?..amount.XS > 0 ?
                        <div className="form-check">
                        <label>
                        <span>XS</span>
                        <input type="radio" value={`${item?.color}`}
                        name="flexRadioDisabled" id="properties.color"
                        className="form-check-input border border-dark p-3 m-1" data-tip={`${item?.color}`} />
                        </label>
                        </div>
                        : null
                    } */}
                    </div>
                    <div>
                    <h3>Price: {productData?.price} $</h3>
                    </div>
                </div>
                <div className="mx-5">
                <img className="border rounded-2 shadow mb-4" src={productData?.image} alt={productData?.name} width="400" />
                <div className="d-flex justify-content-around">
                <button className="btn btn-outline-danger">Back</button>
                <button className="btn btn-outline-primary">Continue</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default FirstDesignStep