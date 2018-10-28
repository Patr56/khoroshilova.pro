import * as React from "react";
import {RouteComponentProps, withRouter} from "react-router";

import {Breadcrumbs} from "../../Breadcrumbs";

import {IBreadcrumb, IPath} from "../../../Models";
import AlbumList from "../../AlbumList";

const breadcrumbs: IBreadcrumb[] = [
    {
        path: "/portfolio/root",
        name: "Работы"
    }
];

interface IProps extends RouteComponentProps<IPath> {

}

export class Portfolio extends React.Component<IProps, {}> {

    render() {
        const {match: {params: {id}}} = this.props;

        return (
            <div>
                <Breadcrumbs breadcrumbs={breadcrumbs}/>
                <AlbumList id={id}/>
            </div>
        );
    }
}

const PortfolioWithRoute = withRouter(Portfolio);

export default PortfolioWithRoute;