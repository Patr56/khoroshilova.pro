import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import {Navigation} from "./Navigation";
import {Logo} from "./Logo";

import "./styles/header.css";

interface IProps extends RouteComponentProps {

}

export class Header extends React.Component<IProps, {}> {
    render() {

        const showNavigation = this.props.location.pathname !== "/";

        return (
            <header className="header">
                <Logo/>
                <Navigation show={showNavigation}/>
            </header>
        );
    }
}

export default withRouter(Header)