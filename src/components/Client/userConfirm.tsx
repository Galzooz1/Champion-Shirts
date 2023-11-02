import React from 'react';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { doApiGet, URL_API } from '../services/apiService';

type UserConfirmParams = {
    confirmationCode:string;
};

type UserConfirmProps = RouteComponentProps<UserConfirmParams>;

const UserConfirm: React.FC<UserConfirmProps> = (props) => {
    let history = useHistory()
    const doUserConfirm = async(code: string) => { 
        let url = URL_API + "/users/confirm/" + code;
        let data = await doApiGet(url);
        console.log(data);
    }
    if(history.action !== "PUSH"){
        if(props.match.path === "/users/confirm/:confirmationCode"){
            doUserConfirm(props.match.params.confirmationCode);
        }
    }else{
        console.log("that worked");
    }
    return(
        <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Account confirmed!</strong>
          </h3>
        </header>
        <Link to={"/"}>
          Please Login
        </Link>
      </div>
    )
}

export default UserConfirm