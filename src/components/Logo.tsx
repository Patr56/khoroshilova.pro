import * as React from "react";
import { Link } from "react-router-dom";

import "./styles/logo.css";

export class Logo extends React.Component<{}, {}> {
    render() {
        return (
            <div className="logo">
                <Link className="link logo_image" to="/" title="Татьяна Хорошилова" />
                <div className="logo_info">
                    <div className="logo_title">
                        <div className="logo_name"></div>
                    </div>
                    <h2 className="logo_subtitle">Фотограф</h2>
                </div>
            </div>
        );
    }
}