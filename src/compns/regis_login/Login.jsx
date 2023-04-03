import React from 'react';
import '../styles/Login.css'
import {login} from "../scripts/Login";

/*https://stackoverflow.com/questions/69294536/where-to-store-jwt-token-in-react-client-side-in-secure-way

* https://medium.com/@sannanmalikofficial/how-to-secure-jwt-token-in-react-2dbc23a514a6
* */
const Login = () => {
    return (
        <div className="centerXY d-flex flex-column align-items-center">
            <div className="block-shadow-color block-border-radius p-2">
                <p className="text-size-bar font-weight-600"><span className="color-text-logo">LOGO</span><span
                    className="color-text-type">TYPE</span></p>
                <p className="font-weight-600">Log in</p>
                <div className="form-floating">
                    {/*дабавить обработчик*/}
                    <input type="email" className="block-size form-control" id="floatingInput"
                           placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mt-2">
                    {/*дабавить обработчик*/}
                    <input type="password" className="block-size form-control" id="floatingPassword"
                           placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="row block-size mt-2">
                    <div className="col text-start">
                        {/*дабавить обработчик*/}
                        <label><input type="checkbox" id="remember"/> Remember me</label>
                    </div>
                    <div className="col color-text-type text-end font-weight-600">
                        <a href="/forget-password">Forget your password?</a>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                        onClick={login}>LOG IN
                </button>
                <p className="mt-2">Don't have account? <a href="/registration"
                                                           className="color-text-type font-weight-600">Sing Up</a></p>
            </div>
        </div>
    );
};

export default Login;