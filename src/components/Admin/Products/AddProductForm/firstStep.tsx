import React from 'react';
import { InputContainer, LabelContainer, ModalInput } from '../../../Client/LoginModal/InputWithIcon';
import { ICategories } from '../../interfaces/categoriesArgs';

interface FirstStepProps {
    errors: any;
    register: any;
    categoriesAr: Partial<ICategories[]>;
};



const FirstStep: React.FC<FirstStepProps> = ({ errors, register, categoriesAr }) => {

    return (
        <>
            <div className="mb-3">
                <div style={{ width: "569px" }}>
                    <LabelContainer className="text-warning">Name</LabelContainer>
                    <InputContainer>
                        {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                        <ModalInput {...register("name", { required: true, minLength: 2 })} type="text" name="name" id="name" className="form-control" />
                        {errors.name && <span className="text-danger m-2 text-center">Please type Name</span>}
                    </InputContainer>
                </div>
                <div className="mb-3">
                    <LabelContainer className="text-warning">Info</LabelContainer>
                    <InputContainer>
                        {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                        <ModalInput {...register("info", { required: true, minLength: 2 })} type="text" name="info" id="info" className="form-control" />
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

        </>
    )
}

export default FirstStep