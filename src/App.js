import './compns/styles/Login.css'

import Registration from "./compns/rsc/Registration";
import Login from "./compns/rsc/Login";
import ForgetPassword from "./compns/rsc/ForgetPassword";
import MainWindow from "./compns/rsc/MainWindow";
import {BrowserRouter} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";
import ErrorPage from "./compns/rsc/Error";
import ChangePassword from "./compns/rsc/ChangePassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/register' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/forget-password' element={<ForgetPassword/>}/>
                <Route path='/change-password' element={<ChangePassword/>}/>
                <Route path='/main-window/*' element={<MainWindow/>}/>
                <Route path='/error-page' element={<ErrorPage/>}/>
                <Route path='*' element={<Navigate to='/error-page'/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

