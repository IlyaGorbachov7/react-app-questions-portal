import React, {useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {changePassword, editProfile, registrat} from "../../scripts/Login";

const EditProfile = () => {
    useEffect(() => {
        startSterilizationBtnActive("/profile/edit")
    }, [])

    return (

        <div className="block-size centerXY-higher d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="para-pmft font-weight-600">Edit profile</p>
                <div className="form-floating">
                    {/*дабавить обработчик*/}
                    <input type="email" className="block-size form-control" id="inputEmailEditProfileId"
                           placeholder="name@example.com"/>
                    <label htmlFor="inputEmailEditProfileId">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputPasswordEditProfileId"
                           placeholder="Password"/>
                    <label htmlFor="inputPasswordEditProfileId">Current Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputNewPasswordEditProfileId"
                           placeholder="Confirm Password"/>
                    <label htmlFor="inputNewPasswordEditProfileId">New Password</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputFirstNameEditProfileId"
                           placeholder="First Name"/>
                    <label htmlFor="inputFirstNameEditProfileId">First Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputLastNameEditProfileId"
                           placeholder="Last Name"/>
                    <label htmlFor="inputLastNameEditProfileId">Last Name</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="text" className="block-size form-control" id="inputPhoneEditProfileId"
                           placeholder="Phone Number"/>
                    <label htmlFor="inputPhoneEditProfileId">Phone Number</label>
                </div>
                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={editProfile}>Save
                </button>
            </div>
        </div>
    );
};
export default EditProfile;