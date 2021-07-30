import React from 'react';
import { useForm } from 'react-hook-form';
import { IconContainer, InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';
import RWDModal from './LoginModal/RWDModal';
import UserIcon from '../../assets/user.svg';
import PasswordIcon from '../../assets/password.svg'

    export interface LoginArgs {
        email: string;
        password: string;
    }
    
    export type LoginFunction = (args: LoginArgs) => Promise<void>;
    
    interface LoginFormProps {
        onClose: () => void;
        isModalVisible: boolean;
        loginError?: string;
        onLoginRequested: LoginFunction;
    };

const LoginForm: React.FC<LoginFormProps> = ({  loginError, isModalVisible, onClose, onLoginRequested,}) => {

    const {register, handleSubmit, formState: { errors }} = useForm<LoginArgs>();
    // let history = useHistory();

    let emailRef = register("email",{required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i});
    let passwordRef = register("password",{required: true, minLength:3})

    const onSubmit = (LoginArgs:any) => { 
        console.log(LoginArgs);
        onLoginRequested(LoginArgs);
    }

    // const doApi = async(dataBody:any) => { 
    //     let url:string = URL_API + "/users/login";
    //     let data = await doApiMethod(url, "POST", dataBody);
    //     console.log(data);
    //     if(data.token){
    //         localStorage.setItem("token", data.token);
    //         history.push("/admin");
    //         toast.success("You logged in!");
    //     }else{
    //         toast.error("Username or password incorrect!");
    //     }
    // }

    return(
        <>
        <RWDModal
        onBackdropClick={onClose}
        isModalVisble={isModalVisible}
        header="Login"
        message="Please Log in"
        content={
            <form onSubmit={handleSubmit(onSubmit)} className="col-lg-6 mx-auto p-2 shadow mt-3" data-type="info" data-tip="Login to both client and admin, enter the admin panel from regular homePage if the user is an admin">
                <div className="mb-3">
                    <LabelContainer className="text-warning">Email</LabelContainer>
                    <InputContainer>
                    {UserIcon && <IconContainer><img src={UserIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>}
                    <ModalInput {...emailRef} type="text" className="form-control" />
                    </InputContainer>
                    {errors.email && <span className="text-danger">Email not valid!</span>}
                </div>
                <div className="mb-3">
                    <LabelContainer className="text-warning">Password</LabelContainer>
                    <InputContainer>
                    {PasswordIcon && <IconContainer><img src={PasswordIcon} width="24px" height="24px" alt="password-icon" /></IconContainer>}
                    <ModalInput {...passwordRef} type="text" name="password" id="password" className="form-control" />
                    </InputContainer>
                    {errors.password && <span className="text-danger">Password not valid!</span>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        }
            />
        </>
    )
}

export default LoginForm