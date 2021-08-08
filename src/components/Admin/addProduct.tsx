import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputContainer, LabelContainer, ModalInput } from '../Client/LoginModal/InputWithIcon';
import RWDModal from '../Client/LoginModal/RWDModal';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import { ICategories } from './interfaces/categoriesArgs';
import { IProdItems } from './interfaces/prodItems';

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

const AddProduct: React.FC<AddProductProps> = ({onClose, isModalVisible}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Partial<IProdItems>>({});
    let [categoriesAr, setCategoriesAr] = useState<Partial<ICategories[]>>([]);
    let [isUploadShown, setIsUploadShown] = useState<boolean>(false);
    let fileRef = useRef<any>();

    useEffect(() => {
        getCategoriesData();
    }, []);

    const onSubmit = (dataBody: any) => {
        console.log(dataBody);
        AddProduct(dataBody);
    }

    const showUploadContainer = () => {
        setIsUploadShown(wasUploadShown => !wasUploadShown);
    }

    const getCategoriesData = async () => {
        let url = URL_API + "/categories"
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
            if(fileRef.current.files.length > 0){
                uploadFile(data.s_id);
            }else{
                toast.success("Product Added!")
                window.location.reload();
            }
        } else {
            console.log(dataBody)
            toast.error("There's a problem!")
        }
    }

    const uploadFile = async (s_id:number) => {
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

    return(
        <>
        <RWDModal
            onBackdropClick={onClose}
            isModalVisble={isModalVisible}
            header={"wow"}
            message={"WOW2"}
            content={
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <div style={{ width: "569px" }}>
                        <LabelContainer className="text-warning">Name</LabelContainer>
                        <InputContainer>
                            {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                            <ModalInput {...register("name", { required: true, minLength: 2 })}  type="text" name="name" id="name" className="form-control" />
                            {errors.name && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                        </InputContainer>
                    </div>
                    <div className="mb-3">
                        <LabelContainer className="text-warning">Info</LabelContainer>
                        <InputContainer>
                            {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                            <ModalInput {...register("info", { required: true, minLength: 2 })}  type="text" name="info" id="info" className="form-control" />
                            {errors.info && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                        </InputContainer>
                    </div>
                    <div className="mb-3">
                        <LabelContainer className="text-warning">Price</LabelContainer>
                        <InputContainer>
                            {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                            <ModalInput {...register("price", { required: true, minLength: 2 })} type="text" name="price" id="price" className="form-control" />
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
                    <div className="mb-3">
                         <LabelContainer className="text-warning">Category</LabelContainer>
                         <InputContainer>
                             {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                             <select {...register("category_s_id", { required: true })} name="category_s_id" id="category_s_id" className="form-select" >
                                 {categoriesAr.map(item => {
                                     return (
                                         <option value={item?.s_id} key={item?.s_id}>{item?.name}</option>
                                     )
                                 })}
                             </select>
                         </InputContainer>
                     </div>
                </div>
                <button type="submit" className="btn btn-primary">Update Product</button>
            </form>
            }
        />
        </>
    )
}

export default AddProduct