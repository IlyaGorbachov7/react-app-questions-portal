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

const AnswerQuest = () => {
    let quests = [
        {
            id: "sldkfj lsdjflk skkjsdlfk jdslk fjs",
            fromUser: "11111sldkfje3ds@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Single line text",
            answerText: " slkfjdslf232323",
            options: null
        },
        {
            id: "sldkfj lsdjgggflk jsdlf",
            fromUser: "22222sldkfjds@7gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Multiline text",
            answerText: " slkfjdslf232323",
            options: null
        },
        {
            id: "sldkfj lsdjfjhjflk jss",
            fromUser: "33333sldkfjds@gma8il.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Date",
            answerText: "2019-01-01",
            options: null
        },
        {
            id: "jsdlfk ghjghjjdslk fjs",
            fromUser: "4444444sldkfsdf@gmail.0com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Radio button",
            answerText: "we",
            options: "we\nsdfsdf\n,sfsfsd\n"
        },
        {
            id: "sldkfj lsdjferytrlkwwe jsdlfk jdslk fjs",
            fromUser: "5555555sklkldkfjds@gmail.co7m",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Combo box",
            answerText: "slf2",
            options: "slkfjd\nslf2\n323n\n23"
        },
        {
            id: "sldkfj lsdjfl3q3233333jdslk fjs",
            fromUser: "666666666sldkfjdssd@gmail7.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: "323n\nslf2",
            options: "slkfjd\nslf2\n323n\n23"
        },
        {
            id: "sldkfj lsdjflk 934557999999 fjs",
            fromUser: "77777777773mail.c4om",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: "",
            options: " slkfjdslf232323"

        }
    ]

    const stoperLoop = useRef('')
    const [visibleAnswerTheQuest, setVisibleAnswerTheQuest] = useState({
        visible: false,
        clickedQuest: {
            fromUser: "",
            question: "",
            answerText: "", // это сам ответ от пользователя
            nameType: "", // это тип вопроса!!
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
    }, [viewLimitCount, /*curPage*/]) // ну вроде как работает, я ропсто хояу оптимизировать, чтобы не делать лишние запросы
    useEffect(() => {
        // срабатывет 1 раз при загрузке после верхнего запроса
        // и запрос делает всегода, => получить порцию вопросов
        loadAnswerQuestions().then(quest => {
            console.log(quest)
            setQuestions(quest)
            setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount)))
        })
    }, [viewLimitCount, curPage])

    async function loadCountAnswerQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов ")
            // const count = await Requests.getTotalCountYourQuest();
            return quests.length
        } catch (e) {
            console.log(e)
        }
    }

    async function loadAnswerQuestions() {
        if (viewLimitCount === -1) {
            console.log("Запрос на получения ВСЕХ вопросов ")
            // return await Requests.getAllYourQuestions();
            return quests.slice(0, quests.length)
        } else {
            console.log("Запрос на получения СТРОАНЦУ вопросов " + curPage + " " + viewLimitCount)
            // return await Requests.getYourQuestionsPage(curPage, viewLimitCount)
            let [st, ed] = rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount))
            return quests.slice(st - 1, ed);
        }

    }

    //------------------------------------------------------------------------------------------------------------------

    async function handlerClickOnTheRowAnswerTheQuest(clickedQuestion) {
        setVisibleAnswerTheQuest({
            visible: true,
            clickedQuest: {
                fromUser: clickedQuestion.fromUser,
                question: clickedQuestion.question,
                answerText: clickedQuestion.answerText, //  это содержимое вопроса
                nameType: clickedQuestion.answerType, // ВНИМАНИЕ ЗДЕСЬ nameType  === ~~ === answerType // это тип вопроса, как визуально отобразить
                options: clickedQuestion.options
            },
            // У нас здесь обработка !!!!!
            callbackAction: (answeredQuest) => {
                // делаем запрос в сервер, что на вопрос мы ответили
                console.log(answeredQuest)
                // Requests.updateQuestion(answeredQuest).then(res => {
                //
                //     // обнаялем список делая запрос в базу данных
                //     loadCountAnswerQuestions().then(count => { // получаем из базы данных вопросы
                //         setTotalCountRecord(count)
                //         loadAnswerQuestions().then(qus => {
                //             setQuestions(qus)
                //             // можем закрывать  это ModelVie, вот таким образом
                //             setVisibleAnswerTheQuest({
                //                 visible: false,
                //                 clickedQuest: null,
                //                 callbackAction: () => {
                //                 }
                //             })
                //         })
                //     })
                // })
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