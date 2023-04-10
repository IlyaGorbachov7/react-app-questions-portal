import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {
    generateHtmlOptions,
    prepareAnswerText,
    splitOptionStringToListOptions
} from "../../../scripts/sub_mainwndw/AnswerQuest";
import {string} from "prop-types";


const AnswerPanelQuestion = ({visibleAnswerTheQuest, setVisibleAnswerTheQuest}) => {
    // Эти значения этих useState - являюется answer-- ответом пользователя!!, они далжны войти в answer !!
    const [textArea, setTextArea] = useState('')

    const [dateTime, setDateTime] = useState(new Date())

    const [radioSelected, setRadioSelected] = useState('')

    const [checkBoxSelected, setCheckBoxSelected] = useState([])

    const [dataRetriever, setDataRetriever] = useState({
        textArea: textArea,
        setTextArea: setTextArea,

        dateTime: dateTime,
        setDateTime: setDateTime,

        options: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.answerText),

        radioSelected: radioSelected,
        setRadioSelected: setRadioSelected,

        checkBoxSelected: checkBoxSelected,
        setDataRetriever: setDataRetriever

    });

    async function submitAnswerOnTheQuestion(e) {
        e.preventDefault()
        let textAnswer = prepareAnswerText(visibleAnswerTheQuest.clickedQuest.nameType, dataRetriever)
        setVisibleAnswerTheQuest({
            ...visibleAnswerTheQuest,
            clickedQuest: {...visibleAnswerTheQuest.clickedQuest, answerText: textAnswer}
        })
        visibleAnswerTheQuest.callbackAction({...visibleAnswerTheQuest.clickedQuest, answerText: textAnswer})
    }

    return (
        <Modal
            show={visibleAnswerTheQuest.visible}
            onHide={() => setVisibleAnswerTheQuest({...visibleAnswerTheQuest, visible: false})}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Add question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>From user</td>
                        <td>
                            <input type="text" className="form-control">
                                {visibleAnswerTheQuest.clickedQuest.fromUser}
                            </input>
                        </td>
                    </tr>
                    <tr>
                        <td>Question</td>
                        <td>
                            <input type="text" className="form-control">
                                {visibleAnswerTheQuest.clickedQuest.question}
                            </input>
                        </td>
                    </tr>

                    <tr>
                        <td>Options</td>
                        <td>
                            {
                                generateHtmlOptions(visibleAnswerTheQuest.clickedQuest.nameType,
                                    dataRetriever, setDataRetriever)
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                    setVisibleAnswerTheQuest({...visibleAnswerTheQuest, visible: false})
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={submitAnswerOnTheQuestion}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AnswerPanelQuestion;