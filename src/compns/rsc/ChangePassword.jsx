import React, {useState} from 'react';
import {useNavigate} from "react-router";
import Requests from "./api/Requests";
import {prepareHtmlRequestMsg} from "../scripts/Registration";
import ErrorModal from "./ErrrorModal";
import ActionModal from "./ActionModal";

const ChangePassword = () => {
    const navigate = useNavigate();
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
    const [changeData, setChangeData] = useState({
        email: "",
        newPassword: "",
        code: ""
    })

    async function changePassword(e) {
        e.preventDefault();
        try {
            const data = await Requests.changePassword(changeData);
            console.log(data)
            setVisibleAction({
                visible: true,
                btnName: "Log In",
                msgAction: prepareHtmlRequestMsg(data),
                callbackAction: (e) => {
                    e.preventDefault()
                    navigate('/login')
                }
            })
        } catch (err) {
            setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
        }

        // после отпрвяемся на станичу логинации сново
    }

    return (
        <div>
            <ErrorModal visibleError={visibleError} setVisible={setVisibleError}/>
            <ActionModal visibleAction={visibleAction} setVisibleAction={setVisibleAction}/>
            <div className="centerXY d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="para-pmft text-size-bar font-weight-600"><span
                        className="color-text-logo">LOGO</span><span
                        className="color-text-type">TYPE</span></p>
                    <p className="para-pmft font-weight-600">Change password</p>
                    <div className="form-floating">
                        <input type="email" className="block-size form-control" id="inputEmailForgetPasswordId1"
                               placeholder="name@example.com"
                               onChange={(e) => setChangeData({...changeData, email: e.target.value})}/>
                        <label htmlFor="inputEmailForgetPasswordId1">Email address</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password" className="block-size form-control"
                               id="confirmationCodeForgetPasswordId"
                               placeholder="Confirmation code"
                               autoComplete='off'
                               onChange={(e) => setChangeData({...changeData, code: e.target.value})}/>
                        <label htmlFor="confirmationCodeForgetPasswordId">Confirmation code</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input type="password" className="block-size form-control"
                               id="newPasswordForgetPasswordId"
                               placeholder="New Password"
                               autoComplete='off'
                               onChange={(e) => setChangeData({...changeData, newPassword: e.target.value})}/>
                        <label htmlFor="newPasswordForgetPasswordId">New password</label>
                    </div>

                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={changePassword}>LOG IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;