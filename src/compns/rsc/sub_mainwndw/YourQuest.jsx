import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
    startSterilizationBtnActive
} from "../../scripts/MainWindow";
import {UserContext} from "../context";
import {Button} from "react-bootstrap";
import Pagination from "./sub_questcmp/Pagination";

const YourQuest = () => {

    const {userSession, setUserSession} = useContext(UserContext);
    useEffect(() => {
        startSterilizationBtnActive("/questions/your")
    }, [])
    const [curNumberPage, setCurNumberPage] = useState(1)
    const [totalCount, setTotalCount] = useState(6) // пришло из сервера
    const [viewLimitCount, setViewLimitCount] = useState(1) // хочет видить пользователь

    function onPageChanged(data) {
        const {currentPage, totalPages, pageLimit} = data;
        console.log(data)
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
                <div>
                    <Pagination totalRecords={totalCount} pageLimit={viewLimitCount} pageNeighbours={curNumberPage}
                                onPageChanged={onPageChanged}/>
                </div>
            </div>
        </div>
    );
};

export default YourQuest;