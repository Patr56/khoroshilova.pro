import * as React from "react";
import { NavLink } from "react-router-dom";

import { AVAILABLE_PAGES } from "../Config";
import { EPages } from "../Enums";

import "./styles/navigation.css";

/**
 * @prop {boolean} [show] Показывать ли меню.
 * @prop {boolean} [showIcon] Показывать ли иконки.
 */
interface IProps {
    show?: boolean;
    showIcon?: boolean;
}

/**
 * Навигация по сайту.
 */
export class Navigation extends React.Component<IProps, {}> {
    render() {
        const {show, showIcon} = this.props;

        if (!show) {
            return <div></div>;
        }

        return (
            <nav className="nav">
                <ul className="navigation">
                    {AVAILABLE_PAGES[EPages.PORTFOLIO] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/portfolio/portfolio" title="Портфолио">
                            {showIcon && <div className="navigation_icon navigation_icon__suitcase" />}
                            Портфолио
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.PHOTO] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/photo/fotografii" title="Фотографии">
                            {showIcon && <div className="navigation_icon navigation_icon__portfolio" />}
                            Фотографии
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.PRICE] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/price" title="Цены">
                            {showIcon &&  <div className="navigation_icon navigation_icon__price" />}
                            Цены
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.BLOG] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/blog" title="Блог">
                            {showIcon && <div className="navigation_icon navigation_icon__blog" />}
                            Блог
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.CONTACTS] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/contacts" title="Контакты">
                            {showIcon && <div className="navigation_icon navigation_icon__contacts" />}
                             Контакты
                        </NavLink>
                    </li>}
                </ul>
            </nav>
        );
    }
}