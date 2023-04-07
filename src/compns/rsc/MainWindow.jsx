import React, {useEffect, useMemo, useState} from 'react';
import '../styles/MainWindow.css'
import {btnAnswerQuestMainWindowId, btnUserNameMainWindowId, btnYourQuestMainWindowId} from "../scripts/MainWindow";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import YourQuest from "./sub_mainwndw/YourQuest";
import AnswerQuest from "./sub_mainwndw/AnswerQuest";
import DeleteProfile from "./sub_mainwndw/DeleteProfile";
import EditProfile from "./sub_mainwndw/EditProfile";
import useToken from "./hooks/useToken";
import Requests from "./api/Requests";
import {UserContext} from "./context";

const MainWindow = () => {
    const [token, setToken, clearToken] = useToken();
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: ""
    })
    const userName = useMemo(() => {
        let username = (userData.firstName + ' ' + userData.lastName).trim();
        if (username !== '') {
            return username;
        }
        return userData.email;
    })

    useEffect(() => {
     getCurUser()
    }, [])

    function getCurUser() {
        async function getCurUser() {
            return await Requests.curUser();
        }

        getCurUser().then(r => {
            console.log(r)
            setUserData(r)
            setIsLoaded(true)
        });
    }

    return (
        <UserContext.Provider value={{
            userSession: userData,
            setUserSession: setUserData,
            isLoaded,
            getCurUser
        }}>
            {
                (token !== null) ? ( // важно указать здесь, так как Router будет делать редирек на Login, а в Login на MainWindow,
                    // получится непрырываня цепочка, так как данные еще не загружены
                    (isLoaded)
                        ?
                        <div className="container mt-2">
                            <div className="d-flex p-1 block-shadow-color main-bar-border-radius">
                                <div className="me-lg-auto font-weight-600 font-bar-size">
                                    <span className="color-text-logo">LOGO</span><span
                                    className="color-text-type">TYPE</span>
                                </div>
                                <div className="btn-group" role="group">
                                    <button id={btnYourQuestMainWindowId} className="btn me-5 btn-panel-style "
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate('/main-window/questions/your', {})
                                            }}>Your questions
                                    </button>
                                    <button id={btnAnswerQuestMainWindowId} className="btn ms-5 btn-panel-style"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate('/main-window/questions/answer')
                                            }}>Answer the questions
                                    </button>
                                    <div id="btnGroupMainWindowId" className="btn-group ms-5">
                                        <button id={btnUserNameMainWindowId} type="button"
                                                className="btn dropdown-toggle btn-panel-style font-weight-600"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            {userName}
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button id="btnEditProfileMainWindowId"
                                                        className="dropdown-item btn-dropdown"
                                                        type="button" onClick={() => {
                                                    navigate('/main-window/profile/edit')
                                                }}>Edit Profile
                                                </button>
                                            </li>
                                            <li>
                                                <button id="btnLogOutMainWindowId"
                                                        className="dropdown-item btn-dropdown"
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            clearToken()
                                                            navigate("/")
                                                        }}>Log Out
                                                </button>
                                            </li>
                                            <li>
                                                <button id="btnDeleteProfileMainWindowId" type="button"
                                                        className="dropdown-item btn-dropdown" style={{color: "red"}}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            navigate('/main-window/profile/delete')
                                                        }}>Delete
                                                    Profile
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Routes children='/main-window'>
                                <Route path='/questions/your' element={<YourQuest/>}/>
                                <Route path='/questions/answer' element={<AnswerQuest/>}/>
                                <Route path='/profile/delete' element={<DeleteProfile/>}/>
                                <Route path='/profile/edit' element={<EditProfile/>}/>
                                <Route path="*" element={<Navigate to={'/error-page'}/>}/>
                            </Routes>
                        </div>
                        :
                        <></>) : (<Routes children='/main-window'>
                    <Route path="*" element={<Navigate to={'/login'}/>}/>
                </Routes>)

            }
        </UserContext.Provider>
    );
};

export default MainWindow;