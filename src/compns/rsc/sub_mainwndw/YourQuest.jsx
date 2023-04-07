import React, {useContext, useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {UserContext} from "../context";

const YourQuest = () => {
    const {userSession, setUserSession} = useContext(UserContext);

    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [])

    return (
        <div>
            Your questions HI
        </div>
    );
};

export default YourQuest;