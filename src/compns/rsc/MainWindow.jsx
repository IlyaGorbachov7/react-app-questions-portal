import React from 'react';
import '../styles/MainWindow.css'
import {
    btnAnswerQuestMainWindowId,
    btnGroupClick,
    btnUserNameMainWindowId,
    btnYourQuestMainWindowId
} from "../scripts/MainWindow";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import YourQuest from "./sub_mainwndw/YourQuest";
import AnswerQuest from "./sub_mainwndw/AnswerQuest";
import DeleteProfile from "./sub_mainwndw/DeleteProfile";
import EditProfile from "./sub_mainwndw/EditProfile";
import useToken from "./hooks/useToken";
import ErrorPage from "./Error";

const MainWindow = () => {
    const [token, setToken, clearToken] = useToken();
    const navigate = useNavigate()

    return (
        <>
            {
                (token !== null)
                    ?
                    <>
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
                                                data-bs-toggle="dropdown" aria-expanded="false">Ilya Gorbachev
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
                        </div>
                        <Routes children='/main-window'>
                            <Route path='/questions/your' element={<YourQuest/>}/>
                            <Route path='/questions/answer' element={<AnswerQuest/>}/>
                            <Route path='/profile/delete' element={<DeleteProfile/>}/>
                            <Route path='/profile/edit' element={<EditProfile/>}/>
                            <Route path="*" element={<Navigate to={'/error-page'}/>}/>
                        </Routes>
                    </>
                    :
                    <Routes children='/main-window'>
                        <Route path="*" element={<Navigate to={'/login'}/>}/>
                    </Routes>
            }
        </>
    );
};

export default MainWindow;