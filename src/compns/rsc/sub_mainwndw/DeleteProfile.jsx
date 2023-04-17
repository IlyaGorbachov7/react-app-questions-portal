import React, {useEffect, useState} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {useNavigate} from "react-router";
import {prepareHtmlMsgErrorTokenTimeExpired, prepareHtmlRequestMsg} from "../../scripts/Registration";
import Requests from "../api/Requests";
import useToken from "../hooks/useToken";
import ErrorModal from "../ErrrorModal";
import ActionModal from "../ActionModal";

const DeleteProfile = () => {
    const [token, setToken, clearToken] = useToken();

    const navigate = useNavigate()

    const [deleteData, setDeleteData] = useState({
        password: ""
    })
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
        startSterilizationBtnActive("/profile/delete")
    }, [])

    async function deleteProfile(e) {
        e.preventDefault()
        try {
            debugger
            const data = await Requests.delete(deleteData);
            console.log(data)
            setVisibleAction({
                visible: true, btnName: "Next", msgAction: prepareHtmlRequestMsg(data),
                callbackAction: (e) => {
                    e.preventDefault()
                    clearToken()
                    navigate('/register')
                }
            })
            clearToken()
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
            <div className="centerXY-higher d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="para-pmft font-weight-600">Delete profile</p>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="password" className="block-size form-control" id="inputPasswordDeleteProfileId"
                               onChange={(e) => setDeleteData({...deleteData, password: e.target.value})}
                               placeholder="Password"/>
                        <label htmlFor="inputPasswordDeleteProfileId">Password</label>
                    </div>

                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={deleteProfile}>Delete
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteProfile;