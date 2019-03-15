import * as React from "react";
import { NavLink } from "react-router-dom";

import "./styles/navigation.css";

/**
 * @prop {boolean} [show] Показывать ли меню.
 */
interface IProps {
    show?: boolean;
}

/**
 * Навигация по сайту.
 */
export class Navigation extends React.Component<IProps, {}> {
    render() {
        const {show} = this.props;

        if (!show) {
            return <div></div>;
        }

        return (
            <nav className="nav">
                <ul className="navigation">
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/portfolio/glavnaya" title="Портфолио">
                            Портфолио
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/price" title="Цены">
                            Цены
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/blog" title="Блог">
                            Блог
                        </NavLink>
                    </li>
                    <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/contacts" title="Контакты">
                            Контакты
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}