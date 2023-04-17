import React from 'react';
import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {ANSWER_TYPES} from "../../../scripts/sub_mainwndw/AnswerQuest";

const EditPanelQuest = ({visibleUpdateQuest, setVisibleUpdateQuest, emails, answerTypes}) => {
    const [stopLoop, setStopLoop] = useState(0)
    const [editQuest, setEditQuest] = useState({...visibleUpdateQuest.questOnUpdate}); // обязательно удаляем ОТВЕТ на этот проврос, если этот вопрос мы захотели изменить

    useEffect(() => {
        if (visibleUpdateQuest.questOnUpdate.emailForUser === null) {
            setEditQuest({...visibleUpdateQuest.questOnUpdate, emailForUser: (emails.length > 0) ? emails[0] : ""})
        }
        debugger
    }, [stopLoop])

    function handlerBtnUpdateQuest(e) {
        e.preventDefault()
        // Only when user clicked on the edit question, necessary clear at the last answer the question
        console.log("old answerText : " + editQuest.answerText)
        editQuest.answerText = "";
        console.log(editQuest)
        visibleUpdateQuest.callbackAction(editQuest)
    }

    return (
        <Modal
            show={visibleUpdateQuest.visible}
            onHide={() => setVisibleUpdateQuest({...visibleUpdateQuest, visible: false})}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Edit question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table">
                    <tbody>
                    <tr>
                        <td>For user</td>
                        <td><select className="form-select"
                                    onChange={(e) => {
                                        setEditQuest({...editQuest, emailForUser: e.target.value})
                                    }}>
                            {emails.map((email) => {
                                debugger
                                return (
                                    <option key={email} selected={(editQuest.emailForUser == email)} value={email}>
                                        {email}
                                    </option>)
                            })}
                        </select></td>
                    </tr>
                    <tr>
                        <td>Question</td>
                        <td>
                            <input type="text" className="form-control"
                                   value={editQuest.questionText}
                                   onChange={(e) => setEditQuest({...editQuest, questionText: e.target.value})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Answer type</td>
                        <td><select className="form-select" onChange={(e) => {
                            setEditQuest({...editQuest, answerType: e.target.value})
                        }}>
                            {answerTypes.map((answerType) => {
                                return (
                                    <option key={answerType.id} selected={editQuest.answerType == answerType.nameType}
                                            value={answerType.nameType}>
                                        {answerType.nameType}
                                    </option>)
                            })}
                        </select></td>
                    </tr>
                    {
                        // решаем вопрос будим ли мы отображать options для нового вопроса
                        (editQuest.answerType === ANSWER_TYPES[3] || editQuest.answerType === ANSWER_TYPES[4] || editQuest.answerType === ANSWER_TYPES[5])
                            ?
                            < tr>
                                < td> Options< /td>
                                <td>
                                    <textarea className="form-control" value={editQuest.options}
                                              onChange={(e) => setEditQuest({...editQuest, options: e.target.value})}/>
                                </td>
                            </tr>
                            : <></>
                    }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                    setVisibleUpdateQuest({...visibleUpdateQuest, visible: false})
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlerBtnUpdateQuest}>Submit</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditPanelQuest;