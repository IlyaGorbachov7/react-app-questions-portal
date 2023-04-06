import React, {useState} from 'react';
import '../styles/Registration.css'
import '../styles/Login.css'
import ErrorModal from "./ErrrorModal";
import Requests from "./api/Requests";

const Registration = () => {
    const [regisData, setRegisData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        phone: ""
    });
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");

    async function register(e) {
        e.preventDefault();
        if (regisData.password !== regisData.confirmPassword) {
            setError("Confirm password don't matches your password.")
            setVisible(true)
            return;
        }
        try{
            const response = await Requests.registration(regisData)
            console.log(response)
        }catch (err){
            // console.log(err)
        }

        // request on the server on the registration
        // if good : navigate on the Login page /login
        // else
        // handler exception from server
        // view error if present
    }

    return (
        <div>
            <ErrorModal visible={visible} setVisible={setVisible}>
                {error}
            </ErrorModal>
            <div className="block-size centerXY d-flex flex-column align-items-center">
                <div className="block-shadow-color block-border-radius p-2">
                    <p className="para-pmft text-size-bar font-weight-600"><span
                        className="color-text-logo">LOGO</span><span
                        className="color-text-type">TYPE</span></p>
                    <p className="para-pmft font-weight-600">Sign Up</p>
                    <div className="form-floating">
                        {/*дабавить обработчик*/}
                        <input type="email" className="block-size form-control" id="inputEmailRegistrationId"
                               placeholder="name@example.com"
                               value={regisData.email}
                               onChange={e => setRegisData({...regisData, email: e.target.value})}/>
                        <label htmlFor="inputEmailRegistrationId">Email address</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="password" className="block-size form-control" id="inputPasswordRegistrationId0"
                               placeholder="Password"
                               value={regisData.password}
                               onChange={e => setRegisData({...regisData, password: e.target.value})}/>
                        <label htmlFor="inputPasswordRegistrationId0">Password</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="password" className="block-size form-control" id="inputPasswordRegistrationId1"
                               placeholder="Confirm Password"
                               value={regisData.confirmPassword}
                               onChange={e => setRegisData({...regisData, confirmPassword: e.target.value})}/>

                        <label htmlFor="inputPasswordRegistrationId1">Confirm Password</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="text" className="block-size form-control" id="inputFirstNameRegistrationId"
                               placeholder="First Name"
                               value={regisData.firstName}
                               onChange={e => setRegisData({...regisData, firstName: e.target.value})}/>
                        <label htmlFor="inputFirstNameRegistrationId">First Name</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="text" className="block-size form-control" id="inputLastNameRegistrationId"
                               placeholder="Last Name"
                               value={regisData.lastName}
                               onChange={e => setRegisData({...regisData, lastName: e.target.value})}/>
                        <label htmlFor="inputLastNameRegistrationId">Last Name</label>
                    </div>
                    <div className="form-floating mt-2">
                        {/*дабавить обработчик*/}
                        <input type="text" className="block-size form-control" id="inputPhoneRegistrationId"
                               placeholder="Phone Number"
                               value={regisData.phone}
                               onChange={e => setRegisData({...regisData, phone: e.target.value})}/>
                        <label htmlFor="inputPhoneRegistrationId">Phone Number</label>
                    </div>
                    <button className="btn btn-primary btn-lg block-size mt-lg-2" type="button"
                            onClick={register}>SIGN UP
                    </button>
                    <p className="para-pmft mt-2">Already have account account? <a href="/login"
                                                                                   className="color-text-type font-weight-600">Log
                        in</a></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;