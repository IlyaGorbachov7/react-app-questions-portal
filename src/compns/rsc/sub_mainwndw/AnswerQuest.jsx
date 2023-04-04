import React, {useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";

const AnswerQuest = () => {
    useEffect(() => {
        startSterilizationBtnActive("/questions/answer")
    }, [])

    return (
        <div>

        </div>
    );
};

export default AnswerQuest;