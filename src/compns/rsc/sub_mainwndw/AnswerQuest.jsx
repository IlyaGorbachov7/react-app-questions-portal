import React, {useContext, useEffect} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {UserContext} from "../context";
import {useRef, useState} from "react";
import {rangeViewHtml} from "../../scripts/sub_mainwndw/YourQuest";
import Requests from "../api/Requests";
import AddPanelYourQuestion from "./sub_questcmp/AddPanelYourQuestion";
import {Button} from "react-bootstrap";
import RowQuestions from "./sub_questcmp/RowQuestions";
import TablePaginationDemo from "./sub_questcmp/TableParinationDemo";
import RowAnswerQuest from "./sub_questcmp/RowAnswerQuest";
import AnswerPanelQuestion from "./sub_questcmp/AnswerPanelQuestion";
import ErrorModal from "../ErrrorModal";

const AnswerQuest = () => {
    const {userSession} = useContext(UserContext)
    const [triggerOnAnswer, setTriggerOnAnswer] = useState(false)
    const [visibleError, setVisibleError] = useState({
        htmlE: <></>,
        visible: false
    })
    const [visibleAnswerTheQuest, setVisibleAnswerTheQuest] = useState({
        visible: false,
        clickedQuest: {
            id: "",
            emailFromUser: "",
            emailForUser: userSession.email,
            questionText: "",
            answerText: "", // это сам ответ от пользователя
            answerType: "", // это тип вопроса!!
            options: ""
        },
        callbackAction: (answeredQuest) => {
        }
    })
    useEffect(() => {
        startSterilizationBtnActive("/questions/answer")
    }, [])

    const [questions, setQuestions] = useState([])
    const [curPage, setCurPage] = useState(0)
    const [totalCountRecord, setTotalCountRecord] = useState(0) // пришло из сервера
    const [viewLimitCount, setViewLimitCount] = useState(5) // хочет видить пользователь
    const [printRange, setPrintRange] = useState([])


    //---------------------------------------------------- LOADING FROM SERVICE ----------------------------------------
    useEffect(() => {
        // запрос в 1 раз и каждый раз как изменится viewListCount
        loadCountAnswerQuestions().then(totalCount => {
            setTotalCountRecord(totalCount)
        })
    }, [viewLimitCount, triggerOnAnswer])
    useEffect(() => {
        // срабатывет 1 раз при загрузке после верхнего запроса
        // и запрос делает всегода, => получить порцию вопросов
        loadAnswerQuestions().then(quest => {
            console.log(quest)
            setQuestions(quest)
        })
    }, [viewLimitCount, curPage, triggerOnAnswer])
    useEffect(()=>{
        setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount)))
    },[totalCountRecord, curPage,viewLimitCount])

    async function loadCountAnswerQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов ")
            const count = await Requests.getTotalCountAnswerQuest();
            return count;
        } catch (e) {
            console.log(e)
        }
    }

    async function loadAnswerQuestions() {
        if (viewLimitCount === -1) {
            console.log("Запрос на получения ВСЕХ вопросов ")
            return await Requests.getAllAnswerQuestions();
        } else {
            console.log("Запрос на получения СТРОАНЦУ вопросов " + curPage + " " + viewLimitCount)
            return await Requests.getAnswerQuestionsPage(curPage, viewLimitCount)
        }
    }

    //------------------------------------------------------------------------------------------------------------------

    function handlerClickOnTheRowAnswerTheQuest(clickedQuestion) {
        setVisibleAnswerTheQuest({
            visible: true,
            clickedQuest: {
                id: clickedQuestion.id,
                emailFromUser: clickedQuestion.emailFromUser,
                emailForUser: clickedQuestion.emailForUser,
                questionText: clickedQuestion.questionText,
                answerText: clickedQuestion.answerText, //  это содержимое вопроса
                answerType: clickedQuestion.answerType,
                options: clickedQuestion.options
            },
            // У нас здесь обработка !!!!!
            callbackAction: (answeredQuest) => {
                // делаем запрос в сервер, что на вопрос мы ответили
                if(answeredQuest.answerText !== "") {
                    console.log(answeredQuest)
                    debugger
                    Requests.answerTheQuestion(answeredQuest).then(r => {

                        setTriggerOnAnswer((triggerOnAnswer) ? false : true)
                        setVisibleAnswerTheQuest({
                            visible: false
                        })
                    })
                }else{
                    setVisibleError({
                        visible: true,
                        htmlE: <>Please, give the question</>
                    })
                }
            }
        })
    }

    return (
        <>
            { // This is  very important condition, because I want that this component reset your statement and
                // again initialize your hooks. I rise that useState setting default value inside AddPanelYourQuestion!!
                (visibleAnswerTheQuest.visible === true) ?
                    <AnswerPanelQuestion visibleAnswerTheQuest={visibleAnswerTheQuest}
                                         setVisibleAnswerTheQuest={setVisibleAnswerTheQuest}/>
                    : <></>
            }
            <ErrorModal visibleError={visibleError} setVisible={setVisibleError}/>
            <div className="container-fluid mt-4 p-3 block-shadow-color block-border-radius"
                 style={{minWidth: "720px"}}>
                <div className="d-flex flex-row p-2">
                    <h5 className="align-items-center mt-1">Answer the questions</h5>
                </div>

                <table className="table table-hover table-bordered table-striped block-border-radius">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: "35%"}} className="col-md-2">From user</th>
                        <th scope="col" style={{width: "40%"}}>Question</th>
                        <th scope="col" style={{width: "30%"}}>Answer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map(q => {
                        return (
                            <RowAnswerQuest key={q.id} q={q}
                                            giveAnswerCallback={handlerClickOnTheRowAnswerTheQuest}/>
                        )
                    })}
                    </tbody>
                </table>

                <div className="d-flex flex-row p-2 justify-content-center">
                    <div className="me-auto mt-2 align-items-center">
                        {
                            (viewLimitCount !== -1) ?
                                <span>{printRange[0]} - {printRange[1]} of {totalCountRecord}</span>
                                : <span/>
                        }
                    </div>
                    <div className="align-items-center">
                        <TablePaginationDemo page={curPage} setPage={setCurPage} rowsPerPage={viewLimitCount}
                                             setRowsPerPage={setViewLimitCount} totalRecords={totalCountRecord}/>
                    </div>
                    <dir className="ms-auto align-items-center mt-sm-1">
                        <select className="form-select-sm form-select" defaultValue="5" onChange={(e) => {
                            setViewLimitCount(parseInt(e.target.value))
                            setCurPage(0)
                        }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="15">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="250">250</option>
                            <option value="-1">ALL</option>
                        </select>
                    </dir>
                </div>
            </div>
        </>
    );
};

export default AnswerQuest;