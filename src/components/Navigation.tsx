import * as React from "react";
import { NavLink } from "react-router-dom";

import { AVAILABLE_PAGES } from "../Config";
import { EPages } from "../Enums";

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
                    {AVAILABLE_PAGES[EPages.PORTFOLIO] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/portfolio/portfolio" title="Портфолио">
                            <div className="navigation_icon navigation_icon__suitcase" />
                            <div className="navigation_label">Портфолио</div>
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.PHOTO] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/photo/fotografii" title="Фотографии">
                            <div className="navigation_icon navigation_icon__portfolio" />
                            <div className="navigation_label">Фотографии</div>
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.PRICE] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/price" title="Цены">
                            <div className="navigation_icon navigation_icon__price" />
                            <div className="navigation_label">Цены</div>
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.BLOG] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/blog" title="Блог">
                            <div className="navigation_icon navigation_icon__blog" />
                            <div className="navigation_label">Блог</div>
                        </NavLink>
                    </li>}
                    {AVAILABLE_PAGES[EPages.CONTACTS] && <li className="navigation_link">
                        <NavLink className="link" activeClassName="link__active" to="/contacts" title="Контакты">
                            <div className="navigation_icon navigation_icon__contacts" />
                            <div className="navigation_label">Контакты</div>
                        </NavLink>
                    </li>}
                </ul>
            </nav>
        );
    }
}