import React, {useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";

const AnswerQuest = () => {
    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [])

    return (
        <div>

        </div>
    );
};

export default AnswerQuest;