import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputContainer, LabelContainer, ModalInput } from '../../Client/LoginModal/InputWithIcon';
import RWDModal from '../../Client/LoginModal/RWDModal';
import { doApiGet, doApiMethod, URL_API } from '../../services/apiService';
import FirstStep from './AddProductForm/firstStep';
import SecondStep from './AddProductForm/secondStep';
import ThirdStep from './AddProductForm/thirdStep';
import { ICategories } from '../interfaces/categoriesArgs';
import { IProdItems } from '../interfaces/prodItems';

interface AddProductProps {
    isModalVisible: boolean;
    onClose: () => void;
};

const SpanUpload = styled.span`
cursor: pointer;
&:hover{
    text-decoration: underline;
}
`;

const AddProduct: React.FC<AddProductProps> = ({ onClose, isModalVisible }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<IProdItems>>({ mode: 'all' });
    let [categoriesAr, setCategoriesAr] = useState<Partial<ICategories[]>>([]);
    let [isUploadShown, setIsUploadShown] = useState<boolean>(false);
    let [formStep, setFormStep] = useState<number>(0);
    let fileRef = useRef<any>();


    useEffect(() => {
        getCategoriesData();
    }, []);

    const showUploadContainer = () => {
        setIsUploadShown(wasUploadShown => !wasUploadShown);
    }

    const onSubmit = (dataBody: any) => {
        console.log(dataBody);
        AddProduct(dataBody);
    }

    const nextFormStep = () => {
        setFormStep(cur => cur + 1);
    }
    const backFormStep = () => {
        setFormStep(cur => cur - 1);
    }

    const getCategoriesData = async () => {
        let url = URL_API + "/categories?sort=_id&reverse=yes&perPage=200"
        let data = await doApiGet(url)
        console.log(data);
        setCategoriesAr(data)
    }

    const AddProduct = async (dataBody: any) => {
        // if(!dataBody.image?.includes("http")){
        //     delete dataBody['image'];
        // }
        let url = URL_API + "/products";
        let data = await doApiMethod(url, "POST", dataBody);
        console.log(data);
        if (data.s_id) {
            if (fileRef.current.files.length > 0) {
                uploadFile(data.s_id);
            } else {
                toast.success("Product Added!")
                window.location.reload();
            }
        } else {
            console.log(dataBody)
            toast.error("There's a problem!")
        }
    }

    const uploadFile = async (s_id: number) => {
        console.log(fileRef.current.files[0]);
        const myData = new FormData();
        myData.append("fileSend", fileRef.current.files[0]);
        let url = URL_API + "/products/upload/" + s_id;
        try {
            let resp = await axios.put(url, myData, {
                headers: {
                    'auth-token': localStorage["token"],
                    'content-type': "multipart/form-data"
                }
            });
            if (resp.data.n === 1) {
                toast.success("Product Added!");
                window.location.reload();
            }
            console.log(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <RWDModal
                onBackdropClick={onClose}
                isModalVisble={isModalVisible}
                header={"wow"}
                message={"WOW2"}
                content={
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {formStep >= 0 && (
                                <section className={formStep === 0 ? "d-block" : "d-none"}>
                                    <FirstStep errors={errors} register={register} categoriesAr={categoriesAr} />
                                    <div className="mb-3">
                                        <LabelContainer className="text-warning">Image</LabelContainer>
                                        <InputContainer>
                                            <div>
                                                <ModalInput style={{ width: "550px" }} {...register("image", { required: false, minLength: 2 })} type="text" name="image" id="image" className="form-control" />
                                                {errors.image && <span className="text-danger m-2 text-center">Enter valid Image!</span>}
                                                <h3>Or <SpanUpload onClick={showUploadContainer}>Upload Image</SpanUpload></h3>
                                                {!isUploadShown ?
                                                    <div className="d-flex justify-content-between">
                                                        {/* {productData.image?.includes("http")
                                                                ?
                                                                <img src={productData.image} height="150" alt={productData.name} />
                                                                :
                                                                <img src={URL_API + productData.image + "?" + Date.now()} height="150" alt={productData.name} />
                                                            } */}
                                                        <ModalInput ref={fileRef} type="file" className="me-3" />
                                                    </div>
                                                    : ""
                                                }
                                            </div>
                                        </InputContainer>
                                    </div>
                                    <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-info">
                                        Next
                                    </button>
                                </section>)}
                            {formStep >= 1 && (
                                <section className={formStep === 1 ? "d-block" : "d-none"}>
                                    <SecondStep errors={errors} register={register} />
                                    <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-info">
                                        Next
                                    </button>
                                    <button onClick={backFormStep} type="button" className="btn btn-danger">
                                        Back
                                    </button>
                                </section>)}
                            {formStep >= 2 && (
                                <section className={formStep === 2 ? "d-block" : "d-none"}>
                                    <ThirdStep errors={errors} register={register} />
                                    <button disabled={!isValid} onClick={nextFormStep} type="button" className="btn btn-info">
                                        Next
                                    </button>
                                    <button onClick={backFormStep} type="button" className="btn btn-danger">
                                        Back
                                    </button>
                                </section>)}
                            {formStep >= 3 && (
                                <section className={formStep === 3 ? "d-block" : "d-none"}>
                                    <div className="text-center">
                                        <motion.h2 transition={{ duaration: 1.5, delay: 0.2 }} initial={{ x: '-100vh' }} animate={{ x: 0, color: 'white' }}>All Set?</motion.h2>
                                        <motion.h2 transition={{ duaration: 1.8, delay: 0.5 }} initial={{ x: '100vh' }} animate={{ x: 0, color: 'orange' }}>Go Ahead And Send it!</motion.h2>
                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                        <button onClick={backFormStep} type="button" className="btn btn-danger">
                                            Back
                                        </button>
                                    </div>
                                </section>)}
                        </form>
                        {/* {!isSecondStep ?
                            <button onClick={toggleSecondStep} className="btn btn-info">Next</button>
                            :
                            <button onClick={toggleSecondStep} className="btn btn-danger">Back</button>
                        } */}
                    </>
                }
            />
        </>
    )
}

export default AddProduct