import React, {useEffect, useMemo, useRef, useState} from 'react';
import '../styles/MainWindow.css'
import {btnAnswerQuestMainWindowId, btnUserNameMainWindowId, btnYourQuestMainWindowId} from "../scripts/MainWindow";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import YourQuest from "./sub_mainwndw/YourQuest";
import AnswerQuest from "./sub_mainwndw/AnswerQuest";
import DeleteProfile from "./sub_mainwndw/DeleteProfile";
import EditProfile from "./sub_mainwndw/EditProfile";
import useToken from "./hooks/useToken";
import Requests from "./api/Requests";
import {UserContext} from "./context";
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client'
import {prepareHtmlMsgErrorTokenTimeExpired} from "../scripts/Registration";
import ActionModal from "./ActionModal";
import {WS_CROSS_ORIGIN} from "./api/RemoteServier";
import {useDispatch, useSelector} from "react-redux";
import {private_excludeVariablesFromRoot} from "@mui/material";


const MainWindow = () => {
    const [token, setToken, clearToken] = useToken();
    const navigate = useNavigate()

    const [connect, setConnect] = useState(false);
    let stompClient = React.useRef(null);

    const [visibleAction, setVisibleAction] = useState({
        visible: false, btnName: "", msgAction: "", callbackAction: () => {
        }
    })
    const [isLoaded, setIsLoaded] = useState(false)
    const [userData, setUserData] = useState({
        email: "", firstName: "", lastName: "", phone: ""
    })

    const [triggerOnAddUpdate, setTriggerOnAddUpdate] = useState(false)
    const [triggerOnAnswer, setTriggerOnAnswer] = useState(false)
    const dispatch = useDispatch()

    const userName = useMemo(() => {
        let username = (userData.firstName + ' ' + userData.lastName).trim();
        if (username !== '') {
            return username;
        }
        return userData.email;
    }, [userData])

    useEffect(() => {
        getCurUser()
    }, [])
    let userEmail = null;

    function getCurUser() {
        async function getCurUser() {
            return await Requests.curUser();
        }

        getCurUser().then(r => {
            console.log(r)
            userEmail = r.email;
            setUserData(r)
            setIsLoaded(true)
            if (connect === true) {
                return;
            }
            connection();

        }).catch((err) => {
            if (err.response.status === 401) { // если токин есть, но время истекло, тогда просим, чтобы он занова перезашел
                setVisibleAction({
                    visible: true,
                    btnName: "Log In",
                    msgAction: prepareHtmlMsgErrorTokenTimeExpired(),
                    callbackAction: (e) => {
                        e.preventDefault()
                        clearToken()
                        navigate('/login')
                    }
                })
            }
        });
    }

    function sendQueryToUpdateStatementsQuestionsUser(email) {
        stompClient.current.send("/quest-portal/private/questions/crud", {}, JSON.stringify({email: email}))
    }

    /**
     * Отправляем ему сообщение на подлкючение
     */
    function sendQueryToSubscribeMe(emailFrom, emailFor) {
        debugger
        stompClient.current.send('/quest-portal/private/user/subscribe-me', {}, JSON.stringify({
            fromEmail: emailFrom,
            forEmail: emailFor
        }));
    }

    function sendQueryToUnsubscribeMe(emailFrom, emailFor) {
        debugger
        stompClient.current.send('/quest-portal/private/user/unsubscribe-me', {}, JSON.stringify({
            fromEmail: emailFrom,
            forEmail: emailFor
        }))
    }

    function sendQueryToUpdateStatementUser(email) {
        stompClient.current.send("/quest-portal/public/users/crud", {}, JSON.stringify({email: email}))
    }

    const messageSubscriberOnUser = useRef(new Map())

    function subscribeOnUser(emailFor) {
        debugger
        messageSubscriberOnUser.current.set(emailFor, stompClient.current.subscribe("/private/user/" + emailFor, onSubscribeAction));
    }

    const messageSubscriberOnFromUser = useRef(new Map())

    function subscribeOnFromUser(emailFrom) {
        debugger
        messageSubscriberOnFromUser.current.set(emailFrom, stompClient.current.subscribe('/private/user/' + emailFrom + '', onAnswerQuestion))
    }


    function onAnswerQuestion(payload) {
        debugger
        let emailObj = JSON.parse(payload.body);

        if (emailObj.prevEmail !== emailObj.newEmail) {
            if (messageSubscriberOnFromUser.current.has(emailObj.prevEmail)) {
                unSubscribeAnswerOnUser(emailObj.prevEmail)
                subscribeOnFromUser(emailObj.newEmail)
            }
        }
        dispatch({type: "UPDATE_QUEST"})
    }

    function unSubscribeAnswerOnUser(emailFrom) {
        debugger
        if (messageSubscriberOnFromUser.current.has(emailFrom)) {
            messageSubscriberOnFromUser.current.get(emailFrom).unsubscribe()
            messageSubscriberOnFromUser.current.delete(emailFrom)
        }
    }

    function onSubscribeFrom(payload) {
        let emailFromForData = JSON.parse(payload.body)
        subscribeOnFromUser(emailFromForData.fromEmail)
    }

    function onUnSubscribeFrom(payload) {
        debugger
        let emailFromForData = JSON.parse(payload.body)
        unSubscribeAnswerOnUser(emailFromForData.fromEmail)
    }

    function unSubscribeOnUser(emailFor) {
        debugger
        if (messageSubscriberOnUser.current.has(emailFor)) {
            messageSubscriberOnUser.current.get(emailFor).unsubscribe()
            messageSubscriberOnUser.current.delete(emailFor)
        }
    }

    function onSubscribeAction(payload) {
        debugger
        let emailObj = JSON.parse(payload.body);

        if (emailObj.prevEmail !== emailObj.newEmail) {
            if (messageSubscriberOnUser.current.has(emailObj.prevEmail)) {
                unSubscribeOnUser(emailObj.prevEmail)
                subscribeOnUser(emailObj.newEmail)
            }
        }
        dispatch({type: "UPDATE_QUEST"})
    }

    function subscribeOnPrivateCanal(emailSelf) {
        messageSubscriberOnUser.current.set(emailSelf, stompClient.current.subscribe('/private/' + emailSelf + '/question/crud', onCRUDQuestions))
        // пользователь получает сообещине из сервера от другого человека, чтобы этот пользоваель подписался на неого
        stompClient.current.subscribe('/private/' + emailSelf + '/subscribe-me', onSubscribeFrom)
        stompClient.current.subscribe('/private/' + emailSelf + '/unsubscribe-me', onUnSubscribeFrom)
    }

    /**
     * ________________________________________________________________________________________________________________________________
     */
    function connection() {
        stompClient.current = Stomp.over(function () {
            return new SockJS(WS_CROSS_ORIGIN)
        });
        let headers = {
            Authorization: Requests.getTokenWithBearer()
        }
        stompClient.current.connect(headers, subscribeCurrentClient);
    }

    function subscribeCurrentClient() {
        stompClient.current.subscribe('/public/users/crud', onRegisterUser)
        subscribeOnPrivateCanal(userEmail)
        Requests.getAllYourQuestions().then(quests => {
            let subscribersEmails = new Set(quests.map(quest => quest.emailForUser))

            subscribersEmails.forEach(emailFor => {
                subscribeOnUser(emailFor)
            })
        })
        Requests.getAllAnswerQuestions().then(quests => {
            let subscribesAnswerEmails = new Set(quests.map(quest => quest.emailFromUser))

            subscribesAnswerEmails.forEach(emailFrom => {
                subscribeOnFromUser(emailFrom)
            })
        })
        setConnect(true)
    }

    function onRegisterUser() {
        console.log("Update list emails ...>>>>>>>>> ")
        dispatch({type: "UPDATE_USER_EMAIL"})
    }

    function onCRUDQuestions(payload) {
        debugger
        let email = payload.body;
        console.log("Update statements current user ...>>>>>>> " + email)

        dispatch({type: "UPDATE_QUEST"})

    }

    return (<UserContext.Provider value={{
        userSession: userData,
        setUserSession: setUserData,
        isLoaded,
        getCurUser: getCurUser,
        triggerOnAddUpdate: triggerOnAddUpdate,
        setTriggerOnAddUpdate: setTriggerOnAddUpdate,
        triggerOnAnswer: triggerOnAnswer,
        setTriggerOnAnswer: setTriggerOnAnswer,
        sendQueryToUpdateStatementsQuestionsUser: sendQueryToUpdateStatementsQuestionsUser,
        sendQueryToUpdateStatementUser: sendQueryToUpdateStatementUser,
        subscribeOnUser: subscribeOnUser,
        unSubscribeOnUser: unSubscribeOnUser,
        subscribeOnPrivateCanal: subscribeOnPrivateCanal,
        sendQueryToSubscribeMe: sendQueryToSubscribeMe,
        sendQueryToUnsubscribeMe: sendQueryToUnsubscribeMe
    }}>
        {(token !== null) ? ( // важно указать здесь, так как Router будет делать редирек на Login, а в Login на MainWindow,
            // получится непрырываня цепочка, так как данные еще не загружены
            (isLoaded) ? <div className="container mt-2">
                <div className="d-flex p-1 block-shadow-color main-bar-border-radius"
                     style={{minWidth: "720px"}}>
                    <div className="me-lg-auto font-weight-600 font-bar-size">
                        <span className="color-text-logo">LOGO</span><span
                        className="color-text-type">TYPE</span>
                    </div>
                    <div className="btn-group" role="group">
                        <button id={btnYourQuestMainWindowId} className="btn me-5 btn-panel-style "
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/main-window/questions/your', {})
                                }}>Your questions
                        </button>
                        <button id={btnAnswerQuestMainWindowId} className="btn ms-5 btn-panel-style"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/main-window/questions/answer')
                                }}>Answer the questions
                        </button>
                        <div id="btnGroupMainWindowId" className="btn-group ms-5">
                            <button id={btnUserNameMainWindowId} type="button"
                                    className="btn dropdown-toggle btn-panel-style font-weight-600"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                {userName}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <button id="btnEditProfileMainWindowId"
                                            className="dropdown-item btn-dropdown"
                                            type="button" onClick={() => {
                                        navigate('/main-window/profile/edit')
                                    }}>Edit Profile
                                    </button>
                                </li>
                                <li>
                                    <button id="btnLogOutMainWindowId"
                                            className="dropdown-item btn-dropdown"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                clearToken()
                                                navigate("/")
                                            }}>Log Out
                                    </button>
                                </li>
                                <li>
                                    <button id="btnDeleteProfileMainWindowId" type="button"
                                            className="dropdown-item btn-dropdown" style={{color: "red"}}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate('/main-window/profile/delete')
                                            }}>Delete
                                        Profile
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Routes children='/main-window'>
                    <Route path='/questions/your' element={<YourQuest/>}/>
                    <Route path='/questions/answer' element={<AnswerQuest/>}/>
                    <Route path='/profile/delete' element={<DeleteProfile/>}/>
                    <Route path='/profile/edit' element={<EditProfile/>}/>
                    <Route path="*" element={<Navigate to={'/error-page'}/>}/>
                </Routes>
            </div> : <>
                <ActionModal visibleAction={visibleAction} setVisibleAction={setVisibleAction}/>
            </>) : (<Routes children='/main-window'>
            <Route path="*" element={<Navigate to={'/login'}/>}/>
        </Routes>)

        }
    </UserContext.Provider>);
};

export default MainWindow;