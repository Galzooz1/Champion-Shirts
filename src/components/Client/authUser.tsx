import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { doApiMethod, URL_API } from '../services/apiService';

interface AuthUserProps {

};

const AuthUser: React.FC<AuthUserProps> = (props) => {
    let history = useHistory();
    React.useEffect(()=> {
        console.log("auth log")
        // check if there token
        //TODO: check if already in /admin
        if(localStorage["token"]){
            doApi();
        }
      },[props]);

      const doApi = async() => {
        let url = URL_API+"/users/checkUser";
        let data = await doApiMethod(url,"POST", {});
        // check if the token is valid and the user is admin
        if(data.auth != "success"){
          localStorage.removeItem("token");
          history.push("/home");
        }
      }
    return(
        <React.Fragment>
        </React.Fragment>
    )
}

export default AuthUser