import React, {useContext, useEffect, useState} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import Requests from "../api/Requests";
import {prepareHtmlMsgErrorTokenTimeExpired, prepareHtmlRequestMsg} from "../../scripts/Registration";
import useToken from "../hooks/useToken";
import {useNavigate} from "react-router";
import ErrorModal from "../ErrrorModal";
import ActionModal from "../ActionModal";
import {UserContext} from "../context";

const EditProfile = () => {
    const [token, setToken, clearToken] = useToken();
    const navigate = useNavigate()
    const {userSession, getCurUser} = useContext(UserContext);

    const [editData, setEditData] = useState({
        email: "",
        password: "",
        newPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [visibleError, setVisibleError] = useState({
        htmlE: <></>,
        visible: false
    })
    const [visibleAction, setVisibleAction] = useState({
        visible: false,
        btnName: "",
        msgAction: "",
        callbackAction: () => {
        }
    })
    useEffect(() => {
        setEditData({
            email: userSession.email,
            password: "",
            newPassword: "",
            firstName: userSession.firstName,
            lastName: userSession.lastName,
            phone: userSession.phone
        });
        startSterilizationBtnActive("/profile/edit")
    }, [userSession])

    async function editProfile(e) {
        e.preventDefault()
        try {
            debugger
            const data = await Requests.updateCurUser(editData);
            console.log(data)
            setToken(data.token)
            setVisibleError({htmlE: prepareHtmlRequestMsg({message: data.message}), visible: true})
            getCurUser(); // эта фаункция определена в MainWindow, она сделает запрос на back и обнавит userSession
        } catch (err) {
            if (err.response.status === 401) {
                setVisibleAction({
                    visible: true, btnName: "Log In",
                    msgAction: prepareHtmlMsgErrorTokenTimeExpired(), callbackAction: (e) => {
                        e.preventDefault()
                        clearToken()
                        navigate('/login')
                    }
                })
            } else {
                setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
            }
        }

    }

    return (
        <div>
            <ErrorModal visibleError={visibleError} setVisible={setVisibleError}/>
            <ActionModal visibleAction={visibleAction} setVisibleAction={setVisibleAction}/>
            <div className="block-size centerXY-higher d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="para-pmft font-weight-600">Edit profile</p>
                    <div className="form-floating">
                        <input type="email" className="block-size form-control" id="inputEmailEditProfileId"
                               placeholder="name@example.com"
                               value={editData.email}
                               onChange={(e) => setEditData({...editData, email: e.target.value})}/>
                        <label htmlFor="inputEmailEditProfileId">Email address</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password" className="block-size form-control" id="inputPasswordEditProfileId"
                               placeholder="Password"
                               value={editData.password}
                               onChange={(e) => setEditData({...editData, password: e.target.value})}/>
                        <label htmlFor="inputPasswordEditProfileId">Current Password</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password" className="block-size form-control" id="inputNewPasswordEditProfileId"
                               placeholder="Confirm Password"
                               value={editData.newPassword}
                               onChange={(e) => setEditData({...editData, newPassword: e.target.value})}/>
                        <label htmlFor="inputNewPasswordEditProfileId">New Password</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="text" className="block-size form-control" id="inputFirstNameEditProfileId"
                               placeholder="First Name"
                               value={editData.firstName}
                               onChange={(e) => setEditData({...editData, firstName: e.target.value})}/>
                        <label htmlFor="inputFirstNameEditProfileId">First Name</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="text" className="block-size form-control" id="inputLastNameEditProfileId"
                               placeholder="Last Name"
                               value={editData.lastName}
                               onChange={(e) => setEditData({...editData, lastName: e.target.value})}/>
                        <label htmlFor="inputLastNameEditProfileId">Last Name</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="text" className="block-size form-control" id="inputPhoneEditProfileId"
                               placeholder="Phone Number"
                               value={editData.phone}
                               onChange={(e) => setEditData({...editData, phone: e.target.value})}/>
                        <label htmlFor="inputPhoneEditProfileId">Phone Number</label>
                    </div>
                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={editProfile}>Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default EditProfile;