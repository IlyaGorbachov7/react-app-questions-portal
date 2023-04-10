import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {
    ANSWER_TYPES, generateHtmlOptions,
    prepareAnswerText,
    splitOptionStringToListOptions
} from "../../../scripts/sub_mainwndw/AnswerQuest";


const AnswerPanelQuestion = ({visibleAnswerTheQuest, setVisibleAnswerTheQuest}) => {
        const looperStop = useRef('')
        const [nameAnswerType, setNameAnswerType] = useState('')
        useEffect(() => {
            console.log("dddccdfsfsdfsdfdsfdsp dsf dsf sdfds111111111111111111")
            setNameAnswerType(visibleAnswerTheQuest.clickedQuest.nameType)
        }, [looperStop])
        const [dataRetriever, setDataRetriever] = useState({
            answerText: "",
            options: [],
        })
        useEffect(() => {
                let answerType = visibleAnswerTheQuest.clickedQuest.nameType;
                if (ANSWER_TYPES[0] === answerType) { // Single line text
                    setDataRetriever({...dataRetriever, answerText: visibleAnswerTheQuest.clickedQuest.answerText})
                } else if (ANSWER_TYPES[1] === answerType) { //Multiline text
                    setDataRetriever({...dataRetriever, answerText: visibleAnswerTheQuest.clickedQuest.answerText})
                } else if (ANSWER_TYPES[2] === answerType) { // Date
                    setDataRetriever({...dataRetriever, answerText: visibleAnswerTheQuest.clickedQuest.answerText})
                } else if (ANSWER_TYPES[3] === answerType) { // Radio button
                    setDataRetriever({
                        answerText: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.answerText),
                        options: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.options)
                    })
                } else if (ANSWER_TYPES[4] === answerType) { // Combo box
                    setDataRetriever({
                        answerText: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.answerText),
                        options: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.options)
                    })
                } else if (ANSWER_TYPES[5] === answerType) { // Check box
                    setDataRetriever({
                        answerText: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.answerText),
                        options: splitOptionStringToListOptions(visibleAnswerTheQuest.clickedQuest.options)
                    })
                }
            }
            ,
            [looperStop]
        )

        async function submitAnswerOnTheQuestion(e) {
            e.preventDefault()
            console.log(dataRetriever)

            let textAnswer = prepareAnswerText(visibleAnswerTheQuest.clickedQuest.nameType, dataRetriever)
            let question = {...visibleAnswerTheQuest.clickedQuest, answerText: textAnswer};
            visibleAnswerTheQuest.callbackAction(question) // invoke callback
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
                                <div>
                                    {visibleAnswerTheQuest.clickedQuest.fromUser}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Question</td>
                            <td>
                                <div>
                                    {visibleAnswerTheQuest.clickedQuest.question}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Answer</td>
                            <td> {
                                generateHtmlOptions(visibleAnswerTheQuest.clickedQuest.nameType,
                                    dataRetriever, setDataRetriever)
                            }</td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                    </div>
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
    }
;

export default AnswerPanelQuestion;