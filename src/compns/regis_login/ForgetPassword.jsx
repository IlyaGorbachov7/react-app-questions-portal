import React, {useState} from 'react';
import {changePassword, getConfirmationCode} from "../scripts/Login";

const ForgetPassword = () => {
    const [isSendEmail, setIsSendEmail] = useState(true);
    return (<div>
        {(!isSendEmail) ? (<div className="centerXY d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="text-size-bar font-weight-600"><span className="color-text-logo">LOGO</span><span
                        className="color-text-type">TYPE</span></p>
                    <p className="font-weight-600">Reset password</p>
                    <div className="form-floating">
                        {/*дабавить обработчик*/}
                        <input type="email" className="block-size form-control" id="inputEmailForgetPasswordId0"
                               placeholder="name@example.com"/>
                        <label htmlFor="inputEmailForgetPasswordId0">Email address</label>
                    </div>
                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={getConfirmationCode}>Get Confirmation Code
                    </button>
                </div>
            </div>)
            : (  <div className="centerXY d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="text-size-bar font-weight-600"><span className="color-text-logo">LOGO</span><span
                        className="color-text-type">TYPE</span></p>
                    <p className="font-weight-600">Change password</p>
                    <div className="form-floating">
                        {/*дабавить обработчик*/}
                        <input type="email" className="block-size form-control" id="inputEmailForgetPasswordId1"
                               placeholder="name@example.com"/>
                        <label htmlFor="inputEmailForgetPasswordId1">Email address</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="password" className="block-size form-control" id="confirmationCodeForgetPasswordId"
                               placeholder="Confirmation code"/>
                        <label htmlFor="confirmationCodeForgetPasswordId">Confirmation code</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="password" className="block-size form-control" id="newPasswordForgetPasswordId"
                               placeholder="New Password"/>
                        <label htmlFor="newPasswordForgetPasswordId">New password</label>
                    </div>

                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={changePassword}>LOG IN
                    </button>
                </div>
            </div>)

        }
    </div>);
};

export default ForgetPassword;