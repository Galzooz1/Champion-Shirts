import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { InputContainer, LabelContainer, ModalInput } from '../../Client/LoginModal/InputWithIcon';
import RWDModal from '../../Client/LoginModal/RWDModal';
import { doApiMethod, URL_API } from '../../services/apiService';
import { ICategories } from '../interfaces/categoriesArgs';

interface AddCategoryProps {
    isModalVisible: boolean;
    onClose: () => void;
};

const AddCategory: React.FC<AddCategoryProps> = ({ isModalVisible, onClose }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<Partial<ICategories>>({ mode: 'all' });

    const onSubmit = (dataBody: any) => {
        console.log(dataBody);
        AddCategory(dataBody);
    }

    const AddCategory = async (dataBody: any) => {
        let url = URL_API + "/categories";
        let data = await doApiMethod(url, "POST", dataBody);
        console.log(data);
        if (data.s_id) {
            toast.success("Category Added!")
            window.location.reload();
        } else {
            console.log(dataBody)
            toast.error("There's a problem!")
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
                            </div>
                            <button className="btn btn-primary" type="submit">Add Category</button>
                        </form>
                    </>
                }
            />
        </>
    )
}

export default AddCategory