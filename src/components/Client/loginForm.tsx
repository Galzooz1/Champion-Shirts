import React from 'react';
import { useForm } from 'react-hook-form';
import { IconContainer, InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';
import RWDModal from './LoginModal/RWDModal';
import UserIcon from '../../assets/user.svg';
import PasswordIcon from '../../assets/password.svg'
import { useState } from 'react';
import SignUpForm, { SignUpFunction } from './signUpForm';

    interface LoginArgs {
        email: string;
        password: string;
    }
    
    export type LoginFunction = (args: LoginArgs) => Promise<void>;
    
    interface LoginFormProps {
        onClose: () => void;
        isModalVisible: boolean;
        loginError?: string;
        onLoginRequested: LoginFunction;
        onSignUpRequested: SignUpFunction;
    };

const LoginForm: React.FC<LoginFormProps> = ({  loginError, isModalVisible, onClose, onLoginRequested, onSignUpRequested}, props) => {

    const {register, handleSubmit, formState: { errors }} = useForm<LoginArgs>();
    // let history = useHistory();

    let emailRef = register("email",{required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i});
    let passwordRef = register("password",{required: true, minLength:3})
    let [isSignUp, setIsSignUp] = useState<boolean>(false);

    const onSubmit = (LoginArgs:any) => { 
        console.log(LoginArgs);
        onLoginRequested(LoginArgs);
    }

    const toggleSignUp = () => { 
        setIsSignUp(wasSignUp => !wasSignUp);
    }

    return(
        <>
        <RWDModal
        onBackdropClick={onClose}
        isModalVisble={isModalVisible}
        header={(!isSignUp ? "Login" : "Sign Up")}
        message={(!isSignUp ? "Please Login" : "Sign Up Now")}
        content={
        (!isSignUp ? 
            <form onSubmit={handleSubmit(onSubmit)} data-type="info" data-tip="Login to both client and admin, enter the admin panel from regular homePage if the user is an admin">
                <div className="mb-3">
                    <LabelContainer className="text-warning">Email</LabelContainer>
                    <InputContainer>
                    {UserIcon && <IconContainer><img src={UserIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                    <ModalInput {...emailRef} type="text" className="form-control" />
                    {errors.email && <span className="text-danger m-2 text-center">Email not valid!</span>}
                    </InputContainer>
                </div>
                <div className="mb-3">
                    <LabelContainer className="text-warning">Password</LabelContainer>
                    <InputContainer>
                    {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="password-icon" /></IconContainer>}
                    <ModalInput {...passwordRef} type="text" name="password" id="password" className="form-control" />
                    {errors.password && <span className="text-danger m-2 text-center">Password not valid!</span>}
                    </InputContainer>
                </div>
                <hr className="bg-white" />
                <div className="d-flex justify-content-around">
                <button type="submit" className="btn btn-primary">Login</button>
                <h2 className="text-white">Or</h2>
                <button className="btn btn-danger" onClick={toggleSignUp}>SignUp</button>
                </div>
            </form>
            :
            <div>
            <SignUpForm {...props} onSignUpRequested={onSignUpRequested} toggleSignUp={toggleSignUp}/>
            </div>
            )
        }
            />
        </>
    )
}

export default LoginForm