import React, {useEffect, useRef, useState} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {Button} from "react-bootstrap";
import {rangeViewHtml} from "../../scripts/sub_mainwndw/YourQuest";
import TablePaginationDemo from "./sub_questcmp/TableParinationDemo";
import RowQuestions from "./sub_questcmp/RowQuestions";
import Requests from "../api/Requests";
import AddPanelYourQuestion from "./sub_questcmp/AddPanelYourQuestion";
import EditPanelQuest from "./sub_questcmp/EditPanelQuest";

const YourQuest = () => {
    const stoperLoop = useRef('')
    const [visibleAddQuest, setVisibleAddQuest] = useState({
        visible: false,
        callbackAction: (newQuest) => {
        }
    })
    const [visibleUpdateQuest, setVisibleUpdateQuest] = useState({
        visible: false,
        questOnUpdate: {},
        callbackAction: (updatedQuest) => {
        }

    })
    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [stoperLoop])

    let quests = [
        {
            id: "sldkfj lsdjflk skkjsdlfk jdslk fjs",
            forUser: "11111sldkfje3ds@gmail.com",
            question: "Чемы бы ты хотел заниматся ?",
            answerType: "Single line text",
            answerText: " slkfjdslf232323",
            options: null
        },
        {
            id: "sldkfj lsdjgggflk jsdlf",
            forUser: "22222sldkfjds@7gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Combo box",
            answerText: "fff",
            options: "hfp\nxtnhst\nxnj\nfff"
        },
        {
            id: "sldkfj lsdjfjhjflk jss",
            forUser: "33333sldkfjds@gma8il.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323",
            options: "slkfjdslf232323\nYOur\nNo"
        },
        {
            id: "jsdlfk ghjghjjdslk fjs",
            forUser: "4444444sldkfsdf@gmail.0com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Single line text",
            answerText: " slkfjdslf232323",
            options: null

        },
        {
            id: "sldkfj lsdjferytrlkwwe jsdlfk jdslk fjs",
            forUser: "5555555sklkldkfjds@gmail.co7m",
            question: "Your border ?",
            answerType: "Date",
            answerText: "2023-08-01",
            options: null,
        },
        {
            id: "sldkfj lsdjfl3q3233333jdslk fjs",
            forUser: "666666666sldkfjdssd@gmail7.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323",
            options: "332\n242\n999",
        },
        {
            id: "sldkfj lsdjflk 934557999999 fjs",
            forUser: "77777777773mail.c4om",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: " Multiline text",
            answerText: "Что бы блять \n тваришь что же давай друг!!!",
            options: null,
        },
        {
            id: "eyug8980fvd",
            forUser: "8888888888234ldkfjds@gmail.c0om",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Date",
            answerText: "",
            options: null,
        },
        {
            id: "876865ff907089vdc",
            forUser: "99999999999924455dkfjds@gvmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Radio button",
            answerText: "",
            options: " 1\n2\n3",
        }
    ]

    const [questions, setQuestions] = useState([])
    const [emails, setEmails] = useState([])
    const [answerTypes, setAnswerTypes] = useState([])

    const [curPage, setCurPage] = useState(0)
    const [totalCountRecord, setTotalCountRecord] = useState(0) // пришло из сервера
    const [viewLimitCount, setViewLimitCount] = useState(5) // хочет видить пользователь
    const [printRange, setPrintRange] = useState([])

    //---------------------------------------------------- LOADING FROM SERVICE ----------------------------------------
    useEffect(() => {
        // запрос в 1 раз и каждый раз как изменится viewListCount
        loadCountYourQuestions().then(totalCount => {
            setTotalCountRecord(totalCount)
        })
    }, [viewLimitCount, /*curPage*/]) // ну вроде как работает, я ропсто хояу оптимизировать, чтобы не делать лишние запросы
    useEffect(() => {
        // срабатывет 1 раз при загрузке после верхнего запроса
        // и запрос делает всегода, => получить порцию вопросов
        loadYourQuestion().then(quest => {
            console.log(quest)
            setQuestions(quest)
            setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount)))
        })
    }, [viewLimitCount, curPage])
    useEffect(() => {
        loadAllEmailsUsers()
            .then(r => {
                setEmails(r)
            })
        loadAnswerTypes()
            .then(r => {
                setAnswerTypes(r)
            })
    }, [stoperLoop])

    async function loadCountYourQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов ")
            // const count = await Requests.getTotalCountYourQuest();
            return quests.length
        } catch (e) {
            console.log(e)
        }
    }

    async function loadYourQuestion() {
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

    async function loadAllEmailsUsers() {
        try {
            let data = await Requests.receiveEmails();
            console.log("Получения всех имеющихся emails")
            console.log(data)
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async function loadAnswerTypes() {
        try {
            let data = await Requests.receiveAllAnswerTypes();
            console.log("Получения answer types ")
            console.log(data)
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    //------------------------------------------------------------------------------------------------------------------

    async function deleteQuestion(id) {
        // await Requests.deleteQuestion(id)
        console.log("Question this id: " + id + " is deleted")
        // это унжно сделать обязаельно ИМЕННО ОБРАТСЯ СНОВО К серверу за вопросами, так как, он вернет
        // мне вопросы а в визуалке некоторые вопросы (из других невидимых старничак) подтянутся ко мне,
        // при чем мы не опирируем всем массивом данных мы работает с частями вопросов!!!!

        // await getCountYourQuestions() // полностю обнавляем и количество и списко вопросов из базы данных

        // имитируем удаление
        quests = quests.filter(q => q.id !== id)
        setTotalCountRecord(quests.length)
    }

    async function updateQuestion(quest) {
        console.log("Запусаем оно для обнавленя для вопроса" + "и там проводим разнового рода операции")
        setVisibleUpdateQuest({
            visible: true,
            questOnUpdate: {
                id: quest.id,
                forUser: quest.forUser,
                question: quest.question,
                answerText: quest.answerText,
                nameType: quest.answerType, // обрати внимаение, что зесь поля отличаются
                options: quest.options
            },
            callbackAction: (updatedQuest) => {
                // request on the update quest
            }
        })
    }

    function addYourQuestion() {
        setVisibleAddQuest({
            visible: true,
            callbackAction: (newQuest) => {
                // request on the save file
                console.log(newQuest)
            }
        })
    }

    return (
        <>
            { // This is  very important condition, because I want that this component reset your statement and
                // again initialize your hooks. I rise that useState setting default value inside AddPanelYourQuestion!!
                (visibleAddQuest.visible === true) ? <AddPanelYourQuestion visibleAddQuest={visibleAddQuest}
                                                                           setVisibleAddQuest={setVisibleAddQuest}
                                                                           emails={emails} answerTypes={answerTypes}/>
                    : <></>
            }

            {
                (visibleUpdateQuest.visible === true) ? <EditPanelQuest visibleUpdateQuest={visibleUpdateQuest}
                                                                        setVisibleUpdateQuest={setVisibleUpdateQuest}
                                                                        emails={emails} answerTypes={answerTypes}/>
                    : <></>
            }
            <div className="container-fluid mt-4 p-3 block-shadow-color block-border-radius"
                 style={{minWidth: "720px"}}>
                <div className="d-flex flex-row p-2">
                    <h5 className="align-items-center mt-1">Your questions</h5>
                    <div className="ms-auto">
                        <Button onClick={addYourQuestion}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                            Add question</Button>
                    </div>
                </div>

                <table className="table table-hover table-bordered table-striped block-border-radius">
                    <thead>
                    <tr>
                        <th scope="col" style={{width: "35%"}} className="col-md-2">For user</th>
                        <th scope="col" style={{width: "40%"}}>Question</th>
                        <th scope="col" style={{width: "10%"}}>Answer type</th>
                        <th scope="col" style={{width: "30%"}}>Answer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map(q => {
                        return (
                            <RowQuestions key={q.id} q={q}
                                          deleteCallback={deleteQuestion}
                                          updateCallback={updateQuestion}/>
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

export default YourQuest;