import React, {useEffect, useState} from 'react';
import '../styles/Login.css'
import ErrorModal from "./ErrrorModal";
import ax from './api/RemoteServier'
import Requests from "./api/Requests";
import {prepareHtmlRequestMsg} from "../scripts/Registration";
import {useNavigate} from "react-router";
import useToken from "./hooks/useToken";
import {Link} from "react-router-dom";

/*https://stackoverflow.com/questions/69294536/where-to-store-jwt-token-in-react-client-side-in-secure-way

* https://medium.com/@sannanmalikofficial/how-to-secure-jwt-token-in-react-2dbc23a514a6
* */
const Login = () => {
    const [token, setToken] = useToken();
    const navigate = useNavigate();
    const [visibleError, setVisibleError] = useState({
        htmlE: <></>,
        visible: false
    })
    const [loginData, setLoginData] = useState({
        email: "", password: "", rememberMe: false
    });

    async function login(e) {
        e.preventDefault()
        try {
            const data = await Requests.login({email: loginData.email, password: loginData.password});
            setToken(data.token)
            console.log(data.token)
            console.log("Login is successfully!")
            navigate("/main-window/questions/your")
        } catch (err) {
            setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
        }
    }

    useEffect(function () {
    }, [])

    return (<div>
        <ErrorModal visibleError={visibleError} setVisible={setVisibleError}/>

        <div className="centerXY d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="para-pmft text-size-bar font-weight-600"><span
                    className="color-text-logo">LOGO</span><span
                    className="color-text-type">TYPE</span></p>
                <p className="para-pmft font-weight-600">Log in</p>
                <div className="form-floating">
                    {/*дабавить обработчик*/}
                    <input type="email" className="block-size form-control" id="inputEmailLoginId"
                           placeholder="name@example.com"
                           onChange={(e) => setLoginData({...loginData, email: e.target.value})}/>
                    <label htmlFor="inputEmailLoginId">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="inputPasswordLoginId"
                           placeholder="Password"
                           onChange={e => setLoginData({...loginData, password: e.target.value})}/>
                    <label htmlFor="inputPasswordLoginId">Password</label>
                </div>

                <div className="row block-size mt-2">
                    <div className="col text-start">
                        {/*дабавить обработчик*/}
                        <label><input type="checkbox" id="rememberMeId"
                                      checked={loginData.rememberMe}
                                      onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                        /> Remember me</label>
                    </div>
                    <div className="col color-text-type text-end font-weight-600">
                        <Link to="/forget">Forget your password?</Link>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={login}>LOG IN
                </button>
                <p className="para-pmft mt-2">Don't have account? <Link to="/register"
                                                                        className="color-text-type font-weight-600">Sing Up</Link></p>
            </div>
        </div>
    </div>);
};

export default Login;