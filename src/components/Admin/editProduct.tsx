import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputContainer, LabelContainer, ModalInput } from '../Client/LoginModal/InputWithIcon';
import RWDModal from '../Client/LoginModal/RWDModal';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import { ICategories } from './interfaces/categoriesArgs';
import { IProdItems } from './interfaces/prodItems';

interface EditProductProps {
    isModalVisible: boolean;
    onClose: () => void;
    productData: Partial<IProdItems>;
    getSingleProductData: () => Promise<void>;
    params: string;
};

const SpanUpload = styled.span`
cursor: pointer;
&:hover{
    text-decoration: underline;
}
`;

// const InputUpload = styled.input`
// border-radius: 50%;
// `;

const EditProduct: React.FC<EditProductProps> = ({ onClose, isModalVisible, productData, getSingleProductData, params }, props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Partial<IProdItems>>({});
    let [categoriesAr, setCategoriesAr] = useState<Partial<ICategories[]>>([]);
    let [isUploadShown, setIsUploadShown] = useState<boolean>(false);
    let fileRef = useRef<any>();
    let history = useHistory();

    useEffect(() => {
        getCategoriesData();
    }, []);


    const getCategoriesData = async() => {
        let url = URL_API + "/categories"
        let data = await doApiGet(url)
        console.log(data);
        setCategoriesAr(data)
    }

    const onSubmit = (dataBody: any) => {
        console.log(dataBody);
        editProduct(dataBody);
    }

    const editProduct = async (dataBody: any) => {
        if(!dataBody.image?.includes("http")){
            delete dataBody['image'];
        }
        let editId = params;
        let url = URL_API + "/products/" + editId;
        let data = await doApiMethod(url, "PUT", dataBody);
        console.log(data);
        if (data.n === 1) {
            toast.success("Product updated!")
            history.push("/admin");
        } else {
            console.log(dataBody)
            toast.error("There's a problem!")
        }
    }

    const showUploadContainer = () => {
        setIsUploadShown(wasUploadShown => !wasUploadShown);
    }

    const uploadFile = async () => {
        let editId = params;
        console.log(fileRef.current.files[0]);
        const myData = new FormData();
        myData.append("fileSend", fileRef.current.files[0]);
        let url = URL_API + "/products/upload/" + editId;
        try {
            let resp = await axios.put(url, myData, {
                headers: {
                    'auth-token': localStorage["token"],
                    'content-type': "multipart/form-data"
                }
            });
            if (resp.data.n === 1) {
                getSingleProductData()
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
                        <div className="mb-3">
                            <div style={{ width: "569px" }}>
                                <LabelContainer className="text-warning">Name</LabelContainer>
                                <InputContainer>
                                    {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                    <ModalInput {...register("name", { required: true, minLength: 2 })} defaultValue={productData.name} type="text" name="name" id="name" className="form-control" />
                                    {errors.name && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-warning">Info</LabelContainer>
                                <InputContainer>
                                    {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                    <ModalInput {...register("info", { required: true, minLength: 2 })} defaultValue={productData.info} type="text" name="info" id="info" className="form-control" />
                                    {errors.info && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-warning">Price</LabelContainer>
                                <InputContainer>
                                    {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                    <ModalInput {...register("price", { required: true, minLength: 2 })} defaultValue={productData.price} type="text" name="price" id="price" className="form-control" />
                                    {errors.price && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-warning">Image</LabelContainer>
                                <InputContainer>
                                    {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                    <div>
                                        <ModalInput style={{width:"550px"}} {...register("image", { required: false, minLength: 2 })} type="text" name="image" id="image" className="form-control" />
                                        {errors.image && <span className="text-danger m-2 text-center">Enter valid Image!</span>}
                                        <h3>Or <SpanUpload onClick={showUploadContainer}>Upload Image</SpanUpload></h3>
                                        {!isUploadShown ?
                                            <div className="d-flex justify-content-between">
                                                {productData.image?.includes("http")
                                                    ?
                                                    <img src={productData.image} height="150" alt={productData.name} />
                                                    :
                                                    <img src={URL_API + productData.image + "?" + Date.now()} height="150" alt={productData.name} />
                                                }
                                                <ModalInput ref={fileRef} type="file" onChange={uploadFile} className="me-3" />
                                            </div>
                                            : ""
                                        }
                                    </div>
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                 <LabelContainer className="text-warning">Category</LabelContainer>
                                 <InputContainer>
                                     {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                     <select {...register("category_s_id", { required: true })} name="category_s_id" id="category_s_id" className="form-select" >
                                         {categoriesAr.map(item => {
                                             return (
                                                 <option selected={(productData.category_s_id === item?.s_id)} value={item?.s_id} key={item?.s_id}>{item?.name}</option>
                                             )
                                         })}
                                     </select>
                                 </InputContainer>
                             </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Update Product</button>
                    </form>
                    </>
                    
                }
            />
        </>
    )
}

export default EditProduct