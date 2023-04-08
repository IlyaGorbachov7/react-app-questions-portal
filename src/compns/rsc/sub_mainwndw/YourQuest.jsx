import React, {useEffect, useState} from 'react';
import {startSterilizationBtnActive} from "../../scripts/MainWindow";
import {Button} from "react-bootstrap";
import {rangeViewHtml} from "../../scripts/sub_mainwndw/YourQuest";
import TablePaginationDemo from "./sub_questcmp/TableParinationDemo";
import RowQuestions from "./sub_questcmp/RowQuestions";
import Requests from "../api/Requests";

const YourQuest = () => {
    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [])

    let quests = [
        {
            id: "sldkfj lsdjflk skkjsdlfk jdslk fjs",
            forUser: "11111sldkfje3ds@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj lsdjgggflk jsdlf",
            forUser: "22222sldkfjds@7gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj lsdjfjhjflk jss",
            forUser: "33333sldkfjds@gma8il.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "jsdlfk ghjghjjdslk fjs",
            forUser: "4444444sldkfsdf@gmail.0com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj lsdjferytrlkwwe jsdlfk jdslk fjs",
            forUser: "5555555sklkldkfjds@gmail.co7m",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj lsdjfl3q3233333jdslk fjs",
            forUser: "666666666sldkfjdssd@gmail7.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj lsdjflk 934557999999 fjs",
            forUser: "77777777773mail.c4om",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "eyug8980fvd",
            forUser: "8888888888234ldkfjds@gmail.c0om",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "876865ff907089vdc",
            forUser: "99999999999924455dkfjds@gvmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "jlkhgerpt4323666434",
            forUser: "1001000043534654sldkfjdsc@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "t5dfsfgc66677777rgds",
            forUser: "s4m,423 42 4fjds@zgmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "ertopjtrvkrej999fe",
            forUser: "34325s@gmail.cohm",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "fdsf60000",
            forUser: "4254fjds@gmail.jcom",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            forUser: "9999sldkfjds@gmnail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj ljsdlfk jdslk fjs",
            forUser: "66666sldkfjds@gm ail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "3eeeeeeeeeeee",
            forUser: "56564sldkfjds@sgmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "fd9 fjewwwwwwwwqqqqqqqqqqs",
            forUser: "3s75r587ldkfj,ds@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "lkkjg  wfwe   ",
            forUser: "sldkfjds@gmaisl.com",
            question: "Wlkjfsdlfkjdddddddddddddddddd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "sldkfj wfwefwefweferyhvdsdjflk 000000",
            forUser: "4234sldkfjds@gmeail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "dddvcvdvrfrt",
            forUser: "werefsldkfjds@gmaheil.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "grgf f rcgf",
            forUser: "sldkfjds@gmail.dfcom",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "kkkdhgfhhr",
            forUser: "dsfdsfsldkfjdsdfs@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "0000ercg erger cg 32rdc",
            forUser: "sldkfjds@gmlail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "lkd jht hgfgl;   ",
            forUser: "23423434sldkfjyods@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "dfldfkgjsl fghsgg rgkf    q223",
            forUser: "sRRRRldyuikfjds@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
        {
            id: "11111111 fghbgfhscf vg11111",
            forUser: "sl@@@@dkfjdyps@gmail.com",
            question: "Wlkjfsdlfkjsflk kjfd?",
            answerType: "Check box",
            answerText: " slkfjdslf232323"
        },
    ]
    const [questions, setQuestions] = useState([])

    const [curPage, setCurPage] = useState(0)
    const [totalCountRecord, setTotalCountRecord] = useState(0) // пришло из сервера
    const [viewLimitCount, setViewLimitCount] = useState(5) // хочет видить пользователь
    const [printRange, setPrintRange] = useState([])

    useEffect(() => {
        // запрос в 1 раз и каждый раз как изменится viewListCount
        getCountYourQuestions().then(totalCount => {
            setTotalCountRecord(totalCount)
        })
    }, [viewLimitCount, /*curPage*/]) // ну вроде как работает, я ропсто хояу оптимизировать, чтобы не делать лишние запросы

    async function getCountYourQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов ")
            // const count = await Requests.getTotalCountYourQuest();
            return quests.length
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        // срабатывет 1 раз при загрузке после верхнего запроса
        // и запрос делает всегода, => получить порцию вопросов
        loadYourQuestion().then(quest => {
            console.log(quest)
            setQuestions(quest)
            setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCountRecord / viewLimitCount)))
        })
    }, [totalCountRecord, viewLimitCount, curPage])

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
        // await Requests.deleteQuestion(id)
        console.log("Запусаем оно для обнавленя для вопроса"  + "и там проводим разнового рода операции")
        console.log(quest)
    }

    return (
        <div className="container-fluid mt-4 p-3 block-shadow-color block-border-radius">
            <div className="d-flex flex-row p-2">
                <h5 className="align-items-center mt-1">Your questions</h5>
                <div className="ms-auto">
                    <Button>
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
                    <th scope="col" style={{width: "350px"}} className="col-md-2">For user</th>
                    <th scope="col" style={{width: "400px"}}>Question</th>
                    <th scope="col" style={{width: "100px"}}>Answer type</th>
                    <th scope="col" style={{width: "300px"}}>Answer</th>
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
                        (viewLimitCount !== -1) ? <span>{printRange[0]} - {printRange[1]} of {totalCountRecord}</span>
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
    );
};

export default YourQuest;