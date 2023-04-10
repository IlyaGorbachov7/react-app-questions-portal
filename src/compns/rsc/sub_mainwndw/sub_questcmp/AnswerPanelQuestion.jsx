import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import DatePicker from "react-date-picker";
import {
    ANSWER_TYPES,
    prepareAnswerText,
    splitOptionStringToListOptions
} from "../../../scripts/sub_mainwndw/AnswerQuest";


const AnswerPanelQuestion = ({visibleAnswerTheQuest, setVisibleAnswerTheQuest}) => {
        const looperStop = useRef('')
        const [nameAnswerType, setNameAnswerType] = useState('')
        useEffect(() => {
            debugger
            console.log("dddccdfsfsdfsdfdsfdsp dsf dsf sdfds111111111111111111")
            setNameAnswerType(visibleAnswerTheQuest.clickedQuest.nameType)
        }, [looperStop])
        const [dataRetriever, setDataRetriever] = useState({
            answerText: "",
            options: [],
        })
        useEffect(() => {
                debugger
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

        const [checked, setChecked] = useState(true);
        const generateHtmlOptions = () => {
            debugger
            if (ANSWER_TYPES[0] === nameAnswerType) { // Single line text
                return (<input type={"text"} value={dataRetriever.answerText}
                               onChange={(e) => {
                                   setDataRetriever({...dataRetriever, answerText: e.target.value})
                               }}></input>)
            } else if (ANSWER_TYPES[1] === nameAnswerType) { //Multiline text
                return (<textarea className="form-control" value={dataRetriever.answerText}
                                  onChange={(e) => setDataRetriever({...dataRetriever, answerText: e.target.value})}>
                </textarea>)
            } else if (ANSWER_TYPES[2] === nameAnswerType) { // Date
                return (<DatePicker value={dataRetriever.answerText} onChange={(e) => {
                    debugger
                    console.log(e)
                    setDataRetriever({...dataRetriever, dateTime: e.toString()})
                }}/>)
            } else if (ANSWER_TYPES[3] === nameAnswerType) { // Radio button
                return (<div className="btn-group-vertical" role="group">
                    {dataRetriever.options
                        .map((txOption, index) => {
                            debugger
                            return (
                                // <div key={index}>
                                //     <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                                //     <span>{checked ? 'галочка есть' : 'галочки нет'}</span>
                                // </div>
                                <div key={index}>
                                    <br/>
                                    <label><input type="radio" key={index} name="radio"
                                                  value={txOption}
                                                  checked={(dataRetriever.answerText == txOption)}
                                                  onChange={(e) => {
                                                      setDataRetriever({...dataRetriever, answerText: e.target.value})
                                                  }}></input>
                                        {txOption}</label>
                                </div>
                            )
                        })}
                    ;
                </div>)
            } else if (ANSWER_TYPES[4] === nameAnswerType) { // Combo box
                return <></> // сделать !
            } else if (ANSWER_TYPES[5] === nameAnswerType) { // Check box
                return (<div className="form-check">
                    {
                        dataRetriever.options.map((txOption, index) => {
                            return (<div key={index}>
                                <input className="form-check-input" name={"listCheckBox"} type="checkbox"
                                       value={txOption}
                                       checked={dataRetriever.answerText.find((e)=>e == txOption) != undefined}
                                       id="flexCheckDefault"
                                       onChange={(e) => {
                                           debugger
                                           console.log(e)
                                           const checkBox = e.target;
                                           if (checkBox.checked == true) {
                                               const prev = dataRetriever.answerText;
                                               setDataRetriever({
                                                   ...dataRetriever,
                                                   answerText: [...prev, checkBox.value]
                                               })
                                           } else {
                                               let arr = dataRetriever.answerText.filter((ck) => {
                                                   return ck != checkBox.value
                                               });
                                               setDataRetriever({...dataRetriever, answerText: arr})
                                           }
                                       }}/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    {txOption}
                                </label>
                            </div>)
                        })
                    }
                </div>)
            }
        }

        async function submitAnswerOnTheQuestion(e) {
            e.preventDefault()
            console.log(dataRetriever)
            // let textAnswer = prepareAnswerText(visibleAnswerTheQuest.clickedQuest.nameType, dataRetriever)
            // setVisibleAnswerTheQuest({
            //     ...visibleAnswerTheQuest,
            //     clickedQuest: {...visibleAnswerTheQuest.clickedQuest, answerText: textAnswer}
            // })
            // visibleAnswerTheQuest.callbackAction({...visibleAnswerTheQuest.clickedQuest, answerText: textAnswer})
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
                        </tbody>
                    </table>
                    <div>
                        <div>Answer</div>
                        {
                            generateHtmlOptions(visibleAnswerTheQuest.clickedQuest.nameType,
                                dataRetriever, setDataRetriever)
                        }
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