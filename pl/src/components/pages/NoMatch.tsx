import * as React from "react";
import { Link } from "react-router-dom";

export class NoMatch extends React.Component<{}, {}> {
    render() {
        return (
            <div>
               <h2>404. Страница не найдена </h2>
                Перейти на <Link to="/">главную</Link>
            </div>
        );
    }
}