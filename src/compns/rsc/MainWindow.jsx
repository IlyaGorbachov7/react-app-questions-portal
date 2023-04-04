import React from 'react';
import {BrowserRouter} from "react-router-dom";
import '../styles/MainWindow.css'
import {
    btnAnswerQuestMainWindowId,
    btnGroupClick,
    btnUserNameMainWindowId,
    btnYourQuestMainWindowId
} from "../scripts/MainWindow";

const MainWindow = () => {
    return (
        <div className="container mt-2">
            <div className="d-flex p-1 block-shadow-color main-bar-border-radius">
                <div className="me-lg-auto font-weight-600 font-bar-size">
                    <span className="color-text-logo">LOGO</span><span className="color-text-type">TYPE</span>
                </div>
                <div className="btn-group" role="group">
                    <button id={btnYourQuestMainWindowId} className="btn me-5 btn-panel-style " type="button"
                            onClick={btnGroupClick}>Your questions
                    </button>
                    <button id={btnAnswerQuestMainWindowId} className="btn ms-5 btn-panel-style" type="button"
                            onClick={btnGroupClick}>Answer the questions
                    </button>
                    <div id="btnGroupMainWindowId" className="btn-group ms-5">
                        <button id={btnUserNameMainWindowId} type="button"
                                className="btn dropdown-toggle btn-panel-style font-weight-600"
                                data-bs-toggle="dropdown" aria-expanded="false">Ilya Gorbachev
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button id="btnEditProfileMainWindowId" className="dropdown-item btn-dropdown"
                                        type="button" onClick={btnGroupClick}>Edit Profile
                                </button>
                            </li>
                            <li>
                                <button id="btnLogOutMainWindowId" className="dropdown-item btn-dropdown"
                                        type="button"
                                        onClick={btnGroupClick}>Log Out
                                </button>
                            </li>
                            <li>
                                <button id="btnDeleteProfileMainWindowId" type="button"
                                        className="dropdown-item btn-dropdown" style={{color: "red"}}
                                        onClick={btnGroupClick}>Delete
                                    Profile
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainWindow;