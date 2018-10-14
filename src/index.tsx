import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import {Provider} from "react-redux";

import { App } from "./components/App";
import {store} from "./Store";


import "./style/main.css"

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById("app")
);
