import React from 'react';
import { useForm } from 'react-hook-form';
import NameIcon from '../../assets/name.svg';
import PasswordIcon from '../../assets/password.svg'
import UserIcon from '../../assets/user.svg';
import { IconContainer, InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';

interface SignUpFormProps {
    onClose: () => void;
    isModalVisible: boolean;
    loginError?: string;
    onSignUpRequested: SignUpFunction;
    toggleSignUp: () => void;
};

interface SignUpArgs {
    firstName: string;
    lastName: string;
    email:string;
    password:string;
    // password2?:string;
    // phone:string; -> on CheckOut
    // address:string; -> on CheckOut
};

export type SignUpFunction = (args: SignUpArgs) => Promise<void>;

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const {register, handleSubmit, getValues, formState: {errors} } = useForm();

    let firstNameRef = register("firstName", {required: true, minLength: 2});
    let lastNameRef = register("lastName", {required: true, minLength: 2});
    let emailRef = register("email",{required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i});
    let passwordRef = register("password",{required: true, minLength:3})
    let password2Ref = register("password2",{required: true, validate: (val: any) => {
        return val === getValues().password;
    }})


    const onSubmit = (SignUpArgs: any) => {
        console.log(SignUpArgs);
        props.onSignUpRequested(SignUpArgs);
    }
    return(
        <form onClick={handleSubmit(onSubmit)}>
            <div className="d-flex">
                <div className="me-3">
                <LabelContainer className="text-warning">First Name</LabelContainer>
                <InputContainer>
                {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                <ModalInput {...firstNameRef} type="text" name="firstName" id="firstName" className="form-control" />
                {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                </InputContainer>
                </div>
                <div className="ms-3">
                <LabelContainer className="text-warning">Last Name</LabelContainer>
                <InputContainer>
                {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                <ModalInput {...lastNameRef} type="text" name="lastName" id="lastName" className="form-control" />
                {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                </InputContainer>
                </div>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Email</LabelContainer>
                <InputContainer>
                {UserIcon && <IconContainer><img src={UserIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                <ModalInput {...emailRef} type="text" name="email" id="email" className="form-control" />
                {errors.email && <span className="text-danger m-2 text-center">Email not valid!</span>}
                </InputContainer>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Password</LabelContainer>
                <InputContainer>
                {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                <ModalInput {...passwordRef} type="text" name="password" id="password" className="form-control" />
                {errors.password && <span className="text-danger m-2 text-center">Password not valid!</span>}
                </InputContainer>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Confirm Password</LabelContainer>
                <InputContainer>
                {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                <ModalInput {...password2Ref} type="text" name="password2" id="password2" className="form-control" />
                {errors.password2 && <span className="text-danger m-2 text-center">Password doesn't match!</span>}
                </InputContainer>
            </div>
            <hr className="bg-white mt-4" />
            <div className="d-flex justify-content-center mt-4">
            <button type="submit" className="btn btn-primary me-4">Sign Up</button>
            <h2 className="text-white">Or</h2>
            <button className="btn btn-danger ms-4" onClick={props.toggleSignUp}>Back</button>
            </div>
        </form>
    )
}

export default SignUpForm