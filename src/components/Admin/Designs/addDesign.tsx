import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputContainer, LabelContainer, ModalInput } from '../../Client/LoginModal/InputWithIcon';
import RWDModal from '../../Client/LoginModal/RWDModal';
import { doApiMethod, URL_API } from '../../services/apiService';
import { IDesigns } from '../interfaces/designs';

interface AddDesignProps {
    isModalVisible: boolean;
    onClose: () => void;
};

const SpanUpload = styled.span`
cursor: pointer;
&:hover{
    text-decoration: underline;
}
`;

const AddDesign: React.FC<AddDesignProps> = ({ isModalVisible, onClose }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<IDesigns>>({ mode: 'all' });
    let [isUploadShown, setIsUploadShown] = React.useState<boolean>(false);
    let fileRef = React.useRef<any>();


    const onSubmit = (dataBody: any) => {
        AddDesign(dataBody);
    }

    const AddDesign = async (dataBody: any) => {
        let url = URL_API + "/designs";
        let data = await doApiMethod(url, "POST", dataBody);
        if (data.s_id) {
            if (fileRef.current.files.length > 0) {
                uploadFile(data.s_id);
            } else {
                toast.success("Design Added!")
                window.location.reload();
            }
        } else {
            toast.error("There's a problem!")
        }
    }

    const showUploadContainer = () => {
        setIsUploadShown(wasUploadShown => !wasUploadShown);
    }

    const uploadFile = async (s_id: number) => {
        const myData = new FormData();
        myData.append("fileSend", fileRef.current.files[0]);
        let url = URL_API + "/designs/upload/" + s_id;
        try {
            let resp = await axios.put(url, myData, {
                headers: {
                    'auth-token': localStorage["token"],
                    'content-type': "multipart/form-data"
                }
            });
            if (resp.data.n === 1) {
                toast.success("Design Added!");
                window.location.reload();
            }
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
                                <div>
                                    <LabelContainer className="text-warning">Name</LabelContainer>
                                    <InputContainer>
                                        {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                        <ModalInput {...register("name", { required: true, minLength: 2 })} type="text" name="name" id="name" className="form-control" />
                                        {errors.name && <span className="text-danger m-2 text-center">Please type Name</span>}
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Info</LabelContainer>
                                    <InputContainer>
                                        {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                        <ModalInput {...register("info", { required: true, minLength: 2 })} type="text" name="info" id="info" className="form-control" />
                                        {errors.info && <span className="text-danger m-2 text-center">Please type Info</span>}
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Price</LabelContainer>
                                    <InputContainer>
                                        {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                        <ModalInput {...register("price", { required: false, minLength: 1 })} type="number" name="price" id="price" className="form-control" />
                                        {errors.price && <span className="text-danger m-2 text-center">Please type Price</span>}
                                    </InputContainer>
                                </div>
                                <div>
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
                                <div>
                                    <LabelContainer className="text-warning">Width</LabelContainer>
                                    <InputContainer>
                                        <ModalInput {...register("width", { required: true, minLength: 1 })} type="number" name="width" id="width" className="form-control" />
                                        {errors.width && <span className="text-danger m-2 text-center">Please type Width</span>}
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Height</LabelContainer>
                                    <InputContainer>
                                        <ModalInput {...register("height", { required: true, minLength: 1 })} type="number" name="height" id="height" className="form-control" />
                                        {errors.height && <span className="text-danger m-2 text-center">Please type Height</span>}
                                    </InputContainer>
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Add Design</button>
                        </form>
                    </>
                }
            />
        </>
    )
}

export default AddDesign