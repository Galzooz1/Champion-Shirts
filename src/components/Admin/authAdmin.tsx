import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { doApiMethod, URL_API } from '../services/apiService';

interface AuthAdminProps {
  match: any;
}


const AuthAdmin: React.FC<AuthAdminProps> = (props) => {
  let history = useHistory();

  useEffect(() => {
    // check if there's token
    //TODO: check if already in /admin
    if (!localStorage["token"]) {
      history.push("/home");
    }
    else {
      checkIfAdmin();
    }
  }, [props.match])

  const checkIfAdmin = async () => {
    let url = URL_API + "/users/checkAdmin";
    let data = await doApiMethod(url, "POST", {});
    // check if the token is valid and the user is admin
    if (data.auth !== "success") {
      localStorage.removeItem("token");
      history.push("/home");
    }

  }
    return (
      <React.Fragment></React.Fragment>
    );
}
  export default AuthAdmin