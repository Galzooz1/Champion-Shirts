import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {doApiMethod, URL_API} from '../services/apiService';

type Inputs = {
    email: string,
    password: string
}

const Login = () => {

    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>();
    let history = useHistory();

    let emailRef = register("email",{required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i});
    let passwordRef = register("password",{required: true, minLength:3})

    const onSubmit = (dataBody:any) => { 
        console.log(dataBody);
        doApi(dataBody);
    }

    const doApi = async(dataBody:any) => { 
        let url:string = URL_API + "/users/login";
        let data = await doApiMethod(url, "POST", dataBody);
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
            <form onSubmit={handleSubmit(onSubmit)} className="col-lg-6 mx-auto p-2 shadow mt-3" data-type="info" data-tip="Login to both client and admin, enter the admin panel from regular homePage if the user is an admin">
                <div className="mb-3">
                    <label>Email</label>
                    <input {...emailRef} type="text" className="form-control" />
                    {errors.email && <span className="text-danger">Email not valid!</span>}
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input {...passwordRef} type="text" name="password" id="password" className="form-control" />
                    {errors.password && <span className="text-danger">Password not valid!</span>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
    )
}

export default Login