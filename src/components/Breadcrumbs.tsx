import * as React from "react";
import {NavLink} from "react-router-dom";

import {IBreadcrumb} from "../Models";

import "./styles/breadcrumbs.css";

interface IProps {
    breadcrumbs: IBreadcrumb[];
}

export class Breadcrumbs extends React.Component<IProps, {}> {
    render() {
        const {breadcrumbs} = this.props;
        const lastIndex = breadcrumbs.length - 1;

        return (
            <div className="breadcrumbs">
                <h2>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <React.Fragment key={breadcrumb.path}>
                            <NavLink className="link" activeClassName="link__active" to={breadcrumb.path}>{breadcrumb.name}</NavLink>
                            {index < lastIndex && <span className="divider" />}
                        </React.Fragment>
                    ))}
                </h2>
            </div>
        );
    }
}