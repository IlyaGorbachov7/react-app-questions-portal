import './compns/styles/Login.css'

import Registration from "./compns/regis_login/Registration";
import Login from "./compns/regis_login/Login";
import ForgetPassword from "./compns/regis_login/ForgetPassword";

function App() {
    return (
        <div>
            {/*<Login/>*/}
            {/*<Registration/>*/}
            <ForgetPassword/>
        </div>
    );
}

export default App;

