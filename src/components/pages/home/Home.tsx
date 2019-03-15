import * as React from "react";
import { NavLink } from "react-router-dom";

import "./styles/home.css"

export class Home extends React.Component<{}, {}> {

    render() {
        return (
            <div className="page page_home">
                <nav className="nav">
                    <ul className="navigation">
                        <li className="navigation_link">
                            <NavLink className="link" activeClassName="link__active" to="/portfolio/glavnaya" title="Портфолио">
                                <div className="navigation_icon navigation_icon__portfolio" />
                                Портфолио
                            </NavLink>
                        </li>
                        <li className="navigation_link">
                            <NavLink className="link" activeClassName="link__active" to="/price" title="Цены">
                                <div className="navigation_icon navigation_icon__price" />
                                Цены
                            </NavLink>
                        </li>
                        <li className="navigation_link">
                            <NavLink className="link" activeClassName="link__active" to="/blog" title="Блог">
                                <div className="navigation_icon navigation_icon__blog" />
                                Блог
                            </NavLink>
                        </li>
                        <li className="navigation_link">
                            <NavLink className="link" activeClassName="link__active" to="/contacts" title="Контакты">
                                <div className="navigation_icon navigation_icon__contacts" />
                                Контакты
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}