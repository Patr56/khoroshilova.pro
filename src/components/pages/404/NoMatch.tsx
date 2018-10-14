import * as React from "react";
import { Link } from "react-router-dom";

import "./styles/nomatch.css";

export class NoMatch extends React.Component<{}, {}> {
    render() {
        return (
            <div className="no-match">
               <h2 className="no-match__message">404. Страница не найдена :(</h2>
                <Link className="link" to="/">
                    Перейти на главную
                </Link>
            </div>
        );
    }
}