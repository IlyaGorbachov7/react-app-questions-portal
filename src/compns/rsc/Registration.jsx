import React from 'react';
import {login, registrat} from "../scripts/Login";
import '../styles/Registration.css'
import '../styles/Login.css'

const Registration = () => {

    return (
        <div className="block-size centerXY d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="para-pmft text-size-bar font-weight-600"><span className="color-text-logo">LOGO</span><span
                    className="color-text-type">TYPE</span></p>
                <p className="para-pmft font-weight-600">Sign Up</p>
                <div className="form-floating">
                    {/*дабавить обработчик*/}
                    <input type="email" className="block-size form-control" id="inputEmailRegistrationId"
                           placeholder="name@example.com"/>
                    <label htmlFor="inputEmailRegistrationId">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputPasswordRegistrationId0" placeholder="Password"/>
                    <label htmlFor="inputPasswordRegistrationId0">Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputPasswordRegistrationId1"
                           placeholder="Confirm Password"/>
                    <label htmlFor="inputPasswordRegistrationId1">Confirm Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputFirstNameRegistrationId" placeholder="First Name"/>
                    <label htmlFor="inputFirstNameRegistrationId">First Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputLastNameRegistrationId" placeholder="Last Name"/>
                    <label htmlFor="inputLastNameRegistrationId">Last Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputPhoneRegistrationId" placeholder="Phone Number"/>
                    <label htmlFor="inputPhoneRegistrationId">Phone Number</label>
                </div>
                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={registrat}>SIGN UP
                </button>
                <p className="para-pmft mt-2">Already have account account? <a href="/login"
                                                           className="color-text-type font-weight-600">Log in</a></p>
            </div>
        </div>
    );
};

export default Registration;