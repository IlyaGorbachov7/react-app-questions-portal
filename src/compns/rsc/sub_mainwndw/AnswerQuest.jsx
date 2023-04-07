import React, {useContext, useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {UserContext} from "../context";

const AnswerQuest = () => {
    const {userSession, setUserSession} = useContext(UserContext);
    useEffect(() => {
        startSterilizationBtnActive("/questions/answer")
    }, [])

    return (
        <div>
            Ansower the questin

        </div>
    );
};

export default AnswerQuest;