import React from 'react';
import {login} from "../scripts/Login";
import '../styles/Registration.css'
import '../styles/Login.css'

const Registration = () => {

    return (
        <div className="block-size centerXY d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="text-size-bar font-weight-600"><span className="color-text-logo">LOGO</span><span
                    className="color-text-type">TYPE</span></p>
                <p className="font-weight-600">Sign Up</p>
                <div className="form-floating">
                    {/*дабавить обработчик*/}
                    <input type="email" className="block-size form-control" id="inputEmailId"
                           placeholder="name@example.com"/>
                    <label htmlFor="inputEmailId">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="passwordId0" placeholder="Password"/>
                    <label htmlFor="passwordId0">Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="passwordId1"
                           placeholder="Confirm Password"/>
                    <label htmlFor="passwordId1">Confirm Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="firstNameId" placeholder="First Name"/>
                    <label htmlFor="firstNameId">First Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="lastNameId" placeholder="Last Name"/>
                    <label htmlFor="lastNameId">Last Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="phoneNumberId" placeholder="Phone Number"/>
                    <label htmlFor="lastNameId">Phone Number</label>
                </div>
                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={login}>SIGN UP
                </button>
                <p className="mt-2">Already have account account? <a href="/login"
                                                           className="color-text-type font-weight-600">Log in</a></p>
            </div>
        </div>
    );
};

export default Registration;