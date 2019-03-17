import * as React from "react";

import {Navigation} from "../../Navigation";

import "./styles/home.css"

export class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div className="page page_home">
                <Navigation show showIcon/>
            </div>
        );
    }
}