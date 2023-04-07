import React, {useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";

const YourQuest = () => {
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