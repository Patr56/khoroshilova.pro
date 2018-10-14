import * as React from "react";

import {Shadow} from "./Shadow";
import {Container} from "./Container";
import ScrollToTop from "./ScrollToTop";

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <ScrollToTop>
                <Shadow/>
                <Container/>
            </ScrollToTop>
        );
    }
}