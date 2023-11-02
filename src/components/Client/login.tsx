import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { doApiMethod, URL_API } from '../services/apiService';
import LoginForm, { LoginFunction } from './loginForm';
import { SignUpFunction } from './signUpForm';

interface LoginProps {
    
};

const Login: React.FC<LoginProps> = () => {
    let history = useHistory();
    let [isModalVisible, setisModalVisible] = useState<boolean>(false);

    const toggleModal = () => { 
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
      }

    const onLoginRequested: LoginFunction = async (LoginArgs: any) => {
        let url:string = URL_API + "/users/login";
        let data = await doApiMethod(url, "POST", LoginArgs);
        if(data.token){
            localStorage.setItem("token", data.token);
            let url2 = URL_API + "/users/myInfo"
            let userInfo = await doApiMethod(url2, "GET");
            localStorage.setItem("userName", userInfo.name);
            onBackdropClick();
            window.location.reload();
            toast.success("Welcome Back, "+userInfo.name + "!");
        }else{
            toast.error("Username or password incorrect!");
        }
    }

    const onSignUpRequested: SignUpFunction = async(SignUpArgs: any):Promise<any[]> => {
        let url = URL_API + "/users/";
        let data = await doApiMethod(url, "POST", SignUpArgs);
        if(data._id){
            toast.success("Signed up successful!")
            return [true, data.confirmationCode, data._id];
        }else if(data.code === 11000){
            toast.error("Email already exist!")
            return [false, 0, ""];
        }else{
            toast.error("A problem occuried");
            return [false, 0, ""];
        }
    }

    return(
        <>
        <div>
            <button onClick={toggleModal} className="btn btn-primary mx-4">Login</button>
            <LoginForm isModalVisible={isModalVisible} onClose={onBackdropClick} onLoginRequested={onLoginRequested} onSignUpRequested={onSignUpRequested}/>
        <ReactTooltip/>
        </div>
        </>
    )
}

export default Login