import React, { useRef } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import NameIcon from '../../assets/name.svg';
import PasswordIcon from '../../assets/password.svg'
import UserIcon from '../../assets/user.svg';
import {  doApiGet,  URL_API } from '../services/apiService';
import { IconContainer, InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';

interface SignUpFormProps {
    onClose: () => void;
    isModalVisible: boolean;
    loginError?: string;
    onSignUpRequested: SignUpFunction;
    toggleSignUp: () => void;
};

export interface SignUpArgs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    password2: string;
};

// export type returnedValues = {
// isSigned: boolean,
// confirmationCode?: string,
// userId?: string
// }

// export type UserConfirmFunction = (code: string) => Promise<void>;
export type SignUpFunction = (args: SignUpArgs) => Promise<any[]>;

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    let history = useHistory();
    let results:any[] = [];
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<SignUpArgs>();
    let [isSigned, setIsSigned] = useState<boolean>(false);
    let [confirmationCode, setConfirmationCode] = useState<string>("");
    let [userId, setUserId] = useState<string>();
    let verifyCodeRef = useRef<HTMLInputElement | any>();
    // let [isVerified, setIsVerified] = useState<boolean>(false);

    const onSubmit = async(SignUpArgs: any) => {
        console.log(SignUpArgs);
        delete SignUpArgs['password2'];
        results = await props.onSignUpRequested(SignUpArgs);
        setIsSigned(results[0]);
        setConfirmationCode(results[1]);
        setUserId(results[2]);
    }

    const verifyUser = () => { 
        console.log(verifyCodeRef.current.value);
        console.log(confirmationCode);
        if(verifyCodeRef.current.value === confirmationCode){
            doUserConfirm(verifyCodeRef.current.value)
            // setIsVerified(true);
            toast.success("Confirmation succeed!")
            history.push("/users/confirm/" + verifyCodeRef.current.value);
        }else{
            alert("please verify it again!")
        }
    }

    const doUserConfirm = async(code: string) => { 
        let url = URL_API + "/users/confirm/" + code;
        let data = await doApiGet(url);
        console.log(data);
    }

    const resendConfirmationCode = async() => { 
        let url = URL_API + "/users/confirm/" + userId;
        let data = await doApiGet(url);
        console.log(data);
        setConfirmationCode(data);
        toast.info("Confirmation code sent again, Please check your Email!")
        // console.log(confirmationCode);
    }

    return (
        (!isSigned ?
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex">
                <div className="me-3">
                    <LabelContainer className="text-warning">First Name</LabelContainer>
                    <InputContainer>
                        {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                        <ModalInput {...register("firstName", { required: true, minLength: 2 })} type="text" name="firstName" id="firstName" className="form-control" />
                        {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                    </InputContainer>
                </div>
                <div className="ms-3">
                    <LabelContainer className="text-warning">Last Name</LabelContainer>
                    <InputContainer>
                        {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                        <ModalInput {...register("lastName", { required: true, minLength: 2 })} type="text" name="lastName" id="lastName" className="form-control" />
                        {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                    </InputContainer>
                </div>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Email</LabelContainer>
                <InputContainer>
                    {UserIcon && <IconContainer><img src={UserIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                    <ModalInput {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} type="text" name="email" id="email" className="form-control" />
                    {errors.email && <span className="text-danger m-2 text-center">Email not valid!</span>}
                </InputContainer>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Password</LabelContainer>
                <InputContainer>
                    {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                    <ModalInput {...register("password", { required: true, minLength: 3 })} type="text" name="password" id="password" className="form-control" />
                    {errors.password && <span className="text-danger m-2 text-center">Password not valid!</span>}
                </InputContainer>
            </div>
            <div className="mb-3">
                <LabelContainer className="text-warning">Confirm Password</LabelContainer>
                <InputContainer>
                    {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                    <ModalInput {...register("password2", {
                        required: true, validate: (val: any) => {
                            return val === getValues().password;
                        }
                    })} type="text" name="password2" id="password2" className="form-control" />
                    {errors.password2 && <span className="text-danger m-2 text-center">Password doesn't match!</span>}
                </InputContainer>
            </div>
            <hr className="bg-white mt-4" />
            <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary me-4">Sign Up</button>
                <h2 className="text-white">Or</h2>
                <button className="btn btn-danger ms-4" onClick={props.toggleSignUp}>Login</button>
            </div>
        </form>
        :
        <>
        <div className="p-2 text-white">We Sent you an Email verification, please write the code below</div>
        <InputContainer className="p-3">
        <ModalInput ref={verifyCodeRef} type="text" name="verify" className="form-control"/>
        <button onClick={verifyUser} className="btn btn-success">Verify</button>
        </InputContainer>
        <div className="d-flex justify-content-around mt-3">
        <div className="display-6 text-white">Didn't get a code?</div>
        <button onClick={resendConfirmationCode} className="btn btn-danger">Send me code Again</button>
        </div>
        {/* {isVerified ? <UserConfirm doUserConfirm={doUserConfirm} /> : null} */}
        </>
    )
    )
}

export default SignUpForm