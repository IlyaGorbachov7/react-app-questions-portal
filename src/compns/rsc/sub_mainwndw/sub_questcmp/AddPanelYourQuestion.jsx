import React, {useEffect, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-date-picker";


const AddPanelYourQuestion = ({children, visibleAddQuest, setVisibleAddQuest, emails, answerTypes}) => {
    useEffect(() => {
        emails = emails.sort();
        answerTypes = answerTypes.sort((at, at1) => {
            return (at.id < at1.id) ? -1 : (at.id > at1.id) ? 1 : 0
        })
    })
    const [newQuest, setNewQuest] = useState({
        forUser: emails.length !== 0 ? emails[0] : "",
        question: "",
        nameType: answerTypes.length !== 0 ? answerTypes[0].nameType : "",
        options: []
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
                                        setNewQuest({...newQuest, forUser: e.target.value})
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
                            <input type="email" className="form-control"
                                   placeholder="Input your question text"
                                   value={newQuest.question}
                                   onChange={(e) => setNewQuest({...newQuest, question: e.target.value})}/>
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
                    <tr>
                        <td>Options</td>
                        <td>

                        </td>
                    </tr>
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