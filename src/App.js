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

function App() {
    return (
        <div>
            {/*<Login/>*/}
            {/*<ErrorModal visible={modal} setVisible={setModal}/>*/}
            <Registration/>
            {/*<ForgetPassword/>*/}
            {/*<MainWindow/>*/}
            {/*<DeleteProfile/>*/}
            {/*<Registration/>*/}
            {/*<YourQuest/>*/}
            {/*<AnswerQuest/>*/}
            {/*<EditProfile/>*/}
        </div>
    );
}

export default App;

