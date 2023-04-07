import './compns/styles/Login.css'

import Registration from "./compns/rsc/Registration";
import Login from "./compns/rsc/Login";
import ForgetPassword from "./compns/rsc/ForgetPassword";
import MainWindow from "./compns/rsc/MainWindow";
import DeleteProfile from "./compns/rsc/sub_mainwndw/DeleteProfile";
import YourQuest from "./compns/rsc/sub_mainwndw/YourQuest";
import AnswerQuest from "./compns/rsc/sub_mainwndw/AnswerQuest";
import EditProfile from "./compns/rsc/sub_mainwndw/EditProfile";
import ErrorModal from "./compns/rsc/ErrrorModal";
import {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import ErrorPage from "./compns/rsc/Error";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/forget' element={<ForgetPassword/>}/>
                <Route path='/main-window/*' element={<MainWindow/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

