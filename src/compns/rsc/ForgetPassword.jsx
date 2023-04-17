import React, {useState} from 'react';
import ErrorModal from "./ErrrorModal";
import Requests from "./api/Requests";
import {prepareHtmlRequestMsg} from "../scripts/Registration";
import ActionModal from "./ActionModal";
import {useNavigate} from "react-router";

const ForgetPassword = () => {
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
    const [resetData, setResetData] = useState({
        email: ""
    })

    async function resetPassword(e) {
        e.preventDefault();
        try {
            const data = await Requests.resetPassword(resetData);
            console.log(data)
            setVisibleAction({
                visible: true,
                btnName: "Next",
                msgAction: prepareHtmlRequestMsg(data),
                callbackAction: (e) => {
                    e.preventDefault()
                    setVisibleAction({
                        visible: false
                    })
                    navigate('/change-password')
                }
            })
        } catch (err) {
            setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
        }
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
                    <p className="para-pmft font-weight-600">Reset password</p>
                    <div className="form-floating">
                        <input type="email" className="block-size form-control" id="inputEmailForgetPasswordId0"
                               placeholder="name@example.com"
                               onChange={(e) => setResetData({...resetData, email: e.target.value})}/>
                        <label htmlFor="inputEmailForgetPasswordId0">Email address</label>
                    </div>
                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={resetPassword}>Get Confirmation Code
                    </button>
                </div>
            </div>
        </div>);
};

export default ForgetPassword;