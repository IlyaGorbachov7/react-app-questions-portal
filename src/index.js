import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {updateQuestReducer} from "./compns/rsc/context/updateQuestReducer";
import {updateUserEmailReducer} from "./compns/rsc/context/updateUserReducer";

const rootReducer = combineReducers({
    updateQuestReducer, updateUserEmailReducer
})
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
)
