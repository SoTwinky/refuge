import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./css/index.scss";
import './font-awesome/css/all.css';
import './font-awesome/js/all.js';
import './font-awesome/scss/fontawesome.scss';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

//devtools
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("corps")
);