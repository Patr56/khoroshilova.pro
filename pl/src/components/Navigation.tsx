import * as React from "react";
import { NavLink } from "react-router-dom";

import "./styles/navigation.css";

/**
 * @prop {boolean} [showIcon] Показывать ли иконки.
 */
interface IProps {
    showIcon?: boolean;
}

/**
 * Навигация по сайту.
 */
export class Navigation extends React.Component<IProps, {}> {
    render() {
        const {showIcon} = this.props;

        return (
            <nav className="nav">
                <ul className="navigation">
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/portfolio/1" title="Портфолио">
                            {showIcon && <div className="navigation_icon navigation_icon__portfolio" />}
                            Портфолио
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/price" title="Цены">
                            {showIcon && <div className="navigation_icon navigation_icon__price" />}
                            Цены
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/blog" title="Блог">
                            {showIcon && <div className="navigation_icon navigation_icon__blog" />}
                            Блог
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/contacts" title="Контакты">
                            {showIcon && <div className="navigation_icon navigation_icon__contacts" />}
                            Контакты
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}