import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from './header';
import { IconContainer, InputContainer, LabelContainer, ModalInput } from './LoginModal/InputWithIcon';
import NameIcon from '../../assets/name.svg';
import PasswordIcon from '../../assets/password.svg'
import UserIcon from '../../assets/user.svg';
import { useForm } from 'react-hook-form';
import { IUsers } from '../Admin/interfaces/users';
import { doApiGet, doApiMethod, URL_API } from '../services/apiService';
import { toast } from 'react-toastify';
import axios from 'axios';


interface UserPanelParams {
    _id: string;
};

type UserPanelProps = RouteComponentProps<UserPanelParams>

export const DesignedH1 = styled.h1`
text-align: start;
margin-left: 40px;
margin-top:26px;
z-index: 1;
position: relative;
font-family: poppins;
font-weight: 400;
`;

export const DesignedLine = styled.div`
height:18px;
background-color:#487686;
width:100%;
position:relative;
top:-12px;
border-radius: 2px;
`;

const UserPanel: React.FC<UserPanelProps> = (props) => {
    const { register, handleSubmit, getValues, formState: { errors }, setFocus, reset } = useForm<IUsers>();
    let firstNameRef = React.useRef<HTMLInputElement>(null)
    let [editFirstName, setEditFirstName] = React.useState<boolean>(false);
    let [editLastName, setEditLastName] = React.useState<boolean>(false);
    let [editPassword, setEditPassword] = React.useState<boolean>(false);
    let [editPhone, setEditPhone] = React.useState<boolean>(false);
    let [editAddress, setEditAddress] = React.useState<boolean>(false);
    let [editAvatar, setEditAvatar] = React.useState<boolean>(false);
    let [isCheckbox, setIsCheckbox] = React.useState<boolean>(false);
    let fileRef = React.useRef<any>();

    let [userInfo, setUserInfo] = React.useState<IUsers>();

    React.useEffect(() => {
        setFocus("firstName");
        setFocus("lastName");
        setFocus("password");
        setFocus("phone");
        setFocus("address");
        setFocus("avatar_img");
        getUserInfo();
    }, [editFirstName, editLastName, editPassword, editPhone, editAddress, editAvatar]);

    const getUserInfo = async () => {
        let url = URL_API + "/users/myInfo";
        let data = await doApiMethod(url, "GET");
        console.log(data);
        setUserInfo(data);
    }

    const editUserInfo = async (dataBody: IUsers) => {
        let url = URL_API + "/users/" + userInfo?._id;
        let data = await doApiMethod(url, "PUT", dataBody);
        console.log(data);
        if (data.n === 1) {
            window.location.reload();
            toast.success("User Updated!")
        } else {
            toast.info("Nothing to change here")
        }
    }

    const onSubmit = (dataBody: IUsers) => {
        if (dataBody.password !== "" && dataBody.avatar_img !== "") {
            console.log(dataBody);
            editUserInfo(dataBody)
        } else {
            toast.error("Please Fill empty Fields!")
        }
    }

    const uploadFile = async () => {
        let editId = userInfo?._id;
        console.log(fileRef.current.files[0]);
        const myData = new FormData();
        myData.append("fileSend", fileRef.current.files[0]);
        let url = URL_API + "/users/upload/" + editId;
        try {
            let resp = await axios.put(url, myData, {
                headers: {
                    'auth-token': localStorage["token"],
                    'content-type': "multipart/form-data"
                }
            });
            if (resp.data.n === 1) {
                getUserInfo()
                toast.success("Avatar Image Updated!")
            }
            console.log(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <div className="mx-auto mt-4 container">
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/"}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item active>User Panel</Breadcrumb.Item>
                    <Breadcrumb.Item active>My Info</Breadcrumb.Item>
                </Breadcrumb>
                <DesignedH1>User Panel</DesignedH1>
                <DesignedLine>
                </DesignedLine>
                <div className="d-flex justify-content-center mt-3 m-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Personal Information</h2>
                        <div className="mx-auto mt-4">
                            <div className="d-flex justify-content-around">
                                <div className="me-3">
                                    <LabelContainer className="text-dark">First Name</LabelContainer>
                                    <InputContainer>
                                        {NameIcon && <IconContainer className="me-3"><img src={NameIcon} width="36px" className="rounded-circle" height="36px" alt="user-icon" /></IconContainer>}
                                        <ModalInput defaultValue={userInfo?.firstName} disabled={editFirstName ? false : true} {...register("firstName", { required: false, minLength: 2 })} type="text" name="firstName" id="firstName" className="form-control" />
                                        {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                        <div className="ms-2" onClick={() => {
                                            setEditFirstName(wasEditFirstName => !wasEditFirstName);
                                            console.log(editFirstName)
                                        }}>
                                            <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                        </div>
                                    </InputContainer>
                                </div>
                                <div className="ms-3">
                                    <LabelContainer className="text-dark">Last Name</LabelContainer>
                                    <InputContainer>
                                        {NameIcon && <IconContainer className="me-3"><img src={NameIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}
                                        <ModalInput defaultValue={userInfo?.lastName} disabled={editLastName ? false : true} {...register("lastName", { required: false, minLength: 2 })} type="text" name="lastName" id="lastName" className="form-control" />
                                        {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                        <div className="ms-2" onClick={() => {
                                            setEditLastName(wasEditLastName => !wasEditLastName);
                                        }}>
                                            <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                        </div>
                                    </InputContainer>
                                </div>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-dark">Email</LabelContainer>
                                <InputContainer>
                                    {UserIcon && <IconContainer className="me-3"><img src={UserIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}
                                    <ModalInput defaultValue={userInfo?.email} disabled={true} type="text" name="email" id="email" className="form-control" />
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-dark">Password</LabelContainer>
                                <InputContainer>
                                    {UserIcon && <IconContainer className="me-3"><img src={UserIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}
                                    <ModalInput onFocus={(e) => {
                                        e.target.value = "";
                                    }} type="password" defaultValue={userInfo?._id} disabled={editPassword ? false : true} {...register("password", { required: false, minLength: 6 })} name="password" id="password" className="form-control" />
                                    {errors.password && <span className="text-danger m-2 text-center">Password must be min 6 chars!</span>}
                                    <div className="ms-2" onClick={() => {
                                        setEditPassword(wasEditPassword => !wasEditPassword);
                                    }}>
                                        <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                    </div>
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-dark">Phone</LabelContainer>
                                <InputContainer>
                                    {NameIcon && <IconContainer className="me-3"><img src={NameIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}

                                    <ModalInput defaultValue={userInfo?.phone} disabled={editPhone ? false : true} {...register("phone", { required: false, minLength: 2 })} type="text" name="phone" id="phone" className="form-control" />

                                    {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                    <div className="ms-2" onClick={() => {
                                        setEditPhone(wasEditPhone => !wasEditPhone);
                                    }}>
                                        <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                    </div>
                                </InputContainer>
                            </div>
                            <div className="mb-3">
                                <LabelContainer className="text-dark">Address</LabelContainer>
                                <InputContainer>
                                    {NameIcon && <IconContainer className="me-3"><img src={NameIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}
                                    <ModalInput defaultValue={userInfo?.address} disabled={editAddress ? false : true} {...register("address", { required: false, minLength: 2 })} type="text" name="address" id="address" className="form-control" />

                                    {errors.firstName && <span className="text-danger m-2 text-center">Name must be min 2 chars!</span>}
                                    <div className="ms-2" onClick={() => {
                                        setEditAddress(wasEditAddress => !wasEditAddress);
                                    }}>
                                        <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                    </div>
                                </InputContainer>
                            </div>
                            <div className="d-flex justify-content-between">

                                <div className="mb-3 w-100">
                                    <LabelContainer className="text-dark">Avatar Image</LabelContainer>
                                    <InputContainer className="p-4 d-flex justify-content-center flex-wrap w-75">
                                        <input onChange={uploadFile} ref={fileRef} type="file" ng-multiple="allowMultiple" accept="image/*" style={{ display: "none" }} />

                                        <div className="rounded-circle"
                                            style={{
                                                height: "175px",
                                                width: "175px",
                                                border: "1px dashed black", cursor: "pointer"
                                            }}
                                            onClick={() => { fileRef.current.click() }}
                                        >
                                            <div style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex", alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                {userInfo?.avatar_img ?
                                                    <>
                                                        {userInfo.avatar_img.includes("http") ?
                                                            <img className="rounded-circle" style={{ width: "100%", height: "100%" }} src={userInfo.avatar_img} alt={userInfo.firstName} />
                                                            :
                                                            <img className="rounded-circle" style={{ width: "100%", height: "100%" }} src={URL_API + userInfo.avatar_img + "?" + Date.now()} height="150" alt={userInfo.firstName} />

                                                        }
                                                    </>
                                                    :
                                                    <i className="fa fa-upload fa-3x" aria-hidden="true"></i>
                                                }
                                            </div>
                                        </div>
                                        <div className="ms-2">
                                            <i onClick={() => { fileRef.current.click() }} style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-2x"></i>
                                        </div>
                                        <div className="d-flex justifiy-content-between align-items-center w-100">
                                            <div className="d-flex justifiy-content-between align-items-center me-2">
                                                <label style={{ fontSize: "1.2em" }} className="me-1 fw-bold">Set Default</label>
                                                <input onChange={() => {
                                                    setIsCheckbox(wasCheckbox => !wasCheckbox);
                                                }} type="checkbox" />
                                            </div>
                                            <InputContainer className="mt-3">
                                                <ModalInput defaultValue={
                                                    isCheckbox ? "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" :
                                                    userInfo?.avatar_img} {...register("avatar_img", { required: false, minLength: 3 })} disabled={editAvatar ? false : true} type="text" name="avatar_img" id="avatar_img" className="form-control" />
                                                {errors.avatar_img && <span className="text-danger m-2 text-center">Enter valid Image!</span>}
                                                <div className="ms-2" onClick={() => {
                                                    setEditAvatar(wasEditAvatar => !wasEditAvatar);
                                                }}>
                                                    <i style={{ cursor: "pointer" }} className="fas fa-pencil-alt fa-4x"></i>
                                                </div>
                                            </InputContainer>
                                        </div>
                                    </InputContainer>

                                </div>
                                <div className="mb-3">
                                    <LabelContainer className="text-dark">Status</LabelContainer>
                                    <InputContainer className={userInfo?.status === "Active" ? "border border-success" : "border border-danger"}>
                                        {NameIcon && <IconContainer className="me-3"><img src={NameIcon} className="rounded-circle" width="36px" height="36px" alt="user-icon" /></IconContainer>}
                                        <ModalInput defaultValue={userInfo?.status} disabled type="text" name="status" id="status" className="form-control" />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserPanel