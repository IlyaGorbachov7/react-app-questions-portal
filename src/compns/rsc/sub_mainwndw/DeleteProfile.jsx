import React, {useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {deleteProfile} from "../../scripts/Login";

const DeleteProfile = () => {
    useEffect(() => {
        startSterilizationBtnActive("/profile/delete")
    }, [])

    return (
        <div className="centerXY-higher d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="para-pmft font-weight-600">Delete profile</p>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputPasswordDeleteProfileId"
                           placeholder="Password"/>
                    <label htmlFor="inputPasswordDeleteProfileId">Password</label>
                </div>

                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={deleteProfile}>Delete
                </button>
            </div>
        </div>
    )
};

export default DeleteProfile;