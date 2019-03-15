import * as React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "./styles/container.css";

export class Container extends React.Component<{}, {}> {
    render() {
        return (
            <div className="container">
                <Header/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}