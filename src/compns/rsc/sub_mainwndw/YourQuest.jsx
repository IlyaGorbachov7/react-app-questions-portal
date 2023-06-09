import React, {useContext, useEffect, useRef, useState} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {Button} from "react-bootstrap";
import {rangeViewHtml} from "../../scripts/sub_mainwndw/YourQuest";
import TablePaginationDemo from "./sub_questcmp/TableParinationDemo";
import RowQuestions from "./sub_questcmp/RowQuestions";
import Requests from "../api/Requests";
import AddPanelYourQuestion from "./sub_questcmp/AddPanelYourQuestion";
import EditPanelQuest from "./sub_questcmp/EditPanelQuest";
import {UserContext} from "../context";
import ErrorModal from "../ErrrorModal";
import {useSelector} from "react-redux";
import {ANSWER_TYPES} from "../../scripts/sub_mainwndw/AnswerQuest";
import {prepareHtmlMsgErrorTokenTimeExpired, prepareHtmlRequestMsg} from "../../scripts/Registration";
import ActionModal from "../ActionModal";
import useToken from "../hooks/useToken";
import {useNavigate} from "react-router";

const YourQuest = () => {
    const trig = useSelector(state => state.updateQuestReducer)
    const trigUpdateListEmails = useSelector(state => state.updateUserEmailReducer)
    const [token, setToken, clearToken] = useToken();
    const navigate = useNavigate()


    const {
        userSession,
        triggerOnAddUpdate, setTriggerOnAddUpdate,
        sendQueryToUpdateStatementsQuestionsUser,
        subscribeOnUser,
        unSubscribeOnUser,
        sendQueryToSubscribeMe,
        sendQueryToUnsubscribeMe
    } = useContext(UserContext)

    const stoperLoop = useRef(0)
    // trigger чтобы  автоматически сработали нужные useEffect-ы
    // const [triggerOnAddUpdate, setTriggerOnAddUpdate] = useState(true)
    const [visibleError, setVisibleError] = useState({
        htmlE: <></>,
        visible: false
    })
    const [visibleAction, setVisibleAction] = useState({
        visible: false,
        btnName: "",
        msgAction: "",
        callbackAction: () => {
        }
    })
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
            debugger
            setTotalCountRecord(totalCount)
        })
    }, [viewLimitCount, triggerOnAddUpdate, trig])
    useEffect(() => {
        // срабатывет 1 раз при загрузке после верхнего запроса
        // и запрос делает всегода, => получить порцию вопросов
        loadYourQuestion().then(quest => {
            console.log(quest)

            setQuestions(quest)
        })
    }, [viewLimitCount, curPage, triggerOnAddUpdate, trig])
    useEffect(() => {
        loadAllEmailsUsers()
            .then(r => {
                setEmails(r)
            })
    }, [stoperLoop, trigUpdateListEmails])

    useEffect(() => {
        loadAnswerTypes()
            .then(r => {
                setAnswerTypes(r)
            })
    }, [stoperLoop])

    useEffect(() => {
        setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount)))
    }, [totalCountRecord, curPage, viewLimitCount])

    async function loadCountYourQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов:")
            const count = await Requests.getTotalCountYourQuest();
            return count
        } catch (e) {
            console.log(e)
        }
    }

    async function loadYourQuestion() {
        if (viewLimitCount === -1) {
            console.log("Запрос на получения ВСЕХ вопросов ")
            return await Requests.getAllYourQuestions();
        } else {
            console.log("Запрос на получения СТРОАНЦУ вопросов " + curPage + " " + viewLimitCount)
            return await Requests.getYourQuestionsPage(curPage, viewLimitCount)
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

    function addYourQuestion() {
        setVisibleAddQuest({
            visible: true,
            callbackAction: (newQuest) => {
                if ((newQuest.answerType === ANSWER_TYPES[3] ||
                    newQuest.answerType === ANSWER_TYPES[4] ||
                    newQuest.answerType === ANSWER_TYPES[5]) && newQuest.options.trim().length === 0) {
                    setVisibleError({
                        visible: true,
                        htmlE: prepareHtmlRequestMsg({
                            options: "Fields don't should be blank"
                        })
                    })
                } else if (newQuest.emailForUser === "" && newQuest.answerType === "") {
                    setVisibleError({
                        visible: true,
                        htmlE: <>Pleas, choose answer type and user email</>
                    })
                } else {
                    debugger
                    console.log(newQuest)
                    Requests.getCountQuestFromToForUser(newQuest.emailForUser).then(count => {
                        if (count === 0) {
                            subscribeOnUser(newQuest.emailForUser)
                            sendQueryToSubscribeMe(newQuest.emailFromUser, newQuest.emailForUser)
                        }
                        Requests.createQuestion(newQuest)
                            .then(r => {
                                debugger
                                sendQueryToUpdateStatementsQuestionsUser(newQuest.emailForUser)
                                setTriggerOnAddUpdate((triggerOnAddUpdate) ? false : true)
                                setVisibleAddQuest({
                                    visible: false
                                })

                            }).catch((err) => {
                            if (err.response.status === 401) {
                                setVisibleAction({
                                    visible: true, btnName: "Log In",
                                    msgAction: prepareHtmlMsgErrorTokenTimeExpired(), callbackAction: (e) => {
                                        e.preventDefault()
                                        clearToken()
                                        navigate('/login')
                                    }
                                })
                            } else {
                                setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
                            }
                        })
                    }).catch((err) => {
                        if (err.response.status === 401) {
                            setVisibleAction({
                                visible: true, btnName: "Log In",
                                msgAction: prepareHtmlMsgErrorTokenTimeExpired(), callbackAction: (e) => {
                                    e.preventDefault()
                                    clearToken()
                                    navigate('/login')
                                }
                            })
                        } else {
                            setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
                        }
                    })
                }
            }

        })
    }

    function updateQuestion(quest) {
        setVisibleUpdateQuest({
            visible: true,
            questOnUpdate: {
                id: quest.id,
                emailFromUser: quest.emailFromUser,
                emailForUser: quest.emailForUser,
                questionText: quest.questionText,
                answerText: quest.answerText,
                answerType: quest.answerType,
                options: quest.options
            },
            callbackAction: (updatedQuest) => {
                if ((updatedQuest.answerType === ANSWER_TYPES[3] ||
                    updatedQuest.answerType === ANSWER_TYPES[4] ||
                    updatedQuest.answerType === ANSWER_TYPES[5]) && updatedQuest.options.trim().length === 0) {
                    setVisibleError({
                        visible: true,
                        htmlE: prepareHtmlRequestMsg({
                            options: "Fields don't should be blank"
                        })
                    })
                } else if (updatedQuest.emailForUser === "" && updatedQuest.answerType === "") {
                    setVisibleError({
                        visible: true,
                        htmlE: <>Pleas, choose answer type and user email</>
                    })
                } else {
                    Requests.updateQuestion(updatedQuest).then(r => {
                        sendQueryToUpdateStatementsQuestionsUser(updatedQuest.emailForUser)
                        if (quest.emailForUser !== updatedQuest.emailForUser) { // in case if user change forUser, then needed notify old user to update your list queston
                            sendQueryToUpdateStatementsQuestionsUser(quest.emailForUser)
                            Requests.getCountQuestFromToForUser(updatedQuest.emailForUser).then(count => {
                                if (count === 0) {
                                    debugger
                                    subscribeOnUser(updatedQuest.emailForUser)
                                    sendQueryToSubscribeMe(updatedQuest.emailFromUser, updatedQuest.emailForUser)
                                }
                            })
                        }
                        setTriggerOnAddUpdate((triggerOnAddUpdate) ? false : true)
                        setVisibleUpdateQuest({
                            visible: false
                        })
                    }).catch((err) => {
                        if (err.response.status === 401) {
                            setVisibleAction({
                                visible: true, btnName: "Log In",
                                msgAction: prepareHtmlMsgErrorTokenTimeExpired(), callbackAction: (e) => {
                                    e.preventDefault()
                                    clearToken()
                                    navigate('/login')
                                }
                            })
                        } else {
                            setVisibleError({htmlE: prepareHtmlRequestMsg(err.response.data), visible: true})
                        }
                    })
                }
            }
        })
    }

    function deleteQuestion(id, emailForUser, emailFromUser) {
        console.log("Question this id: " + id + " is deleted")
        Requests.deleteQuestion(id).then(r => {
            setTriggerOnAddUpdate((triggerOnAddUpdate) ? false : true)
            sendQueryToUpdateStatementsQuestionsUser(emailForUser)
            debugger
            Requests.getCountQuestFromToForUser(emailForUser).then(count => {
                debugger
                if (count === 0) {
                    unSubscribeOnUser(emailForUser)
                    sendQueryToUnsubscribeMe(emailFromUser, emailForUser)
                }
            })
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
            <ErrorModal visibleError={visibleError} setVisible={setVisibleError}/>
            <ActionModal visibleAction={visibleAction} setVisibleAction={setVisibleAction}/>
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