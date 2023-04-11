import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {ANSWER_TYPES} from "../../../scripts/sub_mainwndw/AnswerQuest";


const AddPanelYourQuestion = ({children, visibleAddQuest, setVisibleAddQuest, emails, answerTypes}) => {
    useEffect(() => {
        emails = emails.sort();
        answerTypes = answerTypes.sort((at, at1) => {
            return (at.id < at1.id) ? -1 : (at.id > at1.id) ? 1 : 0
        })
    })
    const [newQuest, setNewQuest] = useState({
        emailForUser: emails.length !== 0 ? emails[0] : "",
        questionText: "",
        nameType: answerTypes.length !== 0 ? answerTypes[0].nameType : "",
        options: ""
    });

    async function saveHandler(e) {
        e.preventDefault()
        visibleAddQuest.callbackAction(newQuest)
    }

    return (
        <Modal
            show={visibleAddQuest.visible}
            onHide={() => setVisibleAddQuest({...visibleAddQuest, visible: false})}
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
                        <td>For user</td>
                        <td><select className="form-select"
                                    onChange={(e) => {
                                        setNewQuest({...newQuest, emailForUser: e.target.value})
                                    }}>
                            {emails.map((email) => {
                                return (
                                    <option key={email} value={email}>
                                        {email}
                                    </option>)
                            })}
                        </select></td>
                    </tr>
                    <tr>
                        <td>Question</td>
                        <td>
                            <input type="text" className="form-control"
                                   value={newQuest.questionText}
                                   onChange={(e) => setNewQuest({...newQuest, questionText: e.target.value})}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Answer type</td>
                        <td><select className="form-select"
                                    onChange={(e) => {
                                        setNewQuest({...newQuest, nameType: e.target.value})
                                    }}>
                            {answerTypes.map((answerType) => {
                                return (
                                    <option key={answerType.id} value={answerType.nameType}>
                                        {answerType.nameType}
                                    </option>)
                            })}
                        </select></td>
                    </tr>
                    {
                        // решаем вопрос будим ли мы отображать options для нового вопроса
                        (newQuest.nameType === ANSWER_TYPES[3] || newQuest.nameType === ANSWER_TYPES[4] || newQuest.nameType === ANSWER_TYPES[5])
                            ?
                            < tr>
                                < td> Options< /td>
                                <td>
                                    <textarea className="form-control" value={newQuest.options}
                                              onChange={(e) => setNewQuest({...newQuest, options: e.target.value})}/>
                                </td>
                            </tr>
                            : <></>
                    }
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={(e) => {
                    setVisibleAddQuest({...visibleAddQuest, visible: false})
                }}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveHandler}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPanelYourQuestion;