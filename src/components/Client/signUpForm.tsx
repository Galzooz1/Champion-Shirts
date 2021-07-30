import React from 'react';

interface SignUpFormProps {
    onClose: () => void;
    isModalVisible: boolean;
    loginError?: string;
    onSignUpRequested: SignUpFunction;
};

interface SignUpArgs {
    firstName: string;
    lastName: string;
    email:string;
    password1:string;
    password2:string;
    phone:string;
    address:string;
};

export type SignUpFunction = (args: SignUpArgs) => Promise<void>;

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
    const onSubmit = (SignUpArgs: any) => {
        props.onSignUpRequested(SignUpArgs);
    }
    return(
        <div onClick={onSubmit}>
            SignUpForm work
        </div>
    )
}

export default SignUpForm