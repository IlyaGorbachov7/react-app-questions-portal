import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
    startSterilizationBtnActive
} from "../../scripts/MainWindow";
import {Button} from "react-bootstrap";
import {rangeViewHtml} from "../../scripts/sub_mainwndw/YourQuest";
import {PaginationController} from "./sub_questcmp/PaginationController";
import TablePaginationDemo from "./sub_questcmp/TableParinationDemo";

const YourQuest = () => {

    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [])
    const [questions, setQuestions] = useState([])
    const [curPage, setCurPage] = useState(0)
    const [totalCountRecord, setTotalCountRecord] = useState(0) // пришло из сервера
    const [viewLimitCount, setViewLimitCount] = useState(5) // хочет видить пользователь
    const [printRange, setPrintRange] = useState([])

    useEffect(() => {
        getCountYourQuestions().then(totalCount => {
            setTotalCountRecord(totalCount)
            setPrintRange(rangeViewHtml(viewLimitCount, totalCountRecord, curPage, Math.ceil(totalCount / viewLimitCount)))
        })
    }, [viewLimitCount, curPage, totalCountRecord])

    useEffect(() => {
        loadYourQuestion().then(quest => {
            setQuestions(quest)
        })
    }, [totalCountRecord, viewLimitCount, curPage])

    async function getCountYourQuestions() {
        try {
            console.log("Запрос на КОЛИЧЕСТВО вопросов ")
            // const count = await Requests.getTotalCountYourQuest();
            return 1243
        } catch (e) {
            console.log(e)
        }
    }

    async function loadYourQuestion() {
        if (viewLimitCount === -1) {
            console.log("Запрос на получения ВСЕХ вопросов ")
            // return await Requests.getAllYourQuestions();
        } else {
            console.log("Запрос на получения СТРОАНЦУ вопросов " + curPage + " " + viewLimitCount)
            // return await Requests.getYourQuestionsPage(curPage, viewLimitCount)
        }

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

            <table className="table table-hover table-striped">
                <thead>
                <tr>
                    <th scope="col">For user</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer type</th>
                    <th scope="col">Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row">some.some@some.com</td>
                    <td>What your doing this?</td>
                    <td>Check box</td>
                    <td>Very soon</td>
                </tr>
                <tr>
                    <td scope="row">some.some@some.com</td>
                    <td>What your doing this?</td>
                    <td>Check box</td>
                    <td>Very soon</td>
                </tr>
                <tr>
                    <td scope="row">some.some@some.com</td>
                    <td>What your doing this?</td>
                    <td>Check box</td>
                    <td>Very soon</td>
                </tr>
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