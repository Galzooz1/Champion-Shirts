import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { doApiMethod, URL_API } from '../services/apiService';
import LoginForm, { LoginFunction } from './loginForm';

interface LoginProps {
    
};

const Login: React.FC<LoginProps> = () => {
    let history = useHistory();
    let [isModalVisible, setisModalVisible] = useState<boolean>(false);

    const toggleModal = () => { 
        //Just another way of -> isModalVisible ? setisModalVisible(false) : setisModalVisible(true);
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }

    const onBackdropClick = () => {
        setisModalVisible(false)
      }

    const onLoginRequested: LoginFunction = async (LoginArgs: any) => {
        let url:string = URL_API + "/users/login";
        let data = await doApiMethod(url, "POST", LoginArgs);
        console.log(data);
        if(data.token){
            localStorage.setItem("token", data.token);
            history.push("/admin");
            toast.success("You logged in!");
        }else{
            toast.error("Username or password incorrect!");
        }
    }

    return(
        <>
        <div>
            <button onClick={toggleModal} className="btn btn-primary">Login</button>
            <LoginForm isModalVisible={isModalVisible} onLoginRequested={onLoginRequested} onClose={onBackdropClick}/>
        <ReactTooltip/>
        </div>
        </>
    )
}

export default Login