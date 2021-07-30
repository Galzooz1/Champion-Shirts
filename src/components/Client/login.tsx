import React from 'react';
import { useState } from 'react';
import RWDModal from './LoginModal/RWDModal';

interface LoginProps {
    
};

const Login: React.FC<LoginProps> = () => {
    let [isModalVisble, setisModalVisble] = useState<boolean>(false);

    const toggleModal = () => { 
        //Just another way of -> isModalVisble ? setisModalVisble(false) : setisModalVisble(true);
        setisModalVisble(wasModalVisble => !wasModalVisble);
    }

    return(
        <div>
            <button onClick={toggleModal} className="btn btn-primary">Login</button>
            <RWDModal isModalVisble={isModalVisble} onBackdropClick={toggleModal} header="Login" message="Please log in"/>
        </div>
    )
}

export default Login