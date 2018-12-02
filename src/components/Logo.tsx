import * as React from "react";
import { Link } from "react-router-dom";

import "./styles/logo.css";

export class Logo extends React.Component<{}, {}> {
    render() {
        return (
            <div className="logo">
                <Link className="link logo_image" to="/" title="Татьяна Хорошилова" />
                <div className="logo_info">
                    <h1 className="logo_title">Татьяна Хорошилова</h1>
                    <h2 className="logo_subtitle">Фотограф-портретист</h2>
                </div>
            </div>
        );
    }
}